import { Card } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";

export const columns = [
  {
    sortable: true,
    maxWidth: "300px",
    name: "نام دوره",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div>
          <span className="fw-bolder">{row.title}</span>
        </div>
      );
    },
  },
  {
    maxWidth: "300px",
    name: "توضیحات دوره",
    selector: (row) => row.describe,
    cell: (row) => {
      return (
        <div className=" text-truncate ...">
          <span className=" fw-bolder">{row.describe}</span>
        </div>
      );
    },
  },
  {
    maxWidth: "300px",
    name: "تاریخ آخرین بروزرسانی",
    selector: (row) => row.lastUpdate,
    cell: (row) => {
      return (
        <div>
          <span className=" fw-bolder">{row.lastUpdate}</span>
        </div>
      );
    },
  },
];

const UserProjectsList = ({ data }) => {
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
