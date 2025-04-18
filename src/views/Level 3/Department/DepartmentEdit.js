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
import { Code } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useGetSth, usePutSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";
const MySwal = withReactContent(Swal);

const DepartmentEdit = ({data}) => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: depOption } = useGetSth('/Department', {
    staleTime: 5 * 60 * 1000,
    enabled: true, 
  });

   const { mutate } = usePutSth("/Department");
     const queryClient = useQueryClient();
     
     useEffect(() => {
       if (data) {
         reset({
          id: data.id,
          depName: data.depName || "",
          buildingId: data.buildingId || "",
         });
       }
     }, [data, reset]);
     
     const editDep = (data) => {
   
       mutate(data, {
         onSuccess: (response) => {
           console.log("res: ", response);
   
           queryClient.invalidateQueries(["/Department"]);
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
             text: "مشکلی در ثبت اطلاعات جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
          <Code size={14} />
          <span className="align-middle font-medium-2 ms-1">ویرایش</span>
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
            <h1 className="mb-1">اطلاعات واحد جدید را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(editDep)}
          >
            <Col xs={6}>
              <Label className="form-label" for="buildingId">
                انتخاب واحد
              </Label>
              <Controller
                name="buildingId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="buildingId" {...field}>
                    {depOption?.map((option) => (
                      <option key={option.buildingId} value={option.buildingId}>
                        {option.buildingName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.assistanceId && (
                <FormFeedback>{errors.assistanceId.message}</FormFeedback>
              )}
            </Col>

            <Col md={6} xs={12}>
              <Label className="form-label" for="depName">
                نام واحد
              </Label>
              <Controller
                control={control}
                name="depName"
                rules={{
                  required: "لطفاً نام دپارتمان را وارد کنید.",
                  minLength: {
                    value: 5,
                    message: "تعداد کارکتر های نام دپارتمان باید حداقل 5 باشد.",
                  },
                  maxLength: {
                    value: 70,
                    message:
                      "تعداد کارکتر های نام دپارتمان نمی‌تواند بیشتر از 70 باشد.",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      id="depName"
                      placeholder="نام واحد"
                      invalid={!!errors.depName}
                    />
                    {errors.depName && (
                      <FormFeedback>{errors.depName.message}</FormFeedback>
                    )}
                  </div>
                )}
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

export default DepartmentEdit;
