import "@styles/react/apps/app-users.scss";
import { getApi } from "../../../core/api/api";
import { useEffect, useState } from "react";
import UsersList from "./Table";

const ArticlesLists = () => {
  const [data, setData] = useState([]);
  const [searchDataParams, setSearchDataParams] = useState({});

  const GetArticlesList = async (params) => {
    const path = `/News`;
    const response = await getApi({
      path,
      params: { ...params, RowsOfPage: 10, PageNumber: 1 },
    });
    console.log(response.data.news);
    setData(response.data.news);
  };

  useEffect(() => {
    GetArticlesList();
  }, []);

  return (
    <div className="app-user-list">
      {/* <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربران"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
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
      </Row> */}
      <UsersList data={data} />
    </div>
  );
};

export default ArticlesLists;
