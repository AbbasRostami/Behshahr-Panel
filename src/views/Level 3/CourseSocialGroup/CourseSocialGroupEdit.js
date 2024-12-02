import { Fragment, useState } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  FormFeedback,
  ModalBody,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import "@styles/react/libs/react-select/_react-select.scss";
import { postApi } from "../../../core/api/api";

const CourseSocialGroupEdit = () => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm();

  const onSubmit = async (values) => {
        
    // const path = `/User/CreateUser`;
    // const body = data;
    // const response = await postApi({ path, body });
    // console.log("Create User:", response);
  };


  return (
    <Fragment>
      <Card className="mb-0 r-2">
        <Button color="primary" onClick={() => setShow(true)}>
         افزدون تسک جدید
        </Button>
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

        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">اطلاعات تسک را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="firstName">
                نام
              </Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="firstName"
                      placeholder="نام..."
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  );
                }}
              />
              {errors.firstName && (
                <FormFeedback>لطفا نام را وارد کنید</FormFeedback>
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="lastName">
                نام خانوادگی
              </Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="نام خانوادگی..."
                    invalid={errors.lastName && true}
                  />
                )}
              />
              {errors.lastName && (
                <FormFeedback>لطفا نام خانوادگی را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="username">
                شماره موبایل
              </Label>
              <Controller
                name="gmail"
                control={control}
                render={({ field }) => (
                  <Input {...field} id="gmail" placeholder="Johe@gmail.com" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="username">
                شماره موبایل
              </Label>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="09111111111"
                    invalid={errors.username && true}
                  />
                )}
              />
              {errors.username && (
                <FormFeedback>شماره موبایل را وارد کنید</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ثبت
              </Button>
              <Button
                type="reset"
                color="secondary"
                outline
                onClick={() => setShow(false)}
              >
                انصراف
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CourseSocialGroupEdit;
