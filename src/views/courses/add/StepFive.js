import { Fragment } from "react";
import { ArrowLeft } from "react-feather";
import { Label, Row, Col, Form, Button, Input } from "reactstrap";
import { postApi } from "../../../core/api/api";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const MySwal = withReactContent(Swal);
const StepFive = ({ stepper, getCreate, cidHander }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      techName: [],
    },
  });

  console.log(cidHander);
  console.log(getCreate?.technologyDtos);

  const onSubmit = async (values) => {
    const courseId = cidHander?.cID;
    const techIds = values.techName.map((option) => ({ techId: option.value }));

    const path = `/Course/AddCourseTechnology?courseId=${courseId}`;
    const body = techIds;

    console.log("path:", path);
    console.log("body:", body);
    console.log("values:", values);

    const response = await postApi({ path, body });
    if (response.data.success) {
      MySwal.fire({
        icon: "success",
        title: "موفقیت",
        text: "دوره شما با موفقیت ثبت شد.",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  const options = getCreate?.technologyDtos?.map((option) => ({
    value: option.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "10px" }}> 🌟 </span> {/* آیکون نمونه */}
        {option.techName}
      </div>
    ),
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "12px",
      borderColor: state.isFocused ? "#6f42c1" : "#ccc",
      boxShadow: state.isFocused ? "0 0 8px rgba(111, 66, 193, 0.3)" : "none",
      padding: "5px",
      transition: "all 0.3s ease",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#ac99ff",
      borderRadius: "8px",
      padding: "2px 5px",
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "black",
      fontWeight: "bold",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#5a379c",
        color: "white",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontStyle: "italic",
      color: "#888",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6f42c1",
      ":hover": {
        color: "#5a379c",
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#e63946",
      ":hover": {
        color: "#d62828",
      },
    }),
  };

  return (
    <Fragment>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="d-flex justify-content-center mt-4">
          <Col md={8} xs={12}>
            <Label className="form-label">افزودن تکنولوژی</Label>
            <Controller
              name="techName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={options}
                  className="react-select"
                  styles={customStyles}
                  classNamePrefix="select"
                  placeholder="انتخاب تکنولوژی..."
                />
              )}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-2">
          <Button
            color="primary"
            className="btn-prev me-2"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none ">
              بازگشت
            </span>
          </Button>

          <Button color="success" type="submit" className="btn-submit">
            ثبت نهایی
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default StepFive;
