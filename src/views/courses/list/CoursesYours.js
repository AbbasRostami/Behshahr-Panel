import { Fragment, useState } from "react";
// import { columns } from "./columns";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { Archive, ChevronDown, FileText, MoreVertical, Trash2 } from "react-feather";

import { Row, Col, Card, Input, Button, Badge, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";

import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";

const CustomHeader = ({
  handlePerPage,
  rowsPerPage,
  searchTerm,
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

  const datas = [
    { name: "a", lastname: "b" },
    { name: "a", lastname: "b" },
    { name: "a", lastname: "b" },
  ];

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
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  }
  
   const columns = [
  
  
    {
      name: 'نام دوره',
      sortable: true,
      minWidth: '200px',
      sortField: 'fullName',
      selector: row => row.name,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
             {/* <Avatar className='me-1' img={row.avatar} width='32' height='32' /> */}
          {row.name}
          
       
          <div className='d-flex flex-column'>
            <Link
              to={`/apps/user/view/${row.id}`}
              className='user_name text-truncate text-body'
              onClick={() => store.dispatch(getUser(row.id))}
            >
            </Link>
            
            <small className='text-truncate text-muted mb-0'>{row.email}</small>
          </div>
        </div>
      )
    },
  
    {
      name: 'نوع دوره',
      sortable: true,
      minWidth: '200px',
      sortField: 'fullName',
      selector: row => row.lastname,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.lastname}
          <div className='d-flex flex-column'>
            
              <span className='fw-bolder'>{row.lastname}</span>
            
          </div>
        </div>
      )
    },
  
    {
      name: 'سطح دوره',
      sortable: true,
      minWidth: '200px',
      sortField: 'fullName',
      selector: row => row.lastname,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          {row.lastname}
          <div className='d-flex flex-column'>
            <Link
              to={`/apps/user/view/${row.id}`}
              className='user_name text-truncate text-body'
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className='fw-bolder'>{row.lastnamelastname}</span>
            </Link>
            <small className='text-truncate text-muted mb-0'>{row.email}</small>
          </div>
        </div>
      )
    },
  
    {
      name: 'وضعیت فعال بودن',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.status,
      cell: row => (
        <Badge className='text-capitalize' color='success' pill  >
          {row.status} success
        </Badge>
  
        // color={statusObj[row.status]} pill
        // color='success' pill
        // color='danger' pill
        // color='secondary' pill
  
      )
    },
  
    {
      name: 'وضعیت موجود بودن',
      minWidth: '138px',
      sortable: true,
      sortField: 'status',
      selector: row => row.status,
      cell: row => (
        <Badge className='text-capitalize' color='danger' pill  >
          {row.status} danger
        </Badge>
  
        // color={statusObj[row.status]} pill
        // color='success' pill
        // color='danger' pill
        // color='secondary' pill
  
      )
    },
  
  
    {
      name: 'اقدام',
      minWidth: '100px',
      cell: row => (
        <div className='column-action'>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                tag={Link}
                className='w-100'
                to={`/apps/user/view/${row.id}`}
                onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'>جزئیات</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={14} className='me-50' />
                <span className='align-middle'>ویرایش</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={e => {
                  e.preventDefault()
                  store.dispatch(deleteUser(row.id))
                }}
              >
                <Trash2 size={14} className='me-50' />
                <span className='align-middle'>حذف</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ]

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
            data={datas}
            subHeaderComponent={
              <CustomHeader
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default CoursesYours;
