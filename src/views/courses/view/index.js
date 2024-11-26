import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import UserTabs from "./Tabs";
import UserInfoCard from "./CoursesInfo";
import "@styles/react/apps/app-users.scss";
import { getApi } from "../../../core/api/api";

const CoursesView = () => {

  const [active, setActive] = useState("1");
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const GetCoursesView = async () => {
    const path = `/Course/${params.id}`;
    const response = await getApi({ path });
    console.log("Get Courses Details: ",response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetCoursesView();
  }, []);

  
  const [selectedOption, setSelectedOption] = useState([]);
  const GetCoursesEdit = async () => {
    const path = `/Course/GetCreate`;
    const response = await getApi({ path });
    console.log("Get Courses selectedOption: ",response.data);
    setSelectedOption(response.data);
  };

  useEffect(() => {
    GetCoursesEdit();
  }, []);

  
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard data={data} selectedOption={selectedOption} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs data={data} selectedOption={selectedOption} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default CoursesView;
