import { Fragment, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const StepOne = ({ stepper, handleData }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (values) => {
    console.log("Step One: ",values);

    handleData(values);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className=" mt-3">
          <Col md="6" className="mb-1">
            <Label className="form-label" for="Title">
              موضوع دوره
            </Label>
            <Controller
              defaultValue=""
              control={control}
              name="Title"
              render={({ field }) => (
                <Input
                  {...field}
                  id="Title"
                  placeholder="عنوان یا موضوع دوره"
                  invalid={errors.Title && true}
                />
              )}
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label">توضیحات</Label>
            <Controller
              defaultValue=""
              control={control}
              name="Describe"
              render={({ field }) => (
                <Input
                  {...field}
                  id="Describe"
                  placeholder="توضیحات"
                  invalid={errors.Title && true}
                />
              )}
            />{" "}
          </Col>
        </Row>
        <Row className=" mt-2">
          <Col md="6" className="mb-1">
            <Label className="form-label">توضیحات کوتاه</Label>
            <Controller
              defaultValue=""
              control={control}
              name="MiniDescribe"
              render={({ field }) => (
                <Input
                  {...field}
                  id="MiniDescribe"
                  placeholder="توضیحات کوتاه"
                  invalid={errors.Title && true}
                />
              )}
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label">ظرفیت دوره</Label>
            <Controller
              defaultValue=""
              control={control}
              name="Capacity"
              render={({ field }) => (
                <Input
                  {...field}
                  id="Capacity"
                  placeholder="ظرفیت دوره : 50"
                  invalid={errors.Title && true}
                />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between ">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              بازگشت
            </span>
          </Button>
          <Button
            type="submit"
            color="primary"
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

export default StepOne;
