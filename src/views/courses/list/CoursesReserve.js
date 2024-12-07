import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  Archive,
  ChevronDown,
  FileText,
  MoreVertical,
} from "react-feather";
import {
  Card,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import { getApi } from "../../../core/api/api";

const CoursesReserve = () => {
  const [data, setData] = useState([]);
  const GetCouresesReserve = async () => {
    const path = `/CourseReserve`;
    const response = await getApi({ path });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    GetCouresesReserve();
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



  const columns = [
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.courseName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.courseName}
        </div>
      ),
    },

    {
      name: "نام دانشجو",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.studentName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.studentName}
        </div>
      ),
    },

    {
      name: "تاریخ رزرو",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.reserverDate,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.reserverDate}
        </div>
      ),
    },

    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.accept,
      cell: (row) => (
        <span>
          {row.accept ? (
            <Badge className="text-capitalize" color="success" pill>
              تایید شده
            </Badge>
          ) : (
            <Badge className="text-capitalize" color="danger">
              تایید نشده
            </Badge>
          )}
        </span>

        // color={statusObj[row.status]} pill
        // color='success' pill
        // color='danger' pill
        // color='secondary' pill
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
                <span className="align-middle">تائید</span>
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
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CoursesReserve;
