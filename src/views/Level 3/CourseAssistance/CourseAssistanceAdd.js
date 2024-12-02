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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const CourseAssistanceAdd = ({ data }) => {
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

    const path = `/AssistanceWork`;
    const body = values;
    const response = await postApi({ path, body });
    console.log("AssistanceWork Create:", response);
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
              <Controller
                name="assistanceId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="assistanceId" {...field}>
                    {data?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.courseName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.assistanceId && (
                <FormFeedback>{errors.assistanceId.message}</FormFeedback>
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

export default CourseAssistanceAdd;
