import { Fragment } from 'react'
import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Label, Row, Col, Form, Input, Button } from 'reactstrap'
import '@styles/react/libs/react-select/_react-select.scss'

const StepTwo = ({ stepper, type }) => {

  return (
    <Fragment>
      
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' >
              نوع دوره
            </Label>
            <Input type='text' name='first-name' defaultValue="حضوری" />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              استاد دوره
            </Label>
            <Input type='text' name='last-name' defaultValue="عباس"/>
          </Col>
        </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label'>
              سطح دوره
            </Label>
            <Input type='text' name='first-name' defaultValue="مبتدی" />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' >
              ترم
            </Label>
            <Input type='text' name='last-name' defaultValue="تابستان 1403" />
          </Col>
        </Row>

        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' >
              کلاس دوره
            </Label>
            <Input type='text' name='first-name' defaultValue="ClassRoom1" />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' >
              تعداد جلسه
            </Label>
            <Input type='text' name='last-name' defaultValue="10" />
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

export default StepTwo
