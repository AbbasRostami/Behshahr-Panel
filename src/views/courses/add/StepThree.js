import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const StepThree = ({ stepper, handleData }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uniqueUrlString, setUniqueUrlString] = useState("");

  const gerenateString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };
  useEffect(() => {
    setUniqueUrlString(gerenateString(12));
  }, []);

  useEffect(() => {
    reset({
      UniqeUrlString: uniqueUrlString,
    });
  }, [uniqueUrlString, reset]);

  const onSubmit = (values) => {
    console.log("Step Three: ", values);
    handleData(values);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label">قیمت</Label>
            <Controller
              defaultValue="5000000"
              control={control}
              name="Cost"
              render={({ field }) => (
                <Input {...field} invalid={errors.lastName && true} />
              )}
            />
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label">کد یکتا</Label>
            <Controller
              control={control}
              name="UniqeUrlString"
              render={({ field }) => (
                <Input {...field} invalid={errors.lastName && true} />
              )}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label">تاریخ شروع</Label>
            <Controller
              control={control}
              name="StartTime"
              render={({ field }) => (
                <Input
                  type="date"
                  {...field}
                  invalid={errors.lastName && true}
                />
              )}
            />
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label">تاریخ پایان</Label>
            <Controller
              control={control}
              name="EndTime"
              render={({ field }) => (
                <Input
                  type="date"
                  {...field}
                  invalid={errors.lastName && true}
                />
              )}
            />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label">عنوان گوگل</Label>
            <Controller
              defaultValue="عنوان گوگل"
              control={control}
              name="GoogleTitle"
              render={({ field }) => (
                <Input {...field} invalid={errors.lastName && true} />
              )}
            />
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label">توضیحات گوگل</Label>
            <Controller
              defaultValue="توضیحات گوگل"
              control={control}
              name="GoogleSchema"
              render={({ field }) => (
                <Input {...field} invalid={errors.lastName && true} />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-1">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              بازگشت
            </span>
          </Button>
          <Button
            color="primary"
            type="submit"
            className="btn-next"
            onClick={() => stepper.next()}
          >
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعدی
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default StepThree;
