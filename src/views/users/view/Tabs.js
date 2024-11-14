import { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { User, Lock, Bookmark } from "react-feather";
import UserProjectsList from "./UserCourses";
import Connections from "./SocialsAccount";
import GroupsList from "./UserReserve";
import Comments from "./UserComment";
import Status from "./ConnectedAccount";

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطلاعات کاربر</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">ارتباط با کاربر</span>
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
