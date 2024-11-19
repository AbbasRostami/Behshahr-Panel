import { Card, CardBody, CardTitle, Input, Label, Progress } from "reactstrap";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import slackIcon from "./../../../assets/images/icons/social/slack.png";
import asanaIcon from "./../../../assets/images/icons/social/asana.png";
import googleIcon from "./../../../assets/images/icons/social/google.png";
import githubIcon from "./../../../assets/images/icons/social/github.png";
import mailchimpIcon from "./../../../assets/images/icons/social/mailchimp.png";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

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
  // const [data, setData] = useState([]);
  // const GetUsersAbout = async () => {
  //   const path = `/User/UserDetails/40296`;
  //   const response = await getApi({ path });
  //   console.log(response.data);
  //   setData(response.data);
  // };

  // useEffect(() => {
  //   GetUsersAbout();
  // }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-75">سایر اطلاعات کاربر</CardTitle>
        <p>Display content from your connected accounts on your site</p>
        {connectedAccounts.map((item, index) => {
          return (
            <div key={index} className="d-flex mt-2">
              <div className="flex-shrink-0">
                <img
                  className="me-1"
                  src={item.logo}
                  alt={item.title}
                  height="38"
                  width="38"
                />
              </div>
              <div className="d-flex align-item-center justify-content-between flex-grow-1">
                <div className="me-1">
                  <p className="fw-bolder mb-0">{item.title}</p>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default ConnectedAccount;
