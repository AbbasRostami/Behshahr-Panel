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
const ClassRoomAdd = ({ data }) => {
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = usePostSth("/ClassRoom");
  const queryClient = useQueryClient();

  const addClassRoom = (data) => {
    console.log("class room:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("ثبت ساختمان موفقیت‌آمیز بود:", response);

        queryClient.invalidateQueries(["/ClassRoom"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "کلاس جدید با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
        });
      },
      onError: (error) => {
        console.error("خطا در ثبت کلاس:", error);
        MySwal.fire({
          title: "خطا در عملیات",
          text: "مشکلی در ثبت کلاس جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
          افزدون کلاس جدید
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
            <h1 className="mb-1">اطلاعات کلاس جدید را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addClassRoom)}
          >
            <Col md={6} xs={12}>
              <Label className="form-label" for="classRoomName">
                نام کلاس
              </Label>
              <Controller
                control={control}
                name="classRoomName"
                rules={{
                  required: "وارد کردن نام کلاس الزامی است.",
                  minLength: {
                    value: 5,
                    message: "تعداد کاراکتر های نام کلاس باید حداقل 5 باشد.",
                  },
                  maxLength: {
                    value: 50,
                    message: "تعداد کاراکتر های نام کلاس باید حداکثر 50 باشد.",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      id="classRoomName"
                      placeholder="نام کلاس"
                      invalid={errors.classRoomName && true} 
                    />
                    {errors.classRoomName && (
                      <FormFeedback>
                        {errors.classRoomName.message}
                      </FormFeedback> 
                    )}
                  </>
                )}
              />
            </Col>
            <Col md={6} xs={12}>
              <Label className="form-label" for="capacity">
                ظرفیت کلاس
              </Label>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="capacity"
                    placeholder="ظرفیت کلاس"
                    invalid={errors.lastName && true}
                  />
                )}
              />
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="buildingId">
                انتخاب دوره
              </Label>
              <Controller
                name="buildingId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="buildingId" {...field}>
                    {data?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.buildingName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.buildingId && (
                <FormFeedback>{errors.buildingId.message}</FormFeedback>
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

export default ClassRoomAdd;
