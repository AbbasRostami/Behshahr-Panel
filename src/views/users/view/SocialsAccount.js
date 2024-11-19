import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Link, X } from "react-feather";

import behanceIcon from "@src/assets/images/icons/social/behance.png";
import twitterIcon from "@src/assets/images/icons/social/twitter.png";
import facebookIcon from "@src/assets/images/icons/social/facebook.png";
import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";
import dribbbleIcon from "@src/assets/images/icons/social/dribbble.png";
import { getApi } from "../../../core/api/api";
import { useParams } from "react-router-dom";

const socialAccounts = [
  {
    linked: false,
    title: "Facebook",
    logo: facebookIcon,
  },
  {
    linked: true,
    title: "Twitter",
    url: "https://twitter.com/pixinvent",
    logo: twitterIcon,
  },
  {
    linked: true,
    title: "Linkedin",
    url: "https://www.linkedin.com/company/pixinvent/",
    logo: linkedinIcon,
  },
  {
    linked: false,
    title: "Dribbble",
    logo: dribbbleIcon,
  },
  {
    linked: false,
    title: "Behance",
    logo: behanceIcon,
  },
];

const SocialsAccount = () => {
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
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">شبکه های اجتماعی</CardTitle>
          {/* <p>Display content from social accounts on your site</p> */}
          <div className="d-flex mt-2">
            <div className="flex-shrink-0 ">
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
                <span>telegram-Id:</span>
                <p className="fw-bolder mb-0">{data.telegramLink}</p>
                {/* {item.linked ? (
                      <a href={item.url} target="_blank">
                        @pixinvent
                      </a>
                    ) : (
                      <span>Not Connected</span>
                    )} */}
              </div>
              <div className="mt-50 mt-sm-0"></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            {/* <div className="flex-shrink-0">
              <img
                className="me-1"
                src={data.logo}
                alt={data.title}
                height="38"
                width="38"
              />
            </div> */}
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <p className="fw-bolder mb-0">{data.title}</p>
                {/* {item.linked ? (
                      <a href={item.url} target="_blank">
                        @pixinvent
                      </a>
                    ) : (
                      <span>Not Connected</span>
                    )} */}
              </div>
              <div className="mt-50 mt-sm-0"></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0 ">
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
                <span>linkdin-Profile:</span>
                <p className="fw-bolder mb-0">{data.linkdinProfile}</p>
                {/* {item.linked ? (
                      <a href={item.url} target="_blank">
                        @pixinvent
                      </a>
                    ) : (
                      <span>Not Connected</span>
                    )} */}
              </div>
              <div className="mt-50 mt-sm-0"></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SocialsAccount;
