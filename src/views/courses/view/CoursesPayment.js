import { Badge, Card } from "reactstrap";
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
    selector: (row) => row.studentName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.studentName}</span>
          </div>
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "300px",
    name: "نام گروه",
    selector: (row) => row.groupName,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          <div className="avatar-wrapper"></div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.groupName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "وضعیت پرداختی",
    selector: (row) => row.groupName,
    sortable: true,
    cell: (row) => {
      return (
        <span>
        {row.peymentDone ? (
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
];

const CoursesPayment = ({ data }) => {
  const [CoursesPay, setCoursesPay] = useState([]);
  const GetCouresesView = async (courseId) => {
    const path = `/CoursePayment/ListOfWhoIsPay?CourseId=${courseId}`;
    const response = await getApi({ path });
    console.log(response.data.courseDtos);
    setCoursesPay(response.data.notDonePays);
  };
  useEffect(() => {
    GetCouresesView(data?.courseId);
  }, [data?.courseId]);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={CoursesPay}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CoursesPayment;
