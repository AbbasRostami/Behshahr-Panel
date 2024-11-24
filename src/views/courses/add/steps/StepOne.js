import { Fragment } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

const StepOne = ({ stepper, type }) => {

  return (
    <Fragment>
   
      <Form onSubmit={e => e.preventDefault()}>
        <Row className=' mt-3'>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              موضوع دوره
            </Label>
            <Input type='text' placeholder='موضوع دوره' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' >
              توضیحات
            </Label>
            <Input
              type='email'
              placeholder='توضیحات'
            />
          </Col>
        </Row>


        <Row className=' mt-2'>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              توضیحات کوتاه
            </Label>
            <Input type='text' placeholder='توضیحات کوتاه' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              ظرفیت دوره
            </Label>
            <Input
              type='email'
              placeholder='ظرفیت دوره'
            />
          </Col>
        </Row>



        <div className='d-flex justify-content-between '>
          <Button color='secondary' className='btn-prev' outline disabled>
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

export default StepOne
