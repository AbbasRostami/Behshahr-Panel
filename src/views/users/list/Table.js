import { Fragment, useState } from "react";
import { columns } from "./columns";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
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

const CustomHeader = ({
  handlePerPage,
  handlQuery,
  searchDataParams,
}) => {
  console.log("searchParams", searchDataParams);

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              // value={searchDataParams}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
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
              // value={searchTerm}
              onChange={(e) => handlQuery(e.target.value)}
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

const UsersList = ({ data, setSearchDataParams, searchDataParams }) => {
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
    { value: "", label: "انتخاب کنید" },
    { value: 1, label: "ادمین" },
    { value: 2, label: "استاد" },
    { value: 5, label: "دانشجو" },
  ];

  const planOptions = [
    { value: "", label: "همه وضعیت‌ها" },
    { value: 100, label: "تکمیل شده" }, 
    { value: "in-progress", label: "در حال تکمیل" }, 
    { value: 0, label: "تکمیل نشده" }, 
  ];

  const statusOptions = [
    { value: "", label: "انتخاب کنید" },
    { value: true, label: "فعال" },
    { value: false, label: "غیرفعال" },
  ];

  const handlePagination = (page) => {
    console.log(page);

    setSearchDataParams((prev) => {
      return { ...prev, PageNumber: page.selected };
    });

    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setSearchDataParams((prev) => {
      return { ...prev, RowsOfPage: value };
    });
  };
  
  const handleStatus = (e) => {
    console.log(e.value);

    setSearchDataParams((prev) => {
      return { ...prev, IsActiveUser: e.value };
    });
  };
  const handlRole = (e) => {
    console.log(e);

    setSearchDataParams((prev) => {
      return { ...prev, roleId: e.value };
    });
  };

  const handlQuery = (e) => {
    console.log(e);
    setSearchDataParams((prev) => {
      return { ...prev, Query: e };
    });
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
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
  };
  
  const handlePlanChange = (selectedOption) => {
    setCurrentPlan(selectedOption); 
  
    setSearchDataParams((prev) => ({
      ...prev,
      profileCompletionStatus: selectedOption.value, 
    }));
  };

  const filteredData = data.filter((row) => {
    const completionPercentage = parseInt(row.profileCompletionPercentage, 10);
    const status = searchDataParams.profileCompletionStatus;
  
    if (status === "") return true;
    if (status === 100) return completionPercentage === 100;
    if (status === "in-progress") return completionPercentage > 0 && completionPercentage < 100; 
    if (status === 0) return completionPercentage === 0; 
    return true;
  });
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select">نقش</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                placeholder="انتخاب کنید ...."
                onChange={(data) => {
                  handlRole(data);
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select"> وضعیت </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                placeholder="انتخاب کنید ...."
                classNamePrefix="select"
                options={statusOptions}
                onChange={(data) => {
                  handleStatus(data);
                }}
              />
            </Col>

            <Col className="my-md-0 my-1" md="4">
  <Label for="plan-select">مرتب سازی تکمیل پروفایل</Label>
  <Select
    theme={selectThemeColors}
    isClearable={false}
    className="react-select"
    classNamePrefix="select"
    options={planOptions}
    value={currentPlan}
    onChange={handlePlanChange}
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
  data={filteredData}
  subHeaderComponent={
    <CustomHeader
      handlePagination={handlePagination}
      handlQuery={handlQuery}
      searchDataParams={searchDataParams}
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
