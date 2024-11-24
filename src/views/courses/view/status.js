// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "214/627",
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
