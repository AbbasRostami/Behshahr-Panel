import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-users.scss";
import { getApi } from "../../../core/api/api";
import { useParams } from "react-router-dom";

const UsersView = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  console.log(params);
  const GetUsersView = async () => {
    const path = `/User/UserDetails/${params.id}`;
    const response = await getApi({ path });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetUsersView();
  }, []);
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
          <UserInfoCard data={data} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs data={data} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
};
export default UsersView;
