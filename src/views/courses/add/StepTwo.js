import { Fragment } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import { Controller, useForm } from "react-hook-form";

const StepTwo = ({ stepper, handleData, getCreate }) => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log("Step Two: ", values);
    handleData(values);
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label" for="CourseTypeId">
              نوع دوره
            </Label>
            <Input
              type="select"
              name="CourseTypeId"
              id="CourseTypeId"
              onChange={(e) => {
                const value = Number(e.target.value);
                console.log("Selected CourseTypeId: ", value); // اضافه کردن لاگ اینجا
                handleData({ CourseTypeId: value });
              }}
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.courseTypeDtos?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.typeName}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label" for="TeacherId">
              استاد دوره
            </Label>
            <Input
              type="select"
              name="TeacherId"
              id="TeacherId"
              onChange={(e) =>
                handleData({ TeacherId: Number(e.target.value) })
              }
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.teachers?.map((option) => (
                <option key={option.id} value={option.teacherId}>
                  {option.fullName}
                </option>
              ))}
            </Input>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label" for="CourseLvlId">
              سطح دوره
            </Label>
            <Input
              type="select"
              name="CourseLvlId"
              id="CourseLvlId"
              onChange={(e) =>
                handleData({ CourseLvlId: Number(e.target.value) })
              }
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.courseLevelDtos?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.levelName}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label" for="TremId">
              ترم
            </Label>
            <Input
              type="select"
              name="TremId"
              id="TremId"
              onChange={(e) => handleData({ TremId: Number(e.target.value) })}
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.termDtos?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.termName}
                </option>
              ))}
            </Input>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col md={6} xs={12}>
            <Label className="form-label" for="ClassId">
              کلاس دوره
            </Label>
            <Input
              type="select"
              name="ClassId"
              id="ClassId"
              onChange={(e) => handleData({ ClassId: Number(e.target.value) })}
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.classRoomDtos?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.classRoomName}
                </option>
              ))}
            </Input>
          </Col>
          <Col md={6} xs={12}>
            <Label className="form-label" for="SessionNumber">
              تعداد جلسه
            </Label>
            <Controller
              defaultValue="500"
              id="SessionNumber"
              control={control}
              name="SessionNumber"
              render={({ field }) => (
                <Input {...field} invalid={errors.SessionNumber} />
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

export default StepTwo;
