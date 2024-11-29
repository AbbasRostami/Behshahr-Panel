import { Link } from "react-router-dom";
import { MoreVertical, FileText, Trash2 } from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
} from "reactstrap";
import { deleteApi } from "../../../core/api/api";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AvatarGroup from "@components/avatar-group";
const MySwal = withReactContent(Swal);
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
    if (result.isConfirmed) {
      try {
        const path = "/User/DeleteUser";
        const body = {
          userId: id,
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

const rolesToAvatars = {
  Student: "./../../../../src/assets/images/icons/brands/vue-label.png",
  Teacher: "./../../../../src/assets/images/icons/brands/sketch-label.png",
  Administrator: "./../../../../src/assets/images/icons/brands/react-label.png",
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
    minWidth: "250px",
    sortField: "fullName",
    selector: (row) => row.userRoles,
    cell: (row) => {
      const allowedRoles = ["Student", "Teacher", "Administrator"];

      const roles = row.userRoles
        ? row.userRoles
            .split(", ")
            .filter((role) => allowedRoles.includes(role.trim()))
        : [];

      const avatars = roles.map((role) => ({
        img:
          rolesToAvatars[role.trim()] ||
          "./../../../../src/assets/images/icons/brands/twitter-label.png",
        name: role.trim(),
        tooltip:
          role.trim() === "Administrator"
            ? "ادمین"
            : role.trim() === "Student"
            ? "دانشجو"
            : role.trim() === "Teacher"
            ? "استاد"
            : role.trim(),
      }));

      return (
        <div className="d-flex justify-content-left align-items-center">
          <AvatarGroup
            data={avatars.map((avatar) => ({
              ...avatar,
              title: avatar.tooltip,
            }))}
            size="sm"
            max={5}
          />
        </div>
      );
    },
  },

  {
    name: "ایمیل",
    sortable: true,
    minWidth: "250px",
    sortField: "fullName",
    selector: (row) => row.gmail,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.gmail}
      </div>
    ),
  },
  {
    name: "درصد تکمیل پروفایل",
    minWidth: "210px",
    selector: (row) => row.profileCompletionPercentage,
    sortable: true,
    cell: (row) => {
      const getColor = (percentage) => {
        if (percentage < 30) return "#dc3545";
        if (percentage < 70) return "#ffc107";
        return "#28a745";
      };
      const getIcon = (percentage) => {
        if (percentage < 30) return "❌";
        if (percentage < 70) return "⚠️";
        return "✅";
      };

      return (
        <div className="d-flex flex-column align-items-start w-100">
          <div className="d-flex justify-content-between w-100 align-items-center mb-1">
            <span className="fw-bold">{`${row.profileCompletionPercentage}%`}</span>
            <span>{getIcon(row.profileCompletionPercentage)}</span>
          </div>
          <Progress
            value={row.profileCompletionPercentage}
            style={{
              height: "8px",
              borderRadius: "4px",
              backgroundColor: "#e9ecef",
            }}
            barStyle={{
              backgroundColor: getColor(row.profileCompletionPercentage),
              transition: "width 0.3s ease-in-out",
            }}
            className="w-100"
          />
        </div>
      );
    },
  },

  {
    name: "وضعیت",
    minWidth: "150px",
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
          <DropdownMenu container="body" className="z-10">
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
