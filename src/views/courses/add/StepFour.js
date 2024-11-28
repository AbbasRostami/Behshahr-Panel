import { Fragment } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { ArrowLeft } from 'react-feather'
import { Label, Row, Col, Form, Button } from 'reactstrap'

const StepFour = ({ stepper}) => {

  const languageOptions = [
    { value: 'FrontEnd', label: 'فرانت اند' },
    { value: 'BackEnd', label: 'بک اند' },
    { value: 'ReactJS', label: 'ReactJS' },
    { value: 'NextJS', label: 'NextJS' },
  ]
 // console.log("values Put:", values);
    // const path = `/Course`;
    // const body = formData;
    // const response = await editApi({ path, body });
    // console.log("Response Put: ", response);
    // if (response.data.success) {
    //   MySwal.fire({
    //     icon: "success",
    //     title: "موفقیت",
    //     text: "عملیات با موفقیت انجام گردید",
    //     customClass: {
    //       confirmButton: "btn btn-success",
    //     },
    //   });
    // }
  return (
    <Fragment>

      <Form onSubmit={e => e.preventDefault()}>
        <Row md="6" className="d-flex justify-content-center mt-">
        <Col md='6' className='mb-1 mt-5'>
            <Label className='form-label'>
              Language
            </Label>
            <Select
              isMulti
              isClearable={false}
              theme={selectThemeColors}
              options={languageOptions}
              className='react-select'
              classNamePrefix="select"
            />
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
