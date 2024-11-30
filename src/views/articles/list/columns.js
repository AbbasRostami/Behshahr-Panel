import { Link } from "react-router-dom";
import {
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

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

const deleteArticles = async (id) => {
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
    const path = "/News/DeleteNewsFile";
    const body = {
      fileId: id,
    };
    const response = await deleteApi({ path, body });
    if (response) {
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
    name: "نویسنده",
    sortable: true,
    maxWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.addUserFullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.addUserFullName}
      </div>
    ),
  },

  {
    name: "عنوان خبر",
    sortable: true,
    maxWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.title}
      </div>
    ),
  },

  {
    name: "دسته بندی خبر",
    sortable: true,
    maxWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.newsCatregoryName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {row.newsCatregoryName}
      </div>
    ),
  },

  {
    name: "توضیحات کوتاه",
    sortable: true,
    maxWidth: "200px",
    sortField: "fullName",
    selector: (row) => row.miniDescribe,
    cell: (row) => (
      <div className="d-flex fw-bolder justify-content-left align-items-center text-truncate">
        {row.miniDescribe}
      </div>
    ),
  },

  {
    name: "وضعیت",
    maxWidth: "120px",
    sortable: true,
    sortField: "isActive",
    selector: (row) => row.isActive,
    cell: (row) => (
      <span>
        {row.isActive ? (
          <Badge color="success" pill>
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
    maxWidth: "120px",
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
              to={`/articles-view/${row.id}`}
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
                deleteArticles(row.id);
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
