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

const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
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
    sortField: "status",
    selector: (row) => row.status,
    cell: (row) => (
      <Badge className="bg-success" color={statusObj[row.status]} pill>
        {row.isActive ? <span>فعال</span> : <span>غیر فعال</span>}
      </Badge>
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
              to={`/articles-view`}
              onClick={() => store.dispatch(getUser(row.id))}
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
                store.dispatch(deleteUser(row.id));
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
