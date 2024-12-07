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
  ModalBody,
} from "reactstrap";

import { useForm, Controller } from "react-hook-form";
import "@styles/react/libs/react-select/_react-select.scss";
import { Code } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { usePutSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";
const MySwal = withReactContent(Swal);

const TechnologyEdit = ({data}) => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

const { mutate } = usePutSth("/Technology");
     const queryClient = useQueryClient();
     
     useEffect(() => {
       if (data) {
         reset({
          id: data.id,
          techName: data.techName || "",
          describe: data.describe || "",
          iconAddress: data.iconAddress || "",
         });
       }
     }, [data, reset]);
     
     const editTech = (data) => {
   
       mutate(data, {
         onSuccess: (response) => {
           console.log("res: ", response);
   
           queryClient.invalidateQueries(["/Technology"]);
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
            <h1 className="mb-1">بروزرسانی اطلاعات تکنولوژِی را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(editTech)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="techName">
                نام تکنولوژِی
              </Label>
              <Controller
                control={control}
                name="techName"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="techName"
                      placeholder="عنوان تکنولوژی"
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  );
                }}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="iconAddress">
                آدرس آیکون
              </Label>
              <Controller
                name="iconAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="iconAddress"
                    placeholder="آدرس آیکون"
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>
            <Col md={12} xs={12}>
              <Label className="form-label" for="describe">
                توضیحات تکنولوژِی
              </Label>
              <Controller
                name="describe"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="describe"
                    placeholder="توضیحات تکنولوژِی"
                    invalid={errors.lastName && true}
                  />
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

export default TechnologyEdit;
