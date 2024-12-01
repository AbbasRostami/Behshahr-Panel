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
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "@styles/react/libs/react-select/_react-select.scss";

const AddUserModal = ({data}) => {
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
         console.log("Values", values);
         
    // const path = `/User/CreateUser`;
    // const body = data;
    // const response = await postApi({ path, body });
    // console.log("Create User:", response);
  };


  return (
    <Fragment>
      <Card className="mb-0 r-2">
        <Button color="primary" onClick={() => setShow(true)}>
          افزدون کاربر جدید
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
            <h1 className="mb-1">اطلاعات کاربر را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="firstName">
                عنوان تسک
              </Label>
              <Controller
                control={control}
                name="worktitle"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="worktitle"
                      placeholder="عنوان تسک"
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  );
                }}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="workDescribe">
              توضیحات تسک
              </Label>
              <Controller
                name="workDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="workDescribe"
                    placeholder="توضیحات تسک"
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="workDate">
                  ساعت کاری
              </Label>
              <Controller
              
                name="workDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="workDate" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
                <Label className="form-label" for="assistanceId">
                  انتخاب دوره
                </Label>
                <Select
                  id="assistanceId"
                  name="assistanceId"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                />
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

export default AddUserModal;
