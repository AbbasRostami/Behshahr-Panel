import { Fragment } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye, FileText, Trash2 } from "react-feather";

import {
  Row,
  Col,
  Card,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Badge,
} from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";
import AssistanceAdd from "./TermAdd";
import moment from "moment-jalaali";
import { useGetSth } from "../../../core/apiPost";

const TermList = () => {

  const { data } = useGetSth('/Term', {
    staleTime: 5 * 60 * 1000,
    enabled: true, 
  });

  // const handleSuspendedClick = async (course) => {
  //   const path = `/Building/Active`;
  //   const body = {
  //     isActive: !course.isActive,
  //     id: course.courseId,
  //   };
  
  //   const response = await editApi({ path, body });
  
  //   if (response.data.success) {
  //     toast.success(response.data.message);
  
  //     setData((prevData) =>
  //       prevData.map((item) =>
  //         item.courseId === course.courseId
  //           ? { ...item, isActive: !item.isActive } 
  //           : item
  //       )
  //     );
  //   } else {
  //     toast.error("عملیات انجام نشد، مشکلی پیش آمد.");
  //   }
  
  //   console.log("Response Put Active/Deactive:", response);
  // };


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
      name: "عنوان ترم",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.termName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.termName}
        </div>
      ),
    },
    {
      name: "تاریخ انتشار",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.insertDate,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.insertDate
            ? moment(row.insertDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "تاریخ شروع",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.startDate,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.startDate
            ? moment(row.startDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "تاریخ پایان",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.endDate,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.endDate
            ? moment(row.endDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "نام واحد",
      sortable: true,
      minWidth: "150px",
      sortField: "fullName",
      selector: (row) => row.departmentName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.departmentName}
        </div>
      ),
    },
    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.expire,
      cell: (row) => (
        <span>
          {row.expire ? (
            <Badge className=" fw-bolder text-capitalize" color="success" pill>
              فعال
            </Badge>
          ) : (
            <Badge className="fw-bolder text-capitalize" color="danger">
              منقضی شده
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
              <Eye size={14} className="cursor-pointer" />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem tag={Link} className="w-100">
                <FileText size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
              <DropdownItem
                className="w-100"
                onClick={() => handleSuspendedClick(row)}
              >
                <Trash2 size={14} className="me-50" />
                <span className="align-middle">غیرفعال / غیرفعال</span>
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

export default TermList;
