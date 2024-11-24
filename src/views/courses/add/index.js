import { Fragment } from "react";
import { Row, Col } from "reactstrap";
import WizardVertical from "./WizardVertical";

const CoursesAdd = () => {
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <WizardVertical />
        </Col>
      </Row>
    </Fragment>
  );
};
export default CoursesAdd;
