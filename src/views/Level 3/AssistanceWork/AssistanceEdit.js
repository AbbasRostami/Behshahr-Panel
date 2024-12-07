import { Fragment, useEffect, useState } from "react";
import React from "react";
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
import { Eye } from "react-feather";
import { useGetSth, usePutSth } from "../../../core/apiPost";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";


const MySwal = withReactContent(Swal);

const AssistanceEdit = React.memo(({ data }) => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const { data: assOption } = useGetSth("/AssistanceWork", {
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });


  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (data) {
      reset({
        worktitle: data.worktitle || "",
        workDescribe: data.workDescribe || "",
        workDate: data.workDate?.split("T")[0] || "",
        id: data.workId || "",
      });
    }
  }, [data,reset]);
  const { mutate } = usePutSth("/AssistanceWork");

  const editAss = async (values) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log("موفقیت:", data);
        queryClient.invalidateQueries(["/AssistanceWork"]);
        setShow(false); 
        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "اطلاعات جدید با موفقیت اضافه شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "ویرایش اطلاعات جدید با خطا مواجه شد",
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
        {/* <Button hidden color="primary" > */}
        <Eye
          size={14}
          className="cursor-pointer"
          onClick={() => setShow(true)}
        />

        {/* </Button> */}
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
            <h1 className="mb-1">اطلاعات ویرایش تسک را وارد کنید</h1>
          </div>
          <Row
            onSubmit={handleSubmit(editAss)}
            tag="form"
            className="gy-1 pt-75"
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
                    {assOption?.map((option) => (
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
});

export default AssistanceEdit;
