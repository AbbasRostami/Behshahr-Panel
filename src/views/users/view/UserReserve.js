import { Badge, Card, CardHeader, Progress } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
// import { getApi } from "../../../core/api/api";

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "2024/02/14",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "2024/02/14",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "2024/02/14",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "2024/02/14",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "2024/02/14",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "2024/02/14",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "2024/02/14",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: vueLabel,
  },
];

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام گروه",
    selector: (row) => row.title,
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
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تاریخ رزرو",
    selector: (row) => row.totalTasks,
  },
  {
    name: "وضعیت",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.status,
    cell: (row) => (
      <Badge className="text-capitalize" color="success" pill>
        {row.status} رزرو شده
      </Badge>

      // color={statusObj[row.status]} pill
      // color='success' pill
      // color='danger' pill
      // color='secondary' pill
    ),
  },
  {
    name: "اقدام",
    selector: (row) => row.hours,
  },
];

const UserReserve = () => {
  // const [data, setData] = useState([]);
  // const GetCouresesView = async () => {
  //   const path = `/CourseGroup`;
  //   const response = await getApi({ path });
  //   console.log(response.data?.courseGroupDtos);
  //   setData(response.data?.courseGroupDtos);
  // };

  // useEffect(() => {
  //   GetCouresesView();
  // }, []);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserReserve;
