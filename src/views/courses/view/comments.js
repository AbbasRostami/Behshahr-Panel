
import {
  Badge,
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
    selector: (row) => row.author,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.author}</span>
          </div>
        </div>
      );
    },
  },
  {
    maxWidth: "200px",
    name: " عنوان کامنت ",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    maxWidth: "200px",
    name: "متن کامنت ",
    selector: (row) => row.describe,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-truncate ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.describe}</span>
          </div>
        </div>
      );
    },
  },
  {
    maxWidth: "200px",
    name: "وضعیت",
    selector: (row) => row.accept,
    sortable: true,
    cell: (row) => {
      return (
        <span>
        {row.accept ? (
          <Badge className="text-capitalize" color="success" >
           تایید شده
          </Badge>
        ) : (
          <Badge className="text-capitalize"color="danger"  pill>
            تایید نشده
          </Badge>
        )}
      </span>
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
              <span className="align-middle">تایید</span>
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

const Comments = ({data}) => {
  const [comCourses, setCourses] = useState([])
   const GetCouresComments = async (courseId) => {
     const path = `/Course/GetCourseCommnets/${courseId}`;
     const response = await getApi({ path });
     console.log("res comment: ",response.data);
     setCourses(response.data)
   };

   useEffect(() => {
    GetCouresComments(data?.courseId); // ارسال courseId به متد
  }, [data?.courseId]);

  console.log("Comment:", data);
  
  //572707a8-c98f-ef11-b6e6-82fc07f68400
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={comCourses}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default Comments;
