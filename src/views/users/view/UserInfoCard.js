import { useState, Fragment, useEffect} from "react";

import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Swal from "sweetalert2";
import { Check, Briefcase } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import "@styles/react/libs/react-select/_react-select.scss";
import avatar from "./../../../assets/images/portrait/small/avatar-s-2.jpg";



const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser, data }) => {
  const [show, setShow] = useState(false);
console.log("Data Get def: ", data.fName);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm();

  useEffect(() => {
    if (data) {
      reset({
        fName: data.fName || "",
        lName: data.lName || "",
        phoneNumber: data.phoneNumber || "",
        gmail: data.gmail || "",
        nationalCode: data.nationalCode || "",
        telegramLink: data.telegramLink || "",
        linkdinProfile: data.linkdinProfile || "",
        homeAdderess: data.homeAdderess || "",
        userAbout: data.userAbout || "",
      });
    }
  }, [data, reset]);


  


  const onSubmit = (values) => {
        console.log("values Put:",values);

        const formData = new FormData();

    const data = {
      FName: values.FName,
      LName: values.LName,
      UserAbout: values.UserAbout,
      LinkdinProfile: values.LinkdinProfile,
      TelegramLink: values.TelegramLink,
      HomeAdderess: values.HomeAdderess,
      phoneNumber: values.phoneNumber,
      NationalCode: values.NationalCode,
      email: values.email,
      Gender: values.Gender,
      BirthDay: values.BirthDay,
    };

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });
        
  };

      
  const handleSuspendedClick = () => {

    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیست وجود دارد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      customClass: {
        confirmButton: "btn btn-primary ssss",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "موفقیت",
          text: "عملیات با موفقیت انجام گردید",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو",
          text: "عملیات لغو گردید",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  height="110"
                  width="110"
                  alt="user-avatar"
                  src={avatar}
                  className="img-fluid rounded mt-3 mb-2"
                />
                <div className="user-info">
                  <Badge className="text-capitalize" color="success" pill>
                    Adminstrator
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">1.23k</h4>
                <small className="fs-4"> دوره ها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">568</h4>
                <small className="fs-4">دوره های رزرو </small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1 fs-4">جزئیات</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span> {data?.lName} </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام خانوادگی کاربری:</span>
                  <span> {data?.fName} </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> ایمیل کاربر:</span>
                  <span>{data?.recoveryEmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کد ملی:</span>
                  <Badge className="text-capitalize">
                    {data?.nationalCode}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <span className="text-capitalize ">فعال {data?.active}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">درصد تکمیل پروفایل :</span>
                  <span>{"%" + data?.profileCompletionPercentage}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت دوره:</span>
                  <span>{data?.cost} تومان </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">آدرس کاربر:</span>
                  <span>{data?.homeAdderess}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره کاربر:</span>
                  <span> {data?.phoneNumber} </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              // onClick={handleSuspendedClick}
            >
              غیرفعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>
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
            <h1 className="mb-1">ویرایش اطلاعات کاربر</h1>
          </div>


            <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
            >
              <Col md={4} xs={12}>
                <Label className="form-label" for="fName">
                 نام
                </Label>
                <Controller
                  control={control}
                  name="fName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      {...register("fName", { required: true })} 
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="lName">
                نام خانوادگی
                </Label>
                <Controller
                  control={control}
                  name="lName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              
              <Col md={4} xs={12}>
                <Label className="form-label" for="phoneNumber">
                 شماره تلفن
                </Label>
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="gmail">
                ایمیل
                </Label>
                <Controller
                  control={control}
                  name="gmail"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="nationalCode">
                 کد ملی
                </Label>
                <Controller
                  control={control}
                  name="nationalCode"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              {/* <Col md={4} xs={12}>
                <Label className="form-label" for="date">
                    تاریخ تولد
                </Label>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Input
                    {...field}
                    type="date"
                    {...register("dateOfBirth", { required: "Date is required" })}
                    invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col> */}
              <Col md={6} xs={12}>
                <Label className="form-label" for="telegramLink">
                  لینک تلگرام
                </Label>
                <Controller
                  control={control}
                  name="telegramLink"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="linkdinProfile">
                  لینک لینکدین
                </Label>
                <Controller
                  control={control}
                  name="linkdinProfile"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="homeAdderess">
                 آدرس کاربر
                </Label>
                <Controller
                  control={control}
                  name="homeAdderess"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="userAbout">
                  درباره کاربر
                </Label>
                <Controller
                  control={control}
                  name="userAbout"
                  render={({ field }) => (
                    <Input
                      {...field}
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Button type="submit" color="primary">ثبت</Button>
            </Row>




        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
