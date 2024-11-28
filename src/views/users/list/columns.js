import { Link } from "react-router-dom";
import { MoreVertical, FileText, Trash2, Archive } from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
} from "reactstrap";
import toast from "react-hot-toast";
import { deleteApi } from "../../../core/api/api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

// const deleteUser = async (id) => {
//   console.log(id);
//   const path = "/User/DeleteUser";
//   const body = {
//     userId: id,
//   };
//   const response = await deleteApi({ path, body });

//   console.log("Delete:", response);

//   if (response.data.success) {
//     toast.success(response.data.message);
//   }
// };

const deleteUser = async (id) => {
  return MySwal.fire({
    title: "آیا مطمئن هستید؟",
    text: "البته امکان بازگشت نیست وجود دارد",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "انصراف",
    customClass: {
      confirmButton: "btn btn-primary ssss",
      cancelButton: "btn btn-outline-danger ms-1",
    },
    buttonsStyling: false,
  }).then(async function (result) {
    const path = "/User/DeleteUser";
    const body = {
      userId: id,
    };
    const response = await deleteApi({ path, body });
    if (response.data.success) {
      MySwal.fire({
        icon: "success",
        title: "موفقیت",
        text: "عملیات با موفقیت انجام گردید",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "لغو",
        text: "عملیات لغو گردید",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  });
};

export const columns = [
  {
    name: "نام کاربر",
    sortable: true,
    minWidth: "110px",
    sortField: "fullName",
    selector: (row) => row.fname,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.fname}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },

  {
    name: "نقش",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.userRoles,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.userRoles}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },

  {
    name: "ایمیل",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.gmail,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.gmail}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: "درصد تکمیل پروفایل",
    selector: (row) => row.profileCompletionPercentage,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100">
          <small className="mb-1">{`${row.profileCompletionPercentage}%`}</small>
          <Progress
            value={row.profileCompletionPercentage}
            style={{ height: "6px" }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      );
    },
  },

  {
    name: "وضعیت",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.active,
    cell: (row) => (
      <span className="text-capitalize" color="success">
        {row.active == "True" ? (
          <Badge color="success " pill>
            فعال
          </Badge>
        ) : (
          <Badge color="danger" pill>
            غیر فعال
          </Badge>
        )}
      </span>

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
              tag={Link}
              className="w-100"
              to={`/users-view/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
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
                deleteUser(row.id);
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
