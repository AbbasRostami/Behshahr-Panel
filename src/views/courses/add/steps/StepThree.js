import { Fragment } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

const StepThree = ({ stepper }) => {
  return (
    <Fragment>
      <div className='content-header'>
        <h5 className='mb-0'>Address</h5>
        <small>Enter Your Address.</small>
      </div>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              Address
            </Label>
            <Input
              type='text'

              placeholder='98  Borough bridge Road, Birmingham'
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              Landmark
            </Label>
            <Input type='text' placeholder='Borough bridge' />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              Pincode
            </Label>
            <Input type='text'placeholder='658921' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              City
            </Label>
            <Input type='text'placeholder='Birmingham' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between'>
          <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
            <span className='align-middle d-sm-inline-block d-none'>بازگشت</span>
          </Button>
          <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>مرحله بعدی</span>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default StepThree
