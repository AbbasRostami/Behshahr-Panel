import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
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
