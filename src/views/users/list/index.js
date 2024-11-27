import Table from "./Table";
import { Row, Col } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX } from "react-feather";
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

const Staticies = () => {
  const [data, setData] = useState([]);
  const [searchDataParams, setSearchDataParams] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
  });

  const GetUsersList = async () => {
    const path = `/User/UserMannage`;
    const response = await getApi({ path, params: searchDataParams });
    console.log("UserLists: ", response.data.listUser);
    setData(response.data.listUser);
  };

  useEffect(() => {
    GetUsersList();
  }, [searchDataParams]);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">88</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="ادمین ها"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="اساتید"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
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
      <Table
        data={data}
        setSearchDataParams={setSearchDataParams}
        searchDataParams={searchDataParams}
      />
    </div>
  );
};

export default Staticies;
