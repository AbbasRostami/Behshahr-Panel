import {
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  Archive,
  ChevronDown,
  MoreVertical,
  Trash2,
} from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";



export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام گروه",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          {/* <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="32"
            />
          </div> */}
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.courseName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "ظرفیت دوره ",
    selector: (row) => row.courseCapacity,
  },
  {
    name: "نام استاد",
    selector: (row) => row.teacherName,
    sortable: true,
    cell: (row) => {
      return <div className="d-flex flex-column w-100">{row.teacherName}</div>;
    },
  },
  {
    name: "اقدام",
    minWidth: "100px",
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

const CoursesGroup = ({data}) => {
  const [coursesGp, setcoursesGp] = useState([]);
  const GetCouresesGroup = async (courseId,teacherId) => {
    const path = `/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${courseId}`;
    const response = await getApi({ path });
    console.log("res group: ",response.data);
    setcoursesGp(response.data?.courseGroupDtos);
  };

  useEffect(() => {
    if (data?.courseId && data?.teacherId) {
      GetCouresesGroup(data.courseId, data.teacherId);
    }
  }, [data?.courseId, data?.teacherId]);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={coursesGp}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CoursesGroup;
