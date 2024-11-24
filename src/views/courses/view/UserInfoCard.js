import { useState, Fragment, useEffect } from "react";

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
import Select from "react-select";
import { Check, Briefcase } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Avatar from "@components/avatar";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { getApi } from "../../../core/api/api";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser }) => {
  const [data, setData] = useState([]);
  const GetCouresesView = async () => {
    const path = `/Course/CourseList?PageNumber=2&RowsOfPage=1&SortingCol=DESC&SortType=Expire&Query`;
    const response = await getApi({ path });
    console.log(response.data.courseDtos[0]);
    setData(response.data.courseDtos[0]);
  };

  useEffect(() => {
    GetCouresesView();
  }, []);
  const [show, setShow] = useState(false);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedUser.username,
      // lastName: selectedUser.fullName.split(' ')[1],
      // firstName: selectedUser.fullName.split(' ')[0]
    },
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(" ")[1],
      firstName: selectedUser.fullName.split(" ")[0],
    });
  };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Suspend user!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
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
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">1.23k</h4>
                <small className="fs-4">کامنت ها </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">568</h4>
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
                  <span> {data?.fullName} </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> نام کلاس:</span>
                  <span>{data?.classRoomName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره:</span>
                  <Badge className="text-capitalize">{data?.levelName}</Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت دوره:</span>
                  <span className="text-capitalize">{data?.statusName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نوع دوره :</span>
                  <span>{data?.typeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت دوره:</span>
                  <span>{data?.cost} تومان </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شمارش دوره:</span>
                  <span>{data?.reserveCount}</span>
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
              Edit
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              Suspended
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
                <Label className="form-label" for="firstName">
                  موضوع دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="lastName">
                  ظرفیت دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col md={7} xs={12}>
                <Label className="form-label" for="lastName">
                  ظرفیت دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              <Col md={5} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Select
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="billing-email">
                  توضیحات دوره
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                  placeholder="example@domain.com"
                />
              </Col>

              <Col md={5} xs={12}>
                <Label className="form-label" for="tax-id">
                  هزینه دوره
                </Label>
                <Input
                  id="tax-id"
                  placeholder="Tax-1234"
                  // defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col>
              <Col md={7} xs={12}>
                <Label className="form-label" for="status">
                  کلاس دوره
                </Label>
                <Select
                  id="status"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={statusOptions}
                  theme={selectThemeColors}
                  // defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.status)]}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="firstName">
                  موضوع دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="firstName">
                  موضوع دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={4} xs={12}>
                <Label className="form-label" for="firstName">
                  موضوع دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="firstName">
                  موضوع دوره
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="John"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Button color="primary">ثبت</Button>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
