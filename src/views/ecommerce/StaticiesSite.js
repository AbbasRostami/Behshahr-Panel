import { TrendingUp, User, Box, DollarSign } from "react-feather";
import Avatar from "@components/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const StatsCard = ({ cols, data }) => {
  const icons = {
    icon1: <TrendingUp size={24} />,
    icon2: <User size={24} />,
    icon3: <Box size={24} />,
    icon4: <DollarSign size={24} />,
    color1: "light-primary",
    color2: "light-info",
    color3: "light-danger",
    color4: "light-success",
  };
  const renderData = () => {
    return (
      <>
        <Col {...cols} className="mb-2">
          <div className="d-flex align-items-center">
            <Avatar color={icons.color1} icon={icons.icon1} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{data?.allUser}</h4>
              <CardText className="font-small-3 mb-0">کاربران</CardText>
            </div>
          </div>
        </Col>
        <Col {...cols} className="mb-2">
          <div className="d-flex align-items-center">
            <Avatar color={icons.color2} icon={icons.icon2} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{data?.allReserve}</h4>
              <CardText className="font-small-3 mb-0">دوره ها'</CardText>
            </div>
          </div>
        </Col>
        <Col {...cols} className="mb-2">
          <div className="d-flex align-items-center">
            <Avatar color={icons.color3} icon={icons.icon3} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{data?.deactiveUsers}</h4>
              <CardText className="font-small-3 mb-0">اساتید</CardText>
            </div>
          </div>
        </Col>
        <Col {...cols} className="mb-2">
          <div className="d-flex align-items-center">
            <Avatar color={icons.color4} icon={icons.icon4} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{data?.allPaymentCost}</h4>
              <CardText className="font-small-3 mb-0">پرداختی ها'</CardText>
            </div>
          </div>
        </Col>
      </>
    );
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4" className="fs-3">
          آمار سایت
        </CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          Updated 1 month ago
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
