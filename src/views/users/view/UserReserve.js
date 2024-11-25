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

export const columns = [
  {
    sortable: true,
    maxWidth: "200px",
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
            <span className="text-truncate fw-bolder">.{row.courseName}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تاریخ رزرو",
    selector: (row) => row.reserverDate,
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
              <span
                className="align-middle"
                onClick={() => toast.success("عملیات با موفقیت انجام شد.")}
              >
                عدم تایید
              </span>
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
              <span
                className="align-middle"
                onClick={() => toast.success("عملیات با موفقیت انجام شد.")}
              >
                حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];

const UserReserve = ({data}) => {

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

export default UserReserve;
