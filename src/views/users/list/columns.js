import { Link } from 'react-router-dom'
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap'


export const columns = [


  {
    name: 'نام کاربر',
    sortable: true,
    minWidth: '110px',
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
    name: 'نقش',
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
    name: 'ایمیل',
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
    name: 'درصد تکمیل پروفایل',
    selector: row => row.progress,
    sortable: true,
    cell: row => {
      return (
        <div className='d-flex flex-column w-100'>
          <small className='mb-1'>{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: '6px' }}
            className={`w-100 progress-bar-${row.progressColor}`}
          />
        </div>
      )
    }
  },

  {
    name: 'وضعیت',
    minWidth: '100px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color='success' pill  >
        {row.status} فعال
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
              to="/users-view"
              // to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle' >جزئیات</span>
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
