import { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Bookmark} from "react-feather";
import UserProjectsList from "./UserProjectsList";
import GroupsList from "./groups";
import Comments from "./comments";
import Status from "./status";

const CoursesTab = ({ active, toggleTab, data }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">کاربرها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">گروه ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold"> کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">پرداختی ها</span>
          </NavLink>
        </NavItem>
        <NavItem></NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserProjectsList data={data}/>
        </TabPane>

        <TabPane tabId="2">
          <GroupsList />
        </TabPane>

        <TabPane tabId="3">
          <Comments  data={data}/>
        </TabPane>

        <TabPane tabId="4">
          <Status />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default CoursesTab;
