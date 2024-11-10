// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";
import CoursesLists from ".";



const CoursesListTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های شما</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
          <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
          <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های استاد</span>
          </NavLink>
        </NavItem>
      
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CoursesLists />
        </TabPane>

        {/* <TabPane tabId="2">
          <UserProjectsList />
        </TabPane>

        <TabPane tabId="3">
          <UserProjectsList />
        </TabPane> */}
      </TabContent>
    </Fragment>
  );
};
export default CoursesListTabs;
