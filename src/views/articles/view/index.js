import { Fragment, useEffect, useState } from "react";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
  Calendar,
  Hash,
  Feather,
  BookOpen,
  Eye,
  Sun,
  PenTool,
  RefreshCcw,
  Tag,
} from "react-feather";
import Avatar from "@components/avatar";
import googleIcon from "./../../../assets/images/icons/social/google.png";

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  CardHeader,
} from "reactstrap";

import "@styles/base/pages/page-blog.scss";

import avatar from "./../../../assets/images/portrait/small/download.png";
import articlesPic from "./../../../../src/assets/images/pages/noimage-760x460.png";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editApi, getApi } from "../../../core/api/api";
import moment from "moment";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const MySwal = Swal.mixin({
  customClass: {
    popup: "colored-toast",
    title: "text-success",
  },
});
const ArticlesView = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const GetArticlesView = async () => {
    const path = `/News/${params.id}`;
    const response = await getApi({ path });
    console.log("Get Details News:", response.data.commentDtos);
    setData(response.data);
  };

  useEffect(() => {
    GetArticlesView();
  }, []);

  console.log("dshjds", data.detailsNewsDto  );

  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data?.detailsNewsDto) {
      reset({
        Title: data.detailsNewsDto.title || "",
        GoogleTitle: data.detailsNewsDto.googleTitle || "",
        GoogleDescribe: data.detailsNewsDto.googleDescribe || "",
        MiniDescribe: data.detailsNewsDto.miniDescribe || "",
        Describe: data.detailsNewsDto.describe || "",
        Keyword: data.detailsNewsDto.keyword || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      id: params.id,
      Title: values.Title,
      GoogleTitle: values.GoogleTitle,
      GoogleDescribe: values.GoogleDescribe,
      MiniDescribe: values.MiniDescribe,
      Describe: values.Describe,
      Keyword: values.Keyword,
      NewsCatregoryId: "10",
    };
    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });

    const path = `/News/UpdateNews`;
    const body = formData;
    const response = await editApi({ path, body });
    console.log(response);
    if (response.data.success) {
      setShow(false);
      MySwal.fire({
        icon: "success",
        title: "عملیات موفقیت‌آمیز",
        text: response.data.message,
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <Fragment>
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="container">
            <Row>
              <Col sm="12">
                <Card className="mb-3">
                  <img
                    className="mx-auto"
                    style={{ width: "100%", maxHeight: "350px" }}
                    // src={data.currentImageAddressTumb}
                    src={
                      data?.detailsNewsDto?.currentImageAddressTumb &&
                      /\.(jpg|jpeg|png|gif|webp)$/i.test(
                        data?.detailsNewsDto?.currentImageAddressTumb
                      )
                        ? data?.detailsNewsDto?.currentImageAddressTumb
                        : articlesPic
                    }
                    top
                  />
                  <CardBody>
                    <Col sm="12" className="text-end">
                      <Button
                        color="primary"
                        className="rounded  shadow-sm custom-hover"
                        onClick={() => setShow(true)}
                      >
                        <span
                          style={{
                            color: "#fff",
                            fontWeight: "300",
                            fontSize: "1rem",
                          }}
                        >
                          ویرایش مقاله
                        </span>
                      </Button>
                    </Col>

                    <CardTitle tag="h4" className=" g-3 ms-2 fw-bolder">
                      <Avatar
                        className=""
                        img={avatar}
                        imgHeight="45"
                        imgWidth="45"
                      />
                      نام نویسنده: {data?.detailsNewsDto?.addUserFullName}
                    </CardTitle>

                    <div className="d-flex align-items-center">
                      <Calendar size={28} />
                      <div>
                        <small>
                          <a
                            className="text-muted  fw-bold ms-50 "
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            تاریخ شروع:{" "}
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25"></span>

                        <small className=" fw-bold text-black">
                          {" "}
                          {moment(data?.detailsNewsDto?.insertDate)
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </small>

                        <small>
                          <a
                            className="text-muted fw-bold text-black ms-50 "
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            تاریخ به روز رسانی:{" "}
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25"></span>

                        <small className=" fw-bold text-black">
                          {" "}
                          {moment(data?.detailsNewsDto?.updateDate)
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </small>
                      </div>
                    </div>
                    <h4 className="d-flex  rtl mt-1">
                      <Hash size={25} />
                      <p className="ms-50">
                        {" "}
                        دسته بندی: {
                          data?.detailsNewsDto?.newsCatregoryName
                        }{" "}
                      </p>
                      <br />
                      <br />
                    </h4>
                    <h4 className="d-flex  rtl mt-1">
                      <Tag size={25} />
                      <p className="ms-50">
                        {" "}
                        کلمات کلیدی: {data?.detailsNewsDto?.keyword}{" "}
                      </p>
                      <br />
                      <br />
                    </h4>

                    <h4 className="rtl mt-1 ">
                      <div>
                        <Feather size={25} />
                        <span className="ms-50"> توضیحات کوتاه:</span>
                      </div>
                      <p className="m-1">{data?.detailsNewsDto?.describe}</p>
                    </h4>

                    <h4 className="rtl mt-3 ">
                      <img
                        className="me-1 rounded-6 "
                        src={googleIcon}
                        alt={data?.detailsNewsDto?.title}
                        height="20"
                        width="22"
                      />
                      عنوان گوگل: {data?.detailsNewsDto?.googleTitle}
                      <br />
                      <br />
                      <img
                        className="me-1 rounded-6"
                        src={googleIcon}
                        alt={data?.title}
                        height="20"
                        width="22"
                      />
                      توضیحات گوگل: {data?.detailsNewsDto?.googleDescribe}
                      <br />
                    </h4>

                    <div className="d-flex mt-5">
                      <BookOpen size={45} />
                      <div>
                        <h6 className="fw-bolder mx-2"> توضیحات دوره:</h6>
                        <CardText className="mb-0 fw-bolder mx-2 ">
                          {data?.detailsNewsDto?.describe}
                        </CardText>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-1">
                          <a
                            className="me-50"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Sun size={21} className="text-body align-middle" />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">
                              {data?.detailsNewsDto?.currentRate}
                            </div>
                          </a>
                        </div>
                        <div className="d-flex align-items-cente">
                          <a
                            className="me-50"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Eye size={21} className="text-body align-middle" />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">
                              {data?.detailsNewsDto?.currentView}
                            </div>
                          </a>
                        </div>
                      </div>
                      <UncontrolledDropdown className="dropdown-icon-wrapper">
                        <DropdownToggle tag="span">
                          <Share2
                            size={21}
                            className="text-body cursor-pointer"
                          />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem className="py-50 px-1">
                            <GitHub size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Gitlab size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Facebook size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Twitter size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Linkedin size={18} />
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" id="blogComment">
                <h6 className="section-label text-black fw-bolder">کامنت ها</h6>
                <Card className="mb-3">
                  {data?.commentDtos?.map((comment, index) => (
                    <CardBody key={comment.id || index} className="mb-2">
                      <div className="d-flex">
                        <div>
                          <Avatar
                            className="me-75"
                            img={avatar}
                            imgHeight="38"
                            imgWidth="38"
                          />
                        </div>
                        <div>
                          <h6 className="fw-bolder mb-25">
                            {comment.autor || "نویسنده‌ای یافت نشد"}
                          </h6>
                          <CardText>
                            تاریخ:{" "}
                            {new Date(comment.inserDate).toLocaleDateString(
                              "fa-IR"
                            )}
                          </CardText>
                          <CardText>
                            {comment.describe || "بدون توضیحات"}
                          </CardText>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="d-inline-flex align-items-center">
                              <CornerUpLeft size={18} className="me-50" />
                              <span>پاسخ</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </CardBody>
                  ))}
                </Card>
              </Col>
              <Col sm="12">
                <h6 className="section-label text-black fw-bolder">پاسخ به کامنت</h6>
                <Card>
                  <CardBody>
                    <Form className="form" onSubmit={(e) => e.preventDefault()}>
                      <Row>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input placeholder="Name" />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input type="email" placeholder="Email" />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input type="url" placeholder="Website" />
                          </div>
                        </Col>
                        <Col sm="12">
                          <div className="mb-2">
                            <Input
                              className="mb-2"
                              type="textarea"
                              rows="4"
                              placeholder="Comment"
                            />
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <CardHeader
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RefreshCcw size={30} />
            <h1 className="ms-2">ویرایش اخبار و مقاله</h1>
          </CardHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className=" mt-2 gy-1 pt-75">
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
              <Col md={8} xs={12} className="mt-2">
                <Button color="primary">ثبت</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ArticlesView;
