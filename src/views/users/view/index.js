import { useState } from "react";
import { Row, Col } from "reactstrap";
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-users.scss";

const UsersView = () => {
  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default UsersView;
