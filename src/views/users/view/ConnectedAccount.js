import { Card, CardBody, CardTitle, Input, Label, Progress } from "reactstrap";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import slackIcon from "./../../../assets/images/icons/social/slack.png";
import asanaIcon from "./../../../assets/images/icons/social/asana.png";
import googleIcon from "./../../../assets/images/icons/social/google.png";
import githubIcon from "./../../../assets/images/icons/social/github.png";
import mailchimpIcon from "./../../../assets/images/icons/social/mailchimp.png";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const connectedAccounts = [
  {
    checked: true,
    title: "Google",
    subtitle: "Calendar and contacts",
    logo: googleIcon,
  },
  {
    checked: false,
    title: "Slack",
    subtitle: "Communication",
    logo: slackIcon,
  },
  {
    checked: true,
    title: "Github",
    subtitle: "Git repositories",
    logo: githubIcon,
  },
  {
    checked: false,
    title: "Mailchimp",
    subtitle: "Email marketing service",
    logo: mailchimpIcon,
  },
  {
    checked: false,
    title: "Asana",
    subtitle: "Communication",
    logo: asanaIcon,
  },
];

const ConnectedAccount = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const GetUsersAccount = async () => {
    const path = `/User/UserDetails/${params.id}`;
    const response = await getApi({ path });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetUsersAccount();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-75">سایر اطلاعات کاربر</CardTitle>
        {/* <p>Display content from your connected accounts on your site</p> */}
        <div className="d-flex mt-2">
          <div className="flex-shrink-0">
            <img
              className="me-1 rounded-5"
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
              src={data.currentPictureAddress}
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
