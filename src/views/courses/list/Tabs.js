// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";


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
            <span className="fw-bold">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
          <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های استاد</span>
          </NavLink>
        </NavItem>
      
      </Nav>

      
    </Fragment>
  );
};
export default CoursesListTabs;
