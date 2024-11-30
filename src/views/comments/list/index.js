import Table from "./Table";
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";
import Comments from "./Table";

const CommentLists = () => {
  const [data, setData] = useState([]);
  const [searchDataParams, setSearchDataParams] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
  });

  const getCommentsList = async () => {
    const path = `/Course/CommentManagment`;
    const response = await getApi({ path, params: searchDataParams });
    console.log("comment: ", response.data.comments);
    setData(response.data.comments);
  };
  useEffect(() => {
    getCommentsList();
  }, [searchDataParams]);

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
      <Comments
        data={data}
        searchDataParams={searchDataParams}
        setSearchDataParams={setSearchDataParams}
      />
    </div>
  );
};

export default CommentLists;
