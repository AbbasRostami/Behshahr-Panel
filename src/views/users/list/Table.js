import { Fragment, useState, useEffect } from "react";
import { columns } from "./columns";

import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

import { selectThemeColors } from "@utils";

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import AddUserModal from "./AddUser";

import avatar2 from './../../../../src/assets/images/pages/2.png'
import avatar6 from './../../../../src/assets/images/pages/6.png'
import avatar11 from './../../../../src/assets/images/pages/11.png'
import avatar12 from './../../../../src/assets/images/pages/12.png'

const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  handleFilter,
  toggleSidebar,
  searchTerm,
  
}) => {

    

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
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
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجو..."
            />
          </div>

          <div className="d-flex  table-header-actions">
            <Button className="add-new-user" color="primary">
              جستجو
            </Button>

            
          </div>

          <div className=" mx-2">
          <AddUserModal />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** States

  const datas = [
    { name: "a", lastname: "b", progress: 78,progressColor: 'success'},
    { name: "a", lastname: "b", progress: 55,progressColor: 'info' },
    { name: "a", lastname: "b", progress: 34,progressColor: 'danger' },
  ];


  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب کنید...",
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "انتخاب کنید...",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "انتخاب کنید...",
    number: 0,
  });

  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "ادمین" },
    { value: "author", label: "استاد" },
    { value: "editor", label: "دانشجو" },
  ];

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "active", label: "فعال", number: 1 },
    { value: "inactive", label: "غیرفعال", number: 2 },
  ];

  const handlePagination = (page) => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
      })
    );
    setRowsPerPage(value);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
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

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select" tag="h4">
                نقش
              </Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      role: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      status: currentStatus.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select"> وضعیت </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      status: data.value,
                      perPage: rowsPerPage,
                      role: currentRole.value,
                      currentPlan: currentPlan.value,
                    })
                  );
                }}
              />
            </Col>

            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">مرتب سازی</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={() => {}}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

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
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={datas}
            subHeaderComponent={
              <CustomHeader
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                
              />
            }
          />
        </div>
      </Card>

    </Fragment>
  );
};

export default UsersList;
