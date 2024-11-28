import { useState, Fragment, useEffect } from "react";
import avatar from "./../../../assets/images/portrait/small/avatar-s-2.jpg";
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
import { editApi } from "../../../core/api/api";

const MySwal = withReactContent(Swal);

const CoursesInfo = ({ selectedUser, data, selectedOption }) => {
  const [show, setShow] = useState(false);
  const [uniqueUrlString, setUniqueUrlString] = useState("");

  const gerenateString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  useEffect(() => {
    setUniqueUrlString(gerenateString(12));
  }, []);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log("SelectedOption Data:", selectedOption);
  // console.log(data);

  useEffect(() => {
    if (data) {
      reset({
        Title: data.title || "",
        Capacity: 50,
        MiniDescribe: data.describe,
        SessionNumber: 90,
        Cost: data.cost || "",
        StartTime: data.startTime,
        EndTime: data.endTime,
        UniqeUrlString: uniqueUrlString,
        Describe: data.describe,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      id: data.courseId,
      Title: values.Title,
      Capacity: values.Capacity,
      MiniDescribe: values.MiniDescribe,
      Cost: values.Cost,
      StartTime: values.StartTime,
      EndTime: values.EndTime,
      UniqeUrlString: values.UniqeUrlString,
      Describe: values.Describe,
      SessionNumber: values.SessionNumber,
      CourseTypeId: selectedCourseType.CourseTypeId,
      ClassId: selectedCourseType.ClassId,
      TeacherId: selectedCourseType.TeacherId,
      TremId: selectedCourseType.TremId,
      CourseLvlId: selectedCourseType.CourseLvlId,
      ImageAddress: imageup,
    };
    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });

    console.log("values Put:", values);
    const path = `/Course`;
    const body = formData;
    const response = await editApi({ path, body });
    console.log("Response Put: ", response);
    if (response.data.success) {
      MySwal.fire({
        icon: "success",
        title: "موفقیت",
        text: "عملیات با موفقیت انجام گردید",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const [selectedCourseType, setSelectedCourseType] = useState({
    CourseTypeId: "1",
    ClassId: "1",
    TeacherId: "1",
    TremId: "1",
    CourseLvlId: "1",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedCourseType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("selectedCourseType: ", selectedCourseType);
  };

  useEffect(() => {
    setSelectedCourseType((prevState) => ({
      ...prevState,
      CourseTypeId: "1",
      ClassId: "1",
      TeacherId: "1",
      TremId: "1",
      CourseLvlId: "1",
    }));
  }, [selectedOption]);

  const [imageup, setImageup] = useState("");
  const uploadImage = (e) => {
    setImageup(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSuspendedClick = async () => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت نیست وجود دارد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      customClass: {
        confirmButton: "btn btn-primary ssss",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async function (result) {
      const path = `/Course/ActiveAndDeactiveCourse`;
      const body = {
        active: !data.active,
        id: data?.courseId,
      };
      const response = await editApi({ path, body });
      // console.log("Response Put Active/Deative: ", response);

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
          <div className="d-flex flex-column align-items-center">
            <img
              height="160"
              width="160"
              alt="user-avatar"
              src={
                data?.imageAddress &&
                /\.(jpg|jpeg|png|gif|webp)$/i.test(data.imageAddress)
                  ? data.imageAddress
                  : avatar
              }
              className="img-fluid rounded"
            />
            <span className="fw-semibold mt-1">{data?.title}</span>
            <span className="fw-semibold mt-1">
              {data?.isActive ? (
                <Badge className="text-capitalize" color="success" pill>
                  فعال
                </Badge>
              ) : (
                <Badge className="text-capitalize" color="danger">
                  غیرفعال
                </Badge>
              )}
            </span>
          </div>

          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.courseCommentTotal}</h4>
                <small className="fs-4">کامنت ها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{data?.courseUserTotal}</h4>
                <small className="fs-4">کاربر </small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1 fs-4">جزئیات</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span> {data?.teacherName} </span>
                </li>

                <li className="mb-75">
                  <span className="fw-bolder me-25"> نام کلاس:</span>
                  <span>{data?.courseClassRoomName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <Badge className="text-capitalize">
                    {data?.courseLevelName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <span className="text-capitalize">
                    {data?.courseStatusNamecourseStatusName}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نوع دوره :</span>
                  <span>{data?.courseTypeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت دوره:</span>
                  <span>{data?.cost} تومان </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شمارش دوره:</span>
                  <span>{data?.courseUserTotal}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات:</span>
                  <span> {data?.describe} </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش کاربر
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              غیرفعال / فعال
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
            <h1 className="mb-1">ویرایش اظلاعات دوره</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={4} xs={12}>
                <Label className="form-label">موضوع دوره</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="Title"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label">ظرفیت دوره</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="Capacity"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="CourseTypeId">
                  نوع دوره
                </Label>
                <Input
                  type="select"
                  name="CourseTypeId"
                  id="CourseTypeId"
                  onChange={handleChange}
                >
                  {selectedOption?.courseTypeDtos?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.typeName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md={7} xs={12}>
                <Label className="form-label">توضیحات کوتاه</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="MiniDescribe"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={5} xs={12}>
                <Label className="form-label" for="ClassId">
                  کلاس دوره
                </Label>
                <Input
                  type="select"
                  name="ClassId"
                  id="ClassId"
                  onChange={handleChange}
                >
                  {selectedOption?.classRoomDtos?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.classRoomName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="TeacherId">
                  استاد دوره
                </Label>
                <Input
                  type="select"
                  name="TeacherId"
                  id="TeacherId"
                  onChange={handleChange}
                >
                  {selectedOption?.teachers?.map((option) => (
                    <option key={option.id} value={option.teacherId}>
                      {option.fullName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="TremId">
                  ترم دوره
                </Label>
                <Input
                  type="select"
                  name="TremId"
                  id="TremId"
                  onChange={handleChange}
                >
                  {selectedOption?.termDtos?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.termName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label">تعداد جلسه</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="SessionNumber"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={5} xs={12}>
                <Label className="form-label">هزینه دوره</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="Cost"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.lastName && true} />
                  )}
                />
              </Col>
              <Col md={7} xs={12}>
                <Label className="form-label" for="CourseLvlId">
                  سطح دوره
                </Label>
                <Input
                  type="select"
                  name="CourseLvlId"
                  id="CourseLvlId"
                  onChange={handleChange}
                >
                  {selectedOption?.courseLevelDtos?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.levelName}
                    </option>
                  ))}
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label">تاریخ شروع</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="StartTime"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label">تاریخ پایان</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="EndTime"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label">کد یکتا</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="UniqeUrlString"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={8} xs={12}>
                <Label className="form-label">توضیحات دوره</Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="Describe"
                  render={({ field }) => (
                    <Input {...field} invalid={errors.firstName && true} />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="ImageAddress">
                  تصویر دوره
                </Label>
                <Controller
                  id="ImageAddress"
                  name="ImageAddress"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="file"
                      onChange={uploadImage}
                      invalid={errors.Image && true}
                    />
                  )}
                />
                {errors.Image && (
                  <FormFeedback>{errors.Image.message}</FormFeedback>
                )}
              </Col>
              <Button color="primary">ثبت</Button>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CoursesInfo;
