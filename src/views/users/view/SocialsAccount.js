import { Fragment } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import twitterIcon from "@src/assets/images/icons/social/twitter.png";
import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";


const SocialsAccount = ({data}) => {

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">شبکه های اجتماعی</CardTitle>
          <div className="d-flex mt-2">
            <div className="flex-shrink-0 ">
              <img
                className="me-1"
                src={twitterIcon}
                alt={data.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <span> :Telegram</span>
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
                className="me-1"
                src={linkedinIcon}
                alt={data.title}
                height="38"
                width="38"
              />
            </div>
            <div className="d-flex align-item-center justify-content-between flex-grow-1">
              <div className="me-1">
                <span> :linkdin Profile</span>
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
