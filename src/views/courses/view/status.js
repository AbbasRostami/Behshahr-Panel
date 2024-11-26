
import { Card } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام کاربر",
    selector: (row) => row.fullName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.fullName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "سطح دوره ",
    selector: (row) => row.levelName,
  },
  {
    name: "وضعیت دوره",
    selector: (row) => row.isActive,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          {row.isExpire ? <span>پرداخت شده</span> : <span> پرداخت نشده</span>}
        </div>
      );
    },
  },
];

const GroupsList = () => {
  const [data, setData] = useState([]);
  const GetCouresesView = async () => {
    const path = `/Course/CourseList?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=Expire&Query`;
    const response = await getApi({ path });
    console.log(response.data.courseDtos);
    setData(response.data.courseDtos);
  };

  useEffect(() => {
    GetCouresesView();
  }, []);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default GroupsList;
