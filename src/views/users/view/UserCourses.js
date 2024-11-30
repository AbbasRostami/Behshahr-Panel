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
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";
import { Cell } from "recharts";
import { useParams } from "react-router-dom";

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
    maxWidth: "300px",
    name: "نام دوره",
    selector: (row) => row.title,
    cell: (row) => {
      return(
        <div>
          <span className="fw-bolder">{row.title}</span>
        </div>
      )
    }
  },
  {
    maxWidth: "300px",
    name: "توضیحات دوره",
    selector: (row) => row.describe,
    cell: (row) => {
      return(
        <div>
          <span className=" fw-bolder">{row.describe}</span>
        </div>
      )
    } 
  },
  {
    maxWidth: "300px",
    name: "تاریخ آخرین بروزرسانی",
    selector: (row) => row.lastUpdate,
    cell: (row) => {
      return(
        <div>
          <span className=" fw-bolder">{row.lastUpdate}</span>
        </div>
      )
    } 
  },
];

const UserProjectsList = ({data}) => {

  return (
    <Card>
      <div className="text-truncate react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data}
          className="react-dataTable text-truncate"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
