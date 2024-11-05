import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import SidebarNewUsers from "../views/apps/user/list/Sidebar";
import UsersList from "../views/apps/user/list";

const SecondPage = () => {
  return (
    <>
      <Card>
        <UsersList />
      </Card>
    </>
  );
};

export default SecondPage;
