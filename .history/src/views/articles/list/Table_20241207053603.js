import { Fragment, useState } from "react";
import { columns } from "./columns";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
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

const CustomHeader = ({
  handlQuery,
  handlePerPage,
  rowsPerPage,
  searchDataParams,
}) => {
  console.log(searchDataParams);

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
              {/* <option value="active">فعال</option>
              <option value="deactive">غیرفعال</option> */}
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

const UsersList = ({ data, setData,searchDataParams,GetArticlesList, setSearchDataParams }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "ادمین" },
    { value: "author", label: "استاد" },
    { value: "editor", label: "دانشجو" },
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

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
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
                placeholder="انتخب کنید..."
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                }}
              />
            </Col>

            <Col md="4">
              <Label for="status-select"> وضعیت </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                placeholder="انتخاب کنید..."
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                onChange={(data) => {
                  handlStatus(data);
                }}
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
            data={data}
            GetArticlesList={GetArticlesList}
            setData={setData}
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
