import { Fragment, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import WizardVertical from "./WizardVertical";
import { getApi } from "../../../core/api/api";

const CoursesAdd = () => {

  const [data, setData] = useState([])
  const GetCoursesCreate = async () => {
    const path = `/Course/GetCreate`;
    const response = await getApi({ path });
    console.log("Get Create Courses: ", response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetCoursesCreate();
  }, []);


  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <WizardVertical data={data} />
        </Col>
      </Row>
    </Fragment>
  );
};
export default CoursesAdd;
