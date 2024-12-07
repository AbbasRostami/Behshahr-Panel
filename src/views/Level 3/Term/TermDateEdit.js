import { Fragment, useEffect, useState } from "react";
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
import { Code, Crosshair } from "react-feather";
import { usePutSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
const TermDateEdit = ({data}) => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  
  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        termId: data.id,
        termName: data.termName || "",
        closeReason: data.departmentName || "",
        endCloseDate: data.endCloseDate || "",
        startCloseDate: data.startCloseDate || "",
      });
    }
  }, [data, reset]);
  
  const { mutate } = usePutSth("/Term/UpdateTermCloseDate");
  const queryClient = useQueryClient();
  const EditDateTerm = (data) => {
    console.log("put data:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("res: ", response);

        queryClient.invalidateQueries(["/Term"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "اطلاعات جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        MySwal.fire({
          title: "خطا در عملیات",
          text: response.data.ErrorMessage,
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
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setShow(true)}
        >
          <Crosshair size={14} />
          <span className="align-middle font-medium-2 ms-1">ویرایش زمان</span>
        </div>
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
            <h1 className="mb-1">به روز رسانی زمان بندی ترم</h1>
            <h3 className="mb-1">اطلاعات ترم جدید را وارد کنید</h3>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(EditDateTerm)}
          >
            <Col md={12} xs={12}>
              <Label className="form-label" for="termName">
                عنوان ترم
              </Label>
              <Controller
                control={control}
                name="termName"
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
                      id="termName"
                      placeholder="عنوان ترم"
                      invalid={!!errors.termName}
                    />
                    {errors.termName && (
                      <FormFeedback>{errors.termName.message}</FormFeedback>
                    )}
                  </div>
                )}
              />
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

export default TermDateEdit;
