// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
// ** Third Party Components
import Select from 'react-select'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports

const colourOptions = [
  { value: 'ocean', label: 'اخبار پژوهشگاه' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },

]

const ArticlesAdd = () => {
  return (
    <Card>
      <CardHeader>
        <CardHeader tag='h2'>افزودن اخبار و مقاله جدید</CardHeader>
        
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
              <h5 className='font-weight-bold'> عنوان خبر </h5>
              </Label>
              <Input type='text' name='name' id='nameMulti' placeholder='تیتر...' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              <h5 className='font-weight-bold'>  عنوان گوگل </h5>
              </Label>
              <Input type='text' name='lastname' id='lastNameMulti' placeholder='لینک' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              <h5 className='font-weight-bold'>  توضیحات گوگل</h5>
              </Label>
              <textarea class="form-control" id="cityMulti" rows="3"></textarea>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              <h5 className='font-weight-bold'>توضیح کوتاه</h5>
              </Label>
              <textarea class="form-control" id="cityMulti" rows="3"></textarea>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              <h5 className='font-weight-bold'> کلمات کلیدی </h5>
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='کلیدی' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
              <h5 className='font-weight-bold'> دسته بندی خبر</h5>
              </Label>
              

            <Select
              theme={selectThemeColors}
              className='react-select'
              classNamePrefix='select'
              defaultValue={colourOptions[0]}
              options={colourOptions}
              isClearable={false}
            />



            </Col>

            <Col md='12' sm='12' className='mb-1'>
              <Label className='form-label col-sm-3' for='CountryMulti'>
             <h5 className='font-weight-bold'>توضیحات </h5>
              </Label>
              <textarea class="form-control" id="cityMulti" rows="3" placeholder='توضیحات تکمیلی...'></textarea>
            </Col>



            <Col sm='12' className='mt-2'>
              <div className='d-flex'>
                <Button className='me-1 ' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  ثبت
                </Button>
                <Button outline color='secondary' type='reset'>
                  پاک کردن همه
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default ArticlesAdd
