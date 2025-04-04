import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from "moment-jalaali";
import AssistanceAdd from "./AssistanceAdd";
import { useGetSth } from "../../../core/apiPost";
import AssistanceEdit from "./AssistanceEdit";
const AssisranceWork = () => {

  
  const { data } = useGetSth("/AssistanceWork", {
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (data?.length) {
      let newData = data.map((item, index) => {
        return {
          ...item,
          index,
        };
      });
      setDatas(newData);
      setfilterSearch(newData);
    }
  }, [data]);

  const [fiterSearch, setfilterSearch] = useState([]);

  const handleSearch = (query) => {
    const searchData = datas.filter((item) => {
      return item.worktitle.toLowerCase().match(query.toLowerCase());
    });
    console.log(searchData);
    setfilterSearch(searchData);
  };

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

  const columns = [
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.courseName,
      cell: (row, index) => (
        <div
          key={`${row.id}-${index}`}
          className="d-flex fw-bolder justify-content-left align-items-center"
        >
          {row.courseName}
        </div>
      ),
    },

    {
      name: "عنوان تسک",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.worktitle,
      cell: (row) => (
        <div
          key={row.id}
          className="d-flex fw-bolder justify-content-left align-items-center"
        >
          {row.worktitle}
        </div>
      ),
    },

    {
      name: "توضیحات تسک",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.workDescribe,
      cell: (row) => (
        <div
          key={row.id}
          className="d-flex fw-bolder justify-content-left align-items-center"
        >
          {row.workDescribe}
        </div>
      ),
    },

    {
      name: "تاریخ انتشار",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.inserDate,
      cell: (row) => (
        <div
          key={row.id}
          className="d-flex fw-bolder justify-content-left align-items-center"
        >
          {row.inserDate
            ? moment(row.inserDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "تاریخ انتشار",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.workDate,
      cell: (row) => (
        <div
          key={row.id}
          className="d-flex fw-bolder justify-content-left align-items-center"
        >
          {row.workDate
            ? moment(row.workDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "اقدام",
      minWidth: "100px",
      cell: (row) => (
        <div key={row.id} className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <AssistanceEdit data={row} className="font-medium-2" />
            </DropdownToggle>
          </UncontrolledDropdown>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
            <Row>
              <Col xl="6" className="d-flex align-items-center px-5">
                <div className="d-flex align-items-center w-100">
                  <label htmlFor="rows-per-page">مرتب سازی</label>
                  <Input
                    className="mx-50 w-25"
                    type="select"
                    id="rows-per-page"
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
                    placeholder="جستجو..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                <div className="d-flex  table-header-actions">
                  <Button className="add-new-user" color="primary">
                    جستجو
                  </Button>
                </div>

                <div className=" mx-2">
                  <AssistanceAdd data={data} />
                </div>
              </Col>
            </Row>
          </div>
          <DataTable
            sortServer
            pagination
            responsive
            keyField="index"
            paginationServer
            columns={columns}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={fiterSearch}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default AssisranceWork;
