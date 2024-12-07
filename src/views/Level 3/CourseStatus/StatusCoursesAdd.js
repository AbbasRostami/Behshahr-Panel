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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useQueryClient } from "@tanstack/react-query";
import { usePostSth } from "../../../core/apiPost";

const MySwal = withReactContent(Swal);
const StatusCoursesAdd = ({ statusNumbers }) => {
  const [show, setShow] = useState(false);

  const generateRandom = () => {
    let randomNumber;
    const validStatusNumbers = statusNumbers || [];

    do {
      randomNumber = Math.floor(Math.random() * 1000) + 1;
    } while (validStatusNumbers.includes(randomNumber));

    return randomNumber;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      statusNumber: generateRandom(),
    },
  });

  const { mutate } = usePostSth("/Status");
  const queryClient = useQueryClient();

  const addStatus = (data) => {
    console.log("Status put data:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("response: ", response);

        queryClient.invalidateQueries(["/Status"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "وضعیت جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت وضعیت:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت وضعیت جدید رخ داد. لطفاً دوباره تلاش کنید.",
          icon: "error",
          confirmButtonText: "تلاش مجدد",
          customClass: {
            confirmButton: "btn btn-danger",
          },
          buttonsStyling: false,
        });
      },
    });
  };

  return (
    <Fragment>
      <Card className="mb-0 r-2">
        <Button color="primary" onClick={() => setShow(true)}>
          افزدون وضعیت دوره
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
            <h1 className="mb-1">اطلاعات وضعیت دوره جدید را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addStatus)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="statusName">
                نام وضعیت دوره
              </Label>
              <Controller
                control={control}
                name="statusName"
                rules={{
                  required: "نام وضعیت دوره الزامی است",
                  minLength: {
                    value: 5,
                    message: "تعداد کاراکترها نباید کمتر از 5 باشد",
                  },
                  maxLength: {
                    value: 50,
                    message: "تعداد کاراکترها نباید بیشتر از 50 باشد",
                  },
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="statusName"
                      placeholder="نام..."
                      invalid={!!errors.statusName} 
                    />
                  );
                }}
              />
              {errors.statusName && (
                <FormFeedback>{errors.statusName.message}</FormFeedback> 
              )}
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="describe">
                توضیحات وضعیت
              </Label>
              <Controller
                name="describe"
                control={control}
                rules={{
                  required: "توضیحات وضعیت الزامی است",
                  minLength: {
                    value: 5,
                    message: "تعداد کاراکترها نباید کمتر از 5 باشد",
                  },
                  maxLength: {
                    value: 50,
                    message: "تعداد کاراکترها نباید بیشتر از 50 باشد",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="describe"
                    placeholder="توضیحات وضعیت..."
                    invalid={!!errors.describe}
                  />
                )}
              />
              {errors.describe && (
                <FormFeedback>{errors.describe.message}</FormFeedback> 
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

export default StatusCoursesAdd;
