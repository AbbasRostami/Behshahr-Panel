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
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { PenTool } from "react-feather";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
const MySwal = Swal.mixin({
  customClass: {
    popup: 'colored-toast',
    title: 'text-success',
  },
});
const ArticlesAdd = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const formData = new FormData();
  
    // اضافه کردن داده‌های دیگر به formData
    const datas = {
      Title: values.Title,
      GoogleTitle: values.GoogleTitle,
      GoogleDescribe: values.GoogleDescribe,
      MiniDescribe: values.MiniDescribe,
      Describe: values.Describe,
      Keyword: values.Keyword,
      NewsCatregoryId: "12",
    };
  
    Object.entries(datas).forEach(([key, value]) => formData.append(key, value));
  
    // اضافه کردن عکس‌ها به formData
    if (values.ImageFile) {
      formData.append('Image', values.ImageFile);
    }
  
    // ارسال درخواست به API
    const path = `/News/CreateNews`;
    const body = formData;
    const response = await postApi({ path, body });
    console.log(response);
    if (response.data.success) {
      MySwal.fire({
        icon: 'success',
        title: 'عملیات موفقیت‌آمیز',
        text: response.data.message,
        confirmButtonText: 'باشه',
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
              <Label className="form-label" for="Title" style={{ fontSize: '15px' }}>
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
              <Label className="form-label" for="GoogleTitle" style={{ fontSize: '15px' }}>
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
                    maxLength={200} // شما می‌توانید محدودیت بیشتری بر اساس نیاز بگذارید
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
              <Label className="form-label" for="GoogleDescribe" style={{ fontSize: '15px' }}>
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
                    maxLength={300} // می‌توانید حداکثر محدودیت کاراکتر را تنظیم کنید
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
              <Label className="form-label" for="MiniDescribe" style={{ fontSize: '15px' }}>
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
              <Label className="form-label" for="Describe" style={{ fontSize: '15px' }}>
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
              <Label className="form-label" for="Keyword"style={{ fontSize: '15px' }}>
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
            <Label className="form-label" for="Image" style={{ fontSize: '15px' }}>
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
                    border: '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '8px',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="btn btn-outline-primary">
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
