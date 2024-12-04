import "@styles/react/apps/app-users.scss";
import { getApi } from "../../../core/api/api";
import { useEffect, useState } from "react";
import UsersList from "./Table";

const ArticlesLists = () => {
  const [data, setData] = useState([]);
  const [searchDataParams, setSearchDataParams] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
  });

  const GetArticlesList = async () => {
    const path = `/News/AdminNewsFilterList`;
    const response = await getApi({ path, params: searchDataParams });
    console.log(response.data.news);
    setData(response.data.news);
  };

  useEffect(() => {
    GetArticlesList();
  }, [searchDataParams]);

  return (
    <div className="app-user-list">
      <UsersList
        data={data}
        setData={setData}
        setSearchDataParams={setSearchDataParams}
        searchDataParams={searchDataParams}
      />
    </div>
  );
};

export default ArticlesLists;
