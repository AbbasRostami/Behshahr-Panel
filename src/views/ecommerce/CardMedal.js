import { Card, CardBody, CardText } from "reactstrap";
import medal from "@src/assets/images/badge.svg";

const CardMedal = () => {
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5 className="fs-3">سلام</h5>
        <h3>Abbas Rostami</h3>
        <CardText className="fs-1 lh-1 ">خوش آمدید 😁 </CardText>

        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
