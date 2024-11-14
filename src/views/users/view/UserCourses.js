import { Card } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const projectsArr = [
  {
    progress: 60,
    hours: "2024/06/24",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "2024/06/24",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "2024/06/24",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "2024/06/24",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "2024/06/24",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "2024/06/24",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "2024/06/24",
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
    name: "نام دوره",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "توضیحات دوره",
    selector: (row) => row.totalTasks,
  },
  {
    name: "تاریخ آخرین بروزرسانی",
    selector: (row) => row.hours,
  },
];

const UserProjectsList = () => {
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

export default UserProjectsList;
