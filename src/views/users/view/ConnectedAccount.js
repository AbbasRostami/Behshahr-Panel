// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle, Input, Label, Progress } from "reactstrap";

// ** Third Party Components
import { Check, ChevronDown, X } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

import slackIcon from "./../../../assets/images/icons/social/slack.png";
import asanaIcon from "./../../../assets/images/icons/social/asana.png";
import googleIcon from "./../../../assets/images/icons/social/google.png";
import githubIcon from "./../../../assets/images/icons/social/github.png";
import mailchimpIcon from "./../../../assets/images/icons/social/mailchimp.png";

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
