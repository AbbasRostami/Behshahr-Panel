import { Fragment, useState} from "react";
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare,
} from "react-feather";
import Avatar from "@components/avatar";

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import "@styles/base/pages/page-blog.scss";

import avatar from "./../../../assets/images/portrait/small/avatar-s-11.jpg";
import { Controller, useForm } from "react-hook-form";
import StateManagedSelect from "react-select";

const ArticlesView = () => {
 
  const [show, setShow] = useState(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: selectedUser.username,
      // lastName: selectedUser.fullName.split(' ')[1],
      // firstName: selectedUser.fullName.split(' ')[0]
    },
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };


  const countryOptions = [
    { value: "uk", label: "اخبار پژوهشگاه" },
  ];

  const renderComments = () => {
   
      return (
        <Card className='mb-3'>
          <CardBody>
            <div className='d-flex'>
              <div>
                <Avatar className='me-75' img={avatar} imgHeight='38' imgWidth='38' />
              </div>
              <div>
                <h6 className='fw-bolder mb-25'>Chad Alexander</h6>
                <CardText>May 24, 2020</CardText>
                <CardText>A variation on the question technique above, the multiple-choice question great way to engage your reader.</CardText>
                <a href='/' onClick={e => e.preventDefault()}>
                  <div className='d-inline-flex align-items-center'>
                    <CornerUpLeft size={18} className='me-50' />
                    <span>Reply</span>
                  </div>
                </a>
              </div>
            </div>
          </CardBody>
        </Card>
      )
   
  }

  return (
    <Fragment>
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="container">
            <Row>
              <Col sm="12">
                <Card className="mb-3">
                  <img
                    class="h-[30rem]"
                    src="https://sonigaracorp.com/images/blog/5_Eco-Friendly/5-Eco-Friendly-Home-Features.jpg"
                    top
                  />
                  <CardBody>
                    <CardTitle tag="h4">
                      The Best Features Coming to iOS and Web design
                    </CardTitle>
                    <div className="d-flex">
                      <Avatar
                        className="me-50"
                        img={avatar}
                        imgHeight="24"
                        imgWidth="24"
                      />
                      <div>
                        <small className="text-muted me-25">by</small>
                        <small>
                          <a
                            className="text-body"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            Ghani Pradita
                          </a>
                        </small>
                        <span className="text-muted ms-50 me-25">|</span>
                        <small className="text-muted">Jan 10, 2020</small>
                      </div>
                    </div>
                    <h6 className="rtl mt-2">
                      Before you get into the nitty-gritty of coming up with a
                      perfect title, start with a rough draft: your working
                      title. What is that, exactly? A lot of people confuse
                      working titles with topics. Let's clear that Topics are
                      very general and could yield several different blog posts.
                      Think "raising healthy kids," or "kitchen storage." A
                      writer might look at either of those topics and choose to
                      take them in very, very different directions.A working
                      title, on the other hand, is very specific and guides the
                      creation of a single blog post. For example, from the
                      topic "raising healthy kids," you could derive the
                      following working title See how different and specific
                      each of those is? That's what makes them working titles,
                      instead of overarching topics. Unprecedented Challenge{" "}
                      <br/>
                      <br />
                      Preliminary thinking systems
                      <br />
                      Bandwidth efficient
                      <br />
                      Green space
                      <br />
                      Social impact
                      <br />
                      Thought partnership
                      <br />
                      Fully ethical life
                      <br />
                    </h6>
                    <div className="d-flex mt-5">
                      <div>
                        <Avatar
                          img={avatar}
                          className="me-10"
                          imgHeight="60"
                          imgWidth="60"
                        />
                      </div>
                      <div>
                        <h6 className="fw-bolder mx-2">Willie Clark</h6>
                        <CardText className="mb-0 mx-2 ">
                          Based in London, Uncode is a blog by Willie Clark. His
                          posts explore modern design trends through photos and
                          quotes by influential creatives and web designer
                          around the world.
                        </CardText>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center me-1">
                          <a
                            className="me-50"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <MessageSquare
                              size={21}
                              className="text-body align-middle"
                            />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">19.1k</div>
                          </a>
                        </div>
                        <div className="d-flex align-items-cente">
                          <a
                            className="me-50"
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Bookmark
                              size={21}
                              className="text-body align-middle"
                            />
                          </a>
                          <a href="/" onClick={(e) => e.preventDefault()}>
                            <div className="text-body align-middle">139</div>
                          </a>
                        </div>
                      </div>
                      <UncontrolledDropdown className="dropdown-icon-wrapper">
                        <DropdownToggle tag="span">
                          <Share2
                            size={21}
                            className="text-body cursor-pointer"
                          />
                        </DropdownToggle>
                        <DropdownMenu end>
                          <DropdownItem className="py-50 px-1">
                            <GitHub size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Gitlab size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Facebook size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Twitter size={18} />
                          </DropdownItem>
                          <DropdownItem className="py-50 px-1">
                            <Linkedin size={18} />
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" id="blogComment">
                <h6 className="section-label">Comment</h6>
                {renderComments()}
              </Col>
              <Col sm="12">
                <h6 className="section-label">Leave a Comment</h6>
                <Card>
                  <CardBody>
                    <Form className="form" onSubmit={(e) => e.preventDefault()}>
                      <Row>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input placeholder="Name" />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input type="email" placeholder="Email" />
                          </div>
                        </Col>
                        <Col sm="6">
                          <div className="mb-2">
                            <Input type="url" placeholder="Website" />
                          </div>
                        </Col>
                        <Col sm="12">
                          <div className="mb-2">
                            <Input
                              className="mb-2"
                              type="textarea"
                              rows="4"
                              placeholder="Comment"
                            />
                          </div>
                        </Col>
                      
                        <Col sm="12">
                          <Button color="primary" onClick={() => setShow(true)}>ویرایش</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش اطلاعات اخبار و مقالات</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">


              <Col md={6} xs={12}>
                <Label className="form-label" for="firstName">
                 عنوان
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  عنوان گوگل
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
             
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                 کلمات کلیدی
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="lastName"
                  name="lastName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="lastName"
                      invalid={errors.lastName && true}
                    />
                  )}
                />
              </Col>
              
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  انتخاب دسته بندی
                </Label>
                <StateManagedSelect
                  id="country"
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={countryOptions}
                  defaultValue={countryOptions[0]}
                />
              </Col>
              
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                 توضیح کوتاه
                </Label>
                <Input
                  type="email"
                  id="billing-email"
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="tax-id">
                  توضیحات
                </Label>
                <Input
                  id="tax-id"
                  // defaultValue={selectedUser.contact.substr(selectedUser.contact.length - 4)}
                />
              </Col>
              
              <Col md={12} xs={12}>
                <Label className="form-label" for="firstName">
                 توضیحات گوگل
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="firstName"
                  name="firstName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="firstName"
                      invalid={errors.firstName && true}
                    />
                  )}
                />
              </Col>
              <Col md={8} xs={12} className="mt-2">
              <Button color="primary">ثبت</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ArticlesView;
