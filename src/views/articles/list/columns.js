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
import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

// ** Renders Client Columns
// const renderClient = row => {
//   if (row.avatar.length) {
//     return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={row.avatarColor || 'light-primary'}
//         content={row.fullName || 'John Doe'}
//       />
//     )
//   }
// }

// ** Renders Role Columns
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

// const statusObj = {
//   pending: "light-warning",
//   active: "light-success",
//   inactive: "light-secondary",
// };

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
        <div className="d-flex flex-column">
          {/* <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
          </Link> */}
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
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
        <div className="d-flex flex-column">
          {/* <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link> */}
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
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
        <div className="d-flex flex-column">
          {/* <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link> */}
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
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
      <div className="d-flex justify-content-left align-items-center text-truncate">
        {row.miniDescribe}
        <div className="d-flex flex-column">
          {/* <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.lastnamelastname}</span>
          </Link> */}
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
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
              // to={`/apps/user/view/${row.id}`}
              to={`/articles-view/${row.id}`}
              // onClick={() => store.dispatch(getUser(row.id))}
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
