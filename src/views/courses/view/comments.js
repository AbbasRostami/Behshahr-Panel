
import {
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Archive, ChevronDown, MoreVertical, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

export const columns = [
  {
    sortable: true,
    maxWidth: "200px",
    name: "نام کاربر",
    selector: (row) => row.userFullName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.userFullName}</span>
          </div>
        </div>
      );
    },
  },
  {
    maxWidth: "200px",
    name: " عنوان کامنت ",
    selector: (row) => row.commentTitle,
  },
  {
    maxWidth: "200px",
    name: "متن کامنت ",
    selector: (row) => row.describe,
  },
  {
    maxWidth: "200px",
    name: "وضعیت",
    selector: (row) => row.accept,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <small className="mb-1">
            {row.accept ? <span>تائید شده</span> : <span>تائید نشده</span>}
          </small>
          {/* <Progress
            value={row.progress}
            style={{ height: "6px" }}
            className={`w-100 progress-bar-${row.progressColor}`}
          /> */}
        </div>
      );
    },
  },
  {
    name: "اقدام",
    maxWidth: "200px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                store.dispatch(deleteUser(row.id));
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

const Comments = () => {
  // const [data, setData] = useState([]);
  // const GetCouresComments = async () => {
  //   const path = `/Course/CommentManagment?PageNumber=1&RowsOfPage=10&SortingCol=DESC&SortType=InsertDate&Query=`;
  //   const response = await getApi({ path });
  //   console.log(response.data.comments);
  //   setData(response.data.comments);
  // };

  // useEffect(() => {
  //   GetCouresComments();
  // }, []);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          // data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default Comments;
