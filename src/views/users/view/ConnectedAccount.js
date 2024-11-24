import { Card, CardBody, CardTitle } from "reactstrap";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import slackIcon from "./../../../assets/images/icons/social/slack.png";
import asanaIcon from "./../../../assets/images/icons/social/asana.png";
import googleIcon from "./../../../assets/images/icons/social/google.png";
import githubIcon from "./../../../assets/images/icons/social/github.png";
import monkey from "./../../../assets/images/icons/social/mailchimp.png";
import moment from "moment/moment";

const ConnectedAccount = ({data}) => {

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-75">سایر اطلاعات کاربر</CardTitle>
        {/* <p>Display content from your connected accounts on your site</p> */}
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-5"
              src={githubIcon}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0">درباره کاربر:</p>
              <span>{data.userAbout}</span>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={slackIcon}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> آدرس محل سکونت:</p>
              <span>{data.homeAdderess}</span>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={monkey}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> ُتاریخ تولد:</p>
              <span>{data.birthDay}</span>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={googleIcon}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> آیدی کاربر:</p>
              <span>{data.id}</span>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={asanaIcon}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> تاریخ ایجاد حساب کاربری:</p>
              {moment(data?.insertDate).locale("fa").format("YYYY/MM/DD")}
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={monkey}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> اغتبار سنجی دو مرحله ای:</p>
              {data.active ? (
                <span className="bg-success rounded-3 ">فعال</span>
              ) : (
                <span>غیر فعال</span>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-4"
              src={googleIcon}
              alt={data.title}
              height="38"
              width="38"
            />
          </div>
          <div className="d-flex align-item-center justify-content-between flex-grow-1">
            <div className="me-1">
              <p className="fw-bolder mb-0"> ایمیل بازیابی:</p>
              <span>{data.recoveryEmail}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ConnectedAccount;
