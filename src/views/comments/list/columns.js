// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { deleteApi } from "../../../core/api/api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
const deleteComments = async (id) => {
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
    if (result.isConfirmed) {
      try {
        const path = "/Course/DeleteCourseComment";
        const body = {
          CourseCommandId: id,
        };
        const response = await deleteApi({ path, body });

        if (response.data) {
          MySwal.fire({
            icon: "success",
            title: "موفقیت",
            text: "عملیات با موفقیت انجام گردید",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "عدم موفقیت",
            text: "شما مجوز کافی برای انجام این عملیات را ندارید",
            customClass: {
              confirmButton: "btn btn-danger",
            },
          });
        }
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "خطا",
          text: "مشکلی در ارتباط با سرور به وجود آمد",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
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

const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

export const columns = [
  {
    name: "کاربر",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.userFullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.userFullName}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          ></Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },

  {
    name: "عنوان کامنت",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.commentTitle,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.commentTitle}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          ></Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },

  {
    name: "  دوره",
    sortable: true,
    minWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.courseTitle,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.courseTitle}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          ></Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },

  {
    name: "وضعیت",
    minWidth: "100px",
    sortable: true,
    sortField: "accept",
    selector: (row) => row.accept,
    cell: (row) => (
      <span>
        {row.accept ? (
          <Badge color="success" pill>
            تائید شده
          </Badge>
        ) : (
          <Badge color="danger" pill>
            تائید نشده
          </Badge>
        )}
      </span>
    ),
  },
  {
    name: "پاسخ ها",
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
              <span className="align-middle">رد کردن</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">حذف </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
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
              <span className="align-middle">تایید</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                deleteComments(row.id);
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
