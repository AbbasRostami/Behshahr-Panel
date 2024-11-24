// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";

// ** User Components
import UserProjectsList from "./UserProjectsList";
import Connections from "./Connections";
import GroupsList from "./groups";
import Comments from "./comments";
import Status from "./status";

const UserTabs = ({ active, toggleTab }) => {
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
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">اتصالات</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserProjectsList />
        </TabPane>

        <TabPane tabId="2">
          <GroupsList />
        </TabPane>

        <TabPane tabId="3">
          <Comments />
        </TabPane>

        <TabPane tabId="4">
          <Status />
        </TabPane>

        <TabPane tabId="5">
          <Connections />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
