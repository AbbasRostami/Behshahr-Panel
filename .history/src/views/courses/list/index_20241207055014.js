import { Row, Col, TabContent, TabPane } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import "@styles/react/apps/app-users.scss";
import { useState } from "react";
import CoursesListTabs from "./Tabs";
import CoursesYours from "./CoursesYours";
import CoursesReserve from "./CoursesReserve";
import CoursesTeacher from "./CoursesTeacher";

const CoursesLists = () => {
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-list">
      <Row>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <CoursesListTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">466</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="ادمین ها"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">251</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="اساتید"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">352</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="دانشجویان"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CoursesYours />
        </TabPane>

        <TabPane tabId="2">
          <CoursesReserve />
        </TabPane>

        <TabPane tabId="3">
          <CoursesTeacher />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default CoursesLists;
