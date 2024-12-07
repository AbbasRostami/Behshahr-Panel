import { Fragment, useState } from "react";
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
import moment from "moment-jalaali";
import { useGetSth, usePutSth } from "../../../core/apiPost";
import BuildingAdd from "./BuildingAdd";
import BuildingEdit from "./BuildingEdit";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
const MySwal = withReactContent(Swal);

const BuildingList = () => {
  const { data = [] } = useGetSth("/Building", {
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });
  const [show, setShow] = useState(false);

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

  const queryClient = useQueryClient();
  const { mutate } = usePutSth("/Building/Active");

  const handleSuspendedClick = async (row) => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "البته امکان بازگشت وجود ندارد",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(
          {
            active: !row.active,
            id: row.id,
          },
          {
            onSuccess: (response) => {
              console.log("Response:", response);
              queryClient.invalidateQueries(["/Building"]);
              setShow(false);

              MySwal.fire({
                title: "عملیات موفقیت‌آمیز بود",
                text: "اطلاعات جدید با موفقیت ثبت شد",
                icon: "success",
                confirmButtonText: "باشه",
                customClass: { confirmButton: "btn btn-success" },
                buttonsStyling: false,
              });
            },
            onError: (error) => {
              console.error("خطا در ویرایش ساختمان:", error);
              MySwal.fire({
                title: "خطا در عملیات",
                text: "مشکلی در ویرایش ساختمان رخ داد. لطفاً دوباره تلاش کنید.",
                icon: "error",
                confirmButtonText: "تلاش مجدد",
                customClass: { confirmButton: "btn btn-danger" },
                buttonsStyling: false,
              });
            },
          }
        );
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو عملیات",
          text: "عملیات لغو شد.",
          icon: "info",
          confirmButtonText: "باشه",
          customClass: {
            confirmButton: "btn btn-secondary",
          },
        });
      }
    });
  };

  const columns = [
    {
      name: "نام ساختمان",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.buildingName,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.buildingName}
        </div>
      ),
    },

    {
      name: "طبقه",
      sortable: true,
      minWidth: "200px",
      sortField: "fullName",
      selector: (row) => row.floor,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.floor}
        </div>
      ),
    },

    {
      name: "زمان کاری",
      sortable: true,
      minWidth: "200px",
      sortField: "inserDate",
      selector: (row) => row.workDate,
      cell: (row) => (
        <div className="d-flex fw-bolder justify-content-left align-items-center">
          {row.workDate
            ? moment(row.workDate, "YYYY/MM/DD").format("jYYYY/jMM/jDD")
            : "تاریخ نامشخص"}
        </div>
      ),
    },
    {
      name: "وضعیت",
      minWidth: "138px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.active,
      cell: (row) => (
        <span>
          {row.active ? (
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
              <Eye size={14} className="cursor-pointer" />
            </DropdownToggle>

            <DropdownMenu persist>
              <div key={row.id} className="column-action">
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="btn btn-sm">
                    <BuildingEdit data={row} className="font-medium-2" />
                  </DropdownToggle>
                </UncontrolledDropdown>
              </div>
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
                  <BuildingAdd data={data} />
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

export default BuildingList;
