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
import { useGetSth, usePostSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);
const AddTermCloseDate = ({data}) => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = usePostSth("/Term/AddTermCloseDate");
  const queryClient = useQueryClient();

  const addClosedate = (data) => {
    console.log("term put closedate :", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("response: ", response);

        queryClient.invalidateQueries(["/Term"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "زمان بندی جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت ترم:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت زمان بندی جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
        افزدون زمان بندی
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
            <h1 className="mb-1">زمان بندی جدید ترم را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addClosedate)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="closeReason">
                عنوان ترم
              </Label>
              <Controller
                control={control}
                name="closeReason"
                rules={{
                  required: "لطفاً عنوان ترم را وارد کنید.",
                  minLength: {
                    value: 5,
                    message: "تعداد کاراکتر های عنوان ترم باید حداقل 5 باشد.",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "تعداد کاراکتر های عنوان ترم نمی‌تواند بیشتر از 50 باشد.",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      id="closeReason"
                      placeholder="عنوان ترم"
                      invalid={!!errors.closeReason}
                    />
                    {errors.closeReason && (
                      <FormFeedback>{errors.closeReason.message}</FormFeedback>
                    )}
                  </div>
                )}
              />
            </Col>
            <Col xs={6}>
              <Label className="form-label" for="termId">
                عنوان واحد
              </Label>
              <Controller
                name="termId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="termId" {...field}>
                    {data?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.termName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.termId && (
                <FormFeedback>{errors.termId.message}</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="startCloseDate">
                تاریخ شروع
              </Label>
              <Controller
                name="startCloseDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="startCloseDate" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="endCloseDate">
                تاریخ پایان
              </Label>
              <Controller
                name="endCloseDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="endCloseDate" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
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

export default AddTermCloseDate;
