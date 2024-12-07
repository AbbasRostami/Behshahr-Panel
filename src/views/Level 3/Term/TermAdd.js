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
const TermAdd = () => {
  const [show, setShow] = useState(false);

  const { data: Departmentlist } = useGetSth("/Department", {
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = usePostSth("/Term");
  const queryClient = useQueryClient();

  const addTerm = (data) => {
    console.log("term put :", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("response: ", response);

        queryClient.invalidateQueries(["/Term"]);
        setShow(false);

        MySwal.fire({
          title: "عملیات موفقیت‌آمیز بود",
          text: "ترم جدید با موفقیت ثبت شد",
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
          text: "مشکلی در ثبت ترم جدید رخ داد. لطفاً دوباره تلاش کنید.",
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
          افزدون ترم جدید
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
            <h1 className="mb-1">اطلاعات ترم جدید را وارد کنید</h1>
          </div>
          <Row
            tag="form"
            className="gy-1 pt-75"
            onSubmit={handleSubmit(addTerm)}
          >
            <Col md={6} xs={12}>
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
              <Label className="form-label" for="departmentId">
                نام واحد
              </Label>
              <Controller
                name="departmentId"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <Input type="select" id="departmentId" {...field}>
                    {Departmentlist?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.depName}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.assistanceId && (
                <FormFeedback>{errors.assistanceId.message}</FormFeedback>
              )}
            </Col>
            <Col xs={6}>
              <Label className="form-label" for="startDate">
                تاریخ شروع
              </Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="startDate" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={6}>
              <Label className="form-label" for="endDate">
                تاریخ پایان
              </Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Input type="date" {...field} id="endDate" />
                )}
              />
              {errors.username && (
                <FormFeedback>لطفا ایمیل را وارد کنید</FormFeedback>
              )}
            </Col>

            <Col xs={12}>
              <Label className="form-label" for="expire">
                وضعیت ترم
              </Label>
              <Controller
                name="expire"
                control={control}
                rules={{ required: "لطفاً یک گزینه انتخاب کنید" }}
                render={({ field }) => (
                  <div>
                    <Input
                      type="select"
                      id="expire"
                      {...field}
                      invalid={!!errors.expire}
                    >
                      <option value="">لطفاً انتخاب کنید</option>
                      <option value="false">منقضی شده</option>
                      <option value="true">فعال</option>
                    </Input>
                    {errors.expire && (
                      <FormFeedback>{errors.expire.message}</FormFeedback>
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

export default TermAdd;
