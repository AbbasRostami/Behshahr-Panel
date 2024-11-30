import { Fragment, useState, useEffect } from "react";

import Sidebar from "./Sidebar";

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

const CustomHeader = ({ handlePerPage, handlQuery, searchDataParams }) => {
  console.log(searchDataParams);

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
              // value={rowsPerPage}
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

const Comments = ({ data, searchDataParams, setSearchDataParams }) => {
  // ** States

  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    { value: "", label: "Select Status" },
    { value: true, label: "تائیید شده" },
    { value: false, label: "تائید نشده" },
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
  const handleStatus = (e) => {
    console.log(e.value);
    setSearchDataParams((prev) => {
      return { ...prev, accept: e.value };
    });
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setSearchDataParams((prev) => {
      return { ...prev, RowsOfPage: value };
    });
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

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="status-select"> وضعیت </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                onChange={(data) => {
                  handleStatus(data);
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
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={data}
            subHeaderComponent={
              <CustomHeader
                handlQuery={handlQuery}
                handlePagination={handlePagination}
                searchDataParams={searchDataParams}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default Comments;
