// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { getApi } from "../../../core/api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserLists = () => {
  const [data, setData] = useState([]);

  const GetUsersList = async () => {
    const path = `/User/UserMannage?PageNumber=2&RowsOfPage=20&SortingCol=DESC&SortType=InsertDate&IsActiveUser=true&IsDeletedUser=true&roleId=5`;
    const response = await getApi({ path });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetUsersList();
  }, []);
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{data.totalCount}</h3>}
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
      <Table />
    </div>
  );
};

export default UserLists;
