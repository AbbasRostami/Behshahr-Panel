import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import { postApi } from "../../../core/api/api";
import { Controller, useForm } from "react-hook-form";
import { PenTool } from "react-feather";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
const MySwal = Swal.mixin({
  customClass: {
    popup: "colored-toast",
    title: "text-success",
  },
});
const ArticlesAdd = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [aiText, setAiText] = useState(""); // متن برای تولید تصویر
  const [aiImage, setAiImage] = useState(null); // URL تصویر تولید شده
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [processId, setProcessId] = useState(null); // شناسه پردازش

  // درخواست برای تولید تصویر
  const handleAiImageGeneration = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.monsterapi.ai/v1/generate/txt2img",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImYwNDM2YmViNTBhMGVjOWExNWRkMTJkZjc4MjMwZjc2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMTItMDVUMDA6NTk6MDkuOTk4MjE2In0.ki4wg1KZEb02SzZBkaoMqvFgEvI8_6POfG5RdZUqtM0", // کلید API خود را وارد کنید
          },
          body: JSON.stringify({
            prompt: aiText,
            steps: 50,
            width: 512,
            height: 512,
          }),
        }
      );

      const data = await response.json();

      if (data.process_id) {
        setProcessId(data.process_id); // ذخیره شناسه پردازش جدید
      }
    } catch (error) {
      console.error("Error generating AI image:", error);
    } finally {
      setLoading(false);
    }
  };

  // بررسی وضعیت پردازش تصویر
  const checkStatus = async () => {
    if (!processId) return;

    try {
      const statusResponse = await fetch(
        `https://api.monsterapi.ai/v1/status/${processId}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImYwNDM2YmViNTBhMGVjOWExNWRkMTJkZjc4MjMwZjc2IiwiY3JlYXRlZF9hdCI6IjIwMjQtMTItMDVUMDA6NTk6MDkuOTk4MjE2In0.ki4wg1KZEb02SzZBkaoMqvFgEvI8_6POfG5RdZUqtM0", // کلید API خود را وارد کنید
          },
        }
      );

      const statusData = await statusResponse.json();

      if (statusData.status === "COMPLETED") {
        setAiImage(statusData.result.output[0]); // ذخیره URL تصویر
      } else {
        console.log("Image generation still in progress...");
      }
    } catch (error) {
      console.error("Error checking status:", error);
    }
  };

  // استفاده از useEffect برای بررسی وضعیت پردازش وقتی که شناسه پردازش تغییر می‌کند
  useEffect(() => {
    if (processId) {
      const interval = setInterval(checkStatus, 5000); // هر 5 ثانیه وضعیت را بررسی می‌کنیم
      return () => clearInterval(interval); // پاک‌سازی هنگام خروج
    }
  }, [processId]); // اینبار useEffect فقط زمانی اجرا می‌شود که processId تغییر کند
  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      Title: values.Title,
      GoogleTitle: values.GoogleTitle,
      GoogleDescribe: values.GoogleDescribe,
      MiniDescribe: values.MiniDescribe,
      Describe: values.Describe,
      Keyword: values.Keyword,
      NewsCatregoryId: "12",
    };

    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    // اضافه کردن تصویر تولید شده توسط AI
    if (aiImage) {
      formData.append("AiImage", aiImage); // اضافه کردن URL تصویر AI به فرم
    }

    if (values.ImageFile) {
      formData.append("Image", values.ImageFile); // تصویر آپلودی
    }

    const path = `/News/CreateNews`;
    const body = formData;
    const response = await postApi({ path, body });

    if (response.data.success) {
      MySwal.fire({
        icon: "success",
        title: "عملیات موفقیت‌آمیز",
        text: response.data.message,
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <Card className="d-flex">
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PenTool size={40} />
        <h1 className="ms-2">افزودن اخبار و مقاله جدید</h1>
      </CardHeader>

      <CardBody className="mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4} xs={12}>
              <Label
                className="form-label"
                for="Title"
                style={{ fontSize: "15px" }}
              >
                عنوان
              </Label>
              <Controller
                control={control}
                name="Title"
                rules={{
                  required: "عنوان الزامی است",
                  minLength: {
                    value: 10,
                    message: "عنوان باید حداقل 10 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 120,
                    message: "عنوان نباید بیشتر از 120 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.Title && true}
                    maxLength={120}
                    minLength={10}
                  />
                )}
              />
              {errors.Title && (
                <span className="text-danger">{errors.Title.message}</span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای عنوان بین 10 الی 120 می‌باشد.
              </small>
            </Col>
            <Col md={4} xs={12}>
              <Label
                className="form-label"
                for="GoogleTitle"
                style={{ fontSize: "15px" }}
              >
                عنوان گوگل
              </Label>
              <Controller
                control={control}
                name="GoogleTitle"
                rules={{
                  required: "عنوان گوگل الزامی است",
                  minLength: {
                    value: 40,
                    message: "عنوان گوگل باید حداقل 40 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.GoogleTitle && true}
                    maxLength={200}
                    minLength={40}
                  />
                )}
              />
              {errors.GoogleTitle && (
                <span className="text-danger">
                  {errors.GoogleTitle.message}
                </span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای عنوان گوگل بیشتر از 39 می‌باشد.
              </small>
            </Col>
            <Col md={4} xs={12}>
              <Label
                className="form-label"
                for="GoogleDescribe"
                style={{ fontSize: "15px" }}
              >
                توضیحات گوگل
              </Label>
              <Controller
                control={control}
                name="GoogleDescribe"
                rules={{
                  required: "توضیحات گوگل الزامی است",
                  minLength: {
                    value: 75,
                    message: "توضیحات گوگل باید حداقل 75 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.GoogleDescribe && true}
                    maxLength={300}
                    minLength={75}
                  />
                )}
              />
              {errors.GoogleDescribe && (
                <span className="text-danger">
                  {errors.GoogleDescribe.message}
                </span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای توضیحات گوگل بیشتر از 74 می‌باشد.
              </small>
            </Col>
            <Col className="mt-3" md={4} xs={12}>
              <Label
                className="form-label"
                for="MiniDescribe"
                style={{ fontSize: "15px" }}
              >
                توضیحات کوتاه
              </Label>
              <Controller
                control={control}
                name="MiniDescribe"
                rules={{
                  required: "توضیحات کوتاه الزامی است",
                  minLength: {
                    value: 10,
                    message: "توضیحات کوتاه باید حداقل 10 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 300,
                    message: "توضیحات کوتاه نباید بیشتر از 300 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.MiniDescribe && true}
                    maxLength={300}
                    minLength={10}
                  />
                )}
              />
              {errors.MiniDescribe && (
                <span className="text-danger">
                  {errors.MiniDescribe.message}
                </span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای توضیحات کوتاه بین 10 الی 300 می‌باشد.
              </small>
            </Col>
            <Col className="mt-3" md={4} xs={12}>
              <Label
                className="form-label"
                for="Describe"
                style={{ fontSize: "15px" }}
              >
                توضیحات اصلی
              </Label>
              <Controller
                control={control}
                name="Describe"
                rules={{
                  required: "توضیحات اصلی الزامی است",
                  minLength: {
                    value: 55,
                    message:
                      "تعداد کاراکترهای توضیحات اصلی باید بیشتر از 55 میباشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.Describe && true}
                    minLength={55}
                  />
                )}
              />
              {errors.Describe && (
                <span className="text-danger">{errors.Describe.message}</span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای توضیحات اصلی باید بیشتر از 55 میباشد.
              </small>
            </Col>
            <Col className="mt-3" md={4} xs={12}>
              <Label
                className="form-label"
                for="Keyword"
                style={{ fontSize: "15px" }}
              >
                کلمات کلیدی
              </Label>
              <Controller
                control={control}
                name="Keyword"
                rules={{
                  required: "کلمات کلیدی الزامی است",
                  minLength: {
                    value: 10,
                    message: "کلمات کلیدی باید حداقل 10 کاراکتر باشد",
                  },
                  maxLength: {
                    value: 300,
                    message: "کلمات کلیدی نباید بیشتر از 300 کاراکتر باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    invalid={errors.Keyword && true}
                    maxLength={300}
                    minLength={10}
                  />
                )}
              />
              {errors.Keyword && (
                <span className="text-danger">{errors.Keyword.message}</span>
              )}
              <small className="form-text text-muted">
                تعداد کاراکترهای کلمات کلیدی بین 10 الی 300 می‌باشد.
              </small>
            </Col>

            <Col className="mt-3" md={4} xs={12}>
              <Label
                className="form-label"
                for="Image"
                style={{ fontSize: "15px" }}
              >
                آپلود عکس
              </Label>
              <Controller
                control={control}
                name="ImageFile"
                render={({ field }) => (
                  <div
                    {...field}
                    className="dropzone"
                    style={{
                      border: "2px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files[0])}
                      style={{ display: "none" }}
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="btn btn-outline-primary"
                    >
                      انتخاب فایل
                    </label>
                    <p className="mt-2 text-muted">
                      فایل‌های تصویری را برای آپلود انتخاب کنید.
                    </p>
                  </div>
                )}
              />
              {errors.ImageFile && (
                <span className="text-danger">{errors.ImageFile.message}</span>
              )}
            </Col>
            <Col className="mt-3" md={4} xs={12}>
              <Label
                className="form-label"
                for="AiImageText"
                style={{ fontSize: "15px" }}
              >
               ساخت تصویر با Ai
              </Label>
              <input
                type="text"
                className="form-control"
                id="AiImageText"
                placeholder="dogs, cats, rabbit, ..."
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-success mt-2"
                onClick={handleAiImageGeneration}
                disabled={loading || !aiText}
              >
                {loading ? "در حال بارگذاری..." : "تولید تصویر"}
              </button>
              {aiImage && (
                <div className="mt-3">
                  <h5>تصویر تولید شده:</h5>
                  <img src={aiImage} alt="Generated AI" className="img-fluid" />
                </div>
              )}
            </Col>

            <Col sm="12" className="mt-2">
              <div className="d-flex">
                <Button className="me-1 " color="primary" type="submit">
                  ثبت
                </Button>
                <Button outline color="secondary" type="reset">
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default ArticlesAdd;
