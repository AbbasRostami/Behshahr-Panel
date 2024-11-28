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
} from "reactstrap";

import "@styles/base/pages/page-blog.scss";

import avatar from "./../../../assets/images/portrait/small/avatar-s-11.jpg";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editApi, getApi } from "../../../core/api/api";
import moment from "moment";
import toast from "react-hot-toast";

const ArticlesView = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const GetArticlesView = async () => {
    const path = `/News/${params.id}`;
    const response = await getApi({ path });
    console.log("Get Details News:", response.data.detailsNewsDto);
    setData(response.data.detailsNewsDto);
  };

  useEffect(() => {
    GetArticlesView();
  }, []);

  const [show, setShow] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        Title: data.title || "",
        GoogleTitle: data.googleTitle || "",
        GoogleDescribe: data.googleDescribe || "",
        MiniDescribe: data.miniDescribe || "",
        Describe: data.describe || "",
        Keyword: data.keyword || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      id: data.id,
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
      toast.success(response.data.message);
    }
  };

  const renderComments = () => {
    return (
      <Card className="mb-3">
        <CardBody>
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
              <h6 className="fw-bolder mb-25">Chad Alexander</h6>
              <CardText>May 24, 2020</CardText>
              <CardText>
                A variation on the question technique above, the multiple-choice
                question great way to engage your reader.
              </CardText>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <div className="d-inline-flex align-items-center">
                  <CornerUpLeft size={18} className="me-50" />
                  <span>Reply</span>
                </div>
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    );
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
                    style={{ width: "100%", maxHeight: "450px" }}
                    src={data.currentImageAddressTumb}
                    top
                  />
                  <CardBody>
                    <CardTitle tag="h4">
                      نام نویسنده: {data.addUserFullName}
                    </CardTitle>
                    <div className="d-flex">
                      <Avatar
                        className="me-50"
                        img={avatar}
                        imgHeight="9"
                        imgWidth="24"
                      />
                      <div>
                        <small>
                          <a
                            className="text-muted ms-50 "
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            تاریخ استارت:{" "}
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25"></span>

                        <small className="text-muted">
                          {" "}
                          {moment(data?.insertDate)
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </small>

                        <small>
                          <a
                            className="text-muted ms-50 "
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            تاریخ به روز رسانی:{" "}
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25"></span>

                        <small className="text-muted">
                          {" "}
                          {moment(data?.updateDate)
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                        </small>
                      </div>
                    </div>
                    <h6 className="rtl mt-2">
                      دسته بندی: {data.newsCatregoryName}
                      <br />
                      <br />
                    </h6>

                    <h6 className="rtl mt-2 ">
                      <div>
                        <Avatar
                          img={avatar}
                          className="me-10"
                          imgHeight="20"
                          imgWidth="20"
                        />
                        {"                          "}
                        توضیحات کوتاه: {data.describe}
                      </div>

                      <br />
                      <br />
                    </h6>
                    <h6 className="rtl mt-2 ">
                      <img
                        className="me-1 rounded-6 "
                        src={googleIcon}
                        alt={data.title}
                        height="20"
                        width="22"
                      />
                      عنوان گوگل: {data.googleTitle}
                      <br />
                      <br />
                      <img
                        className="me-1 rounded-6"
                        src={googleIcon}
                        alt={data.title}
                        height="20"
                        width="22"
                      />
                      توضیحات گوگل: {data.googleDescribe}
                      <br />
                    </h6>
                    <div className="d-flex mt-5">
                      <div>
                        <Avatar
                          img={avatar}
                          className="me-10"
                          imgHeight="60"
                          imgWidth="60"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bolder mx-2"> توضیحات دوره:</h6>
                        <CardText className="mb-0 mx-2 ">
                          {data.describe}
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
                            <MessageSquare
                              size={21}
                              className="text-body align-middle"
                            />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">19.1k</div>
                          </a>
                        </div>
                        <div className="d-flex align-items-cente">
                          <a
                            className="me-50"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Bookmark
                              size={21}
                              className="text-body align-middle"
                            />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">139</div>
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
                <h6 className="section-label">Comment</h6>
                {renderComments()}
              </Col>
              <Col sm="12">
                <h6 className="section-label">Leave a Comment</h6>
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

                        <Col sm="12">
                          <Button color="primary" onClick={() => setShow(true)}>
                            ویرایش
                          </Button>
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
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات اخبار و مقالات</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={4} xs={12}>
                <Label className="form-label" for="Title">
                  1
                </Label>
                <Controller
                  control={control}
                  name="Title"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="GoogleTitle">
                  2
                </Label>
                <Controller
                  control={control}
                  name="GoogleTitle"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="GoogleDescribe">
                  3
                </Label>
                <Controller
                  control={control}
                  name="GoogleDescribe"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="MiniDescribe">
                  4
                </Label>
                <Controller
                  control={control}
                  name="MiniDescribe"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="Describe">
                  5
                </Label>
                <Controller
                  control={control}
                  name="Describe"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="Keyword">
                  6
                </Label>
                <Controller
                  control={control}
                  name="Keyword"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
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
