import { Fragment, useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { getApi } from "../../../core/api/api";

const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  searchTerm,
  handlQuery,
}) => {
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
              <option value={true}>فعال</option>
              <option value={false}>غیرفعال</option>
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
              onChange={(e) => handlQuery(e.target.value)}
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

const CoursesTeacher = () => {
  const [data, setData] = useState([]);
  const [searchDataParams, setSearchDataParams] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
  });
  const GetCouresesTeacher = async () => {
    const path = `/Course/TeacherCourseList`;
    const response = await getApi({ path, params: searchDataParams });
    console.log(response.data.teacherCourseDtos);
    setData(response.data.teacherCourseDtos);
  };

  useEffect(() => {
    GetCouresesTeacher();
  }, [searchDataParams]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlQuery = (e) => {
    console.log(e);
    setSearchDataParams((prev) => {
      return { ...prev, Query: e };
    });
  };
  const handlStatus = (e) => {
    console.log(e.value);
    setSearchDataParams((prev) => {
      return { ...prev, isActive: e.value };
    });
  };

  const handlePagination = (page) => {
    console.log(page);
    setSearchDataParams((prev) => {
      return { ...prev, PageNumber: page.selected };
    });
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = 10;

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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
      name: "وضعیت دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.statusName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.statusName}
        </div>
      ),
    },

    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.status,
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
                to={`/apps/user/view/${row.id}`}
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
            subHeaderComponent={
              <CustomHeader
                handlQuery={handlQuery}
                handlePagination={handlePagination}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CoursesTeacher;
