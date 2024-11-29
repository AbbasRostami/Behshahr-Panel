import { Fragment } from "react";
// import { columns } from "./columns";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  Archive,
  ChevronDown,
  FileText,
  MoreVertical,
  Trash2,
} from "react-feather";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApi } from "../../../core/api/api";

const CustomHeader = ({ handlePerPage, rowsPerPage, searchTerm }) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">مرتب سازی</label>
            <Input
              className="mx-50 w-25"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="active">فعال</option>
              <option value="deactive">غیرفعال</option>
            </Input>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center ">
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              // onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجو..."
            />
          </div>

          <div className="d-flex  table-header-actions">
            <Button className="add-new-user" color="primary">
              جستجو
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const CoursesYours = () => {
  const [data, setData] = useState([]);
  const GetCouresesYours = async () => {
    const path = `/Course/CourseList?PageNumber=1&RowsOfPage=30&SortingCol=DESC&SortType=Expire&Query`;
    const response = await getApi({ path });
    console.log(response.data.courseDtos);
    setData(response.data.courseDtos);
  };

  useEffect(() => {
    GetCouresesYours();
  }, []);

  

  const CustomPagination = () => {
    const count = 10;

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-center my-2 pe-1"
        }
      />
    );
  };

  const statusObj = {
    pending: "light-warning",
    active: "light-success",
    inactive: "light-secondary",
  };

  const columns = [
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.title}
        </div>
      ),
    },

    {
      name: "نوع دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.typeName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.typeName}
        </div>
      ),
    },

    {
      name: "سطح دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.levelName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.levelName}
        </div>
      ),
    },

    {
      name: "وضعیت فعال بودن",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.isActive,
      cell: (row) => (
        <span>
          {row.isActive ? (
            <Badge className=" fw-bolder text-capitalize" color="success" pill>
              فعال
            </Badge>
          ) : (
            <Badge className="fw-bolder text-capitalize" color="danger">
              غیرفعال
            </Badge>
          )}
        </span>
      ),
    },

    {
      name: "وضعیت موجود بودن",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.status,
      cell: (row) => (
        <span>
          {row.isdelete ? (
            <Badge className="text-capitalize" color="danger">
              حذف شده
            </Badge>
          ) : (
            <Badge className="text-capitalize" color="success" pill>
              موجود
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
            <DropdownMenu>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">موجود کردن</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">غیرفعال کردن</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                className="w-100"
                to={`/courses-view/${row.courseId}`}
              >
                <FileText size={14} className="me-50" />

                <span className="align-middle">جزئیات</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data}
            subHeaderComponent={<CustomHeader />}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CoursesYours;
