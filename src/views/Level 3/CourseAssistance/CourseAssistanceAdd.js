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
import { getApi } from "../../../core/api/api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useGetSth, usePostSth } from "../../../core/apiPost";
import { useQueryClient } from "@tanstack/react-query";

const MySwal = withReactContent(Swal);
const CourseAssistanceAdd = () => {
  const [show, setShow] = useState(false);

  const {
    data: dataCo,
    isLoading: isLoadingCo,
    isError: isErrorCo,
  } = useGetSth(
    "/Course/CourseList?PageNumber=1&RowsOfPage=400&SortingCol=DESC&SortType=Expire&Query"
  );

  if (isLoadingCo) {
    console.log("در حال بارگذاری داده‌های دوره‌ها...");
  }

  if (isErrorCo) {
    console.error("خطایی در دریافت داده‌های دوره‌ها رخ داد.");
  }

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
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = usePostSth("/CourseAssistance");
  const queryClient = useQueryClient();

  const addMentor = (data) => {
    console.log("menter data:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("res: ", response);

        queryClient.invalidateQueries(["/ClassRoom"]);
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
        <Button color="primary" onClick={() => setShow(true)}>
          افزدون منتور جدید
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
            <h1 className="mb-1">
              منتور مد نظر و دوره مد نظر منتور را انتخاب کنید
            </h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addMentor)}
          >
            <Col xs={6}>
              <Label className="form-label" for="courseId">
                انتخاب دوره
              </Label>
              <Controller
                name="courseId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="courseId" {...field}>
                    {dataCo?.courseDtos?.map((option) => (
                      <option key={option.courseId} value={option.courseId}>
                        {option.title}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.courseId && (
                <FormFeedback>{errors.courseId.message}</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="userId">
                انتخاب کاربر
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
                        {user.fname} {user.lname}
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

export default CourseAssistanceAdd;
