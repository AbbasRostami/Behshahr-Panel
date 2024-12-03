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
const CourseSocialGroupAdd = () => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: "Bahr",
      groupLink: "https://t.me/Bahr_AC",
    },
  });

  const { data } = useGetSth(
    "/Course/CourseList?PageNumber=1&RowsOfPage=400&SortingCol=DESC&SortType=Expire&Query",
    {
      staleTime: 5 * 60 * 1000,
      enabled: true,
    }
  );

  const { mutate } = usePostSth("/CourseSocialGroup");
  const queryClient = useQueryClient();

  const addSocials = (data) => {
    console.log("socials:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("res: ", response);

        queryClient.invalidateQueries(["/CourseSocialGroup"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "گروه جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت گروه:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت گروه جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
          افزدون گروه جدید
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
            <h1 className="mb-1">لطفا اطلاعات گروه را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addSocials)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="groupLink">
                لینک شبکه اجتماعی
              </Label>
              <Controller
                control={control}
                name="groupLink"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id="groupLink"
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  );
                }}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="groupName">
                نام گروه
              </Label>
              <Controller
                name="groupName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="groupName"
                    defaultValue={"Bahr"}
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="courseId">
                انتخاب دوره
              </Label>
              <Controller
                name="courseId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="courseId" {...field}>
                    {data?.courseDtos?.map((option) => (
                      <option key={option.courseId} value={option.courseId}>
                        {option.classRoomName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.courseId && (
                <FormFeedback>{errors.courseId.message}</FormFeedback>
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

export default CourseSocialGroupAdd;
