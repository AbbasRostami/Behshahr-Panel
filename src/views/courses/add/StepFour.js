import { Fragment } from 'react'
import { ArrowLeft } from 'react-feather'
import { Label, Row, Col, Form, Button, Input } from 'reactstrap'

const StepFour = ({ stepper,getCreate}) => {


  const onSubmit = async (values) => {
    const formData = new FormData();

    const datas = {
      ...allData,
      ...values,
    };

    console.log("datas: ", datas);

    Object.entries(datas).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.forEach((value, key) => {
      console.log(key, ":", value);
    });

    const path = `/Course`;
    const body = formData;
    const response = await postApi({ path, body });
    console.log("Response Put: ", response);
    if (response.data.success) {
      MySwal.fire({
        icon: "success",
        title: "موفقیت",
        text: "عملیات با موفقیت انجام گردید",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  return (
    <Fragment>
{/* onSubmit={handleSubmit(onSubmit)} */}
      <Form >
        <Row md="6" className="d-flex justify-content-center mt-">
        <Col md={6} xs={12}>
            <Label className="form-label" for="techName">
                افزدون تکنولوژِی
            </Label>
            <Input
              type="select"
              name="techName"
              id="techName"
              onChange={(e) => handleData({ techName: Number(e.target.value) })}
            >
              <option value="" label="انتخاب کنید..."></option>
              {getCreate?.technologyDtos?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.techName}
                </option>
              ))}
            </Input>
          </Col>
        </Row>


        <div className='d-flex justify-content-center mt-2'>
          <Button color='primary' className='btn-prev me-2' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none '>بازگشت</span>
          </Button>

          <Button color='success' type='submit' className='btn-submit'>
            ثبت نهایی
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default StepFour
