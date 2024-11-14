import { Badge, Card, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Archive, ChevronDown, MoreVertical, Trash2 } from "react-feather";
import DataTable from "react-data-table-component";
import Avatar from "@components/avatar";
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
import "@styles/react/libs/tables/react-dataTable-component.scss";
// import { getApi } from "../../../core/api/api";
import toast from "react-hot-toast";

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "214/627",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: vueLabel,
  },
];

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام دوره",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center ">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="25"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "عنوان کامنت ",
    selector: (row) => row.totalTasks,
  },
  {
    name: "متن کامنت ",
    selector: (row) => row.totalTasks,
  },
  {
    name: 'وضعیت',
    minWidth: '100px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color='success' pill >
        {row.status} تایید شده
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
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle' onClick={() => toast.success('عملیات با موفقیت انجام شد.')}>عدم تایید</span>
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
              <span className='align-middle' onClick={() => toast.success('عملیات با موفقیت انجام شد.')}>حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
];

const UserComments = () => {
  // const [data, setData] = useState([]);
  // const GetCouresesView = async () => {
  //   const path = ``;
  //   const response = await getApi({ path });
  //   console.log(response.data);
  //   setData(response.data);
  // };

  // useEffect(() => {
  //   GetCouresesView();
  // }, []);

  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserComments;
