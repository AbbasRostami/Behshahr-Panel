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
import { useQueryClient } from "@tanstack/react-query";
import { useGetSth, usePostSth, usePutSth } from "../../../core/apiPost";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const CourseAssistanceEdit = ({data}) => {
  const [show, setShow] = useState(false);
  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetSth(
    "/User/UserMannage?PageNumber=1&RowsOfPage=600&SortingCol=DESC&SortType=InsertDate&IsActiveUser=true&IsDeletedUser=true&roleId=1"
  );

  if (isLoadingUser) {
    console.log("در حال بارگذاری داده‌های کاربران...");
  }

  if (isErrorUser) {
    console.error("خطایی در دریافت داده‌های کاربران رخ داد.");
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = usePutSth("/CourseAssistance");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        courseId: data.courseId || "",
      });
    }
  }, [data, reset]);
  
  const editCoursesAss = (data) => {

    mutate(data, {
      onSuccess: (response) => {
        console.log("res: ", response);

        queryClient.invalidateQueries(["/CourseAssistance"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "منتور جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت منتور:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت منتور جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
            <h1 className="mb-1">
              بروزرسانی منتور را انتخاب کنید
            </h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(editCoursesAss)}
          >
            <Col xs={12}>
              <Label className="form-label" for="userId">
               انتخاب کنید
              </Label>
              <Controller
                name="userId"
                control={control}
                defaultValue=""
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input
                    type="select"
                    id="userId"
                    {...field} 
                    value={field.value || ""} 
                    onChange={(e) => field.onChange(e.target.value)} 
                  >
                    <option value="">لطفاً انتخاب کنید</option>
                    {dataUser?.listUser?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fname}{user.lname}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.userId && (
                <FormFeedback>{errors.userId.message}</FormFeedback>
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

export default CourseAssistanceEdit;
