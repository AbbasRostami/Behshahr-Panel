import { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import CardMedal from "./../ecommerce/CardMedal";
import StatsCard from "./../ecommerce/StaticiesSite";
import CardBrowserStates from "./../ecommerce/CardBrowserState";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import Sales from "./Sales";
import GoalOverview from "./GoalOverview";
import ChartJS from "./ChartJS";
import GoalOverview2 from "./GoalOverview2";

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors);
  const trackBgColor = "#e9ecef";

  const [data, setData] = useState([])
   const GetDashboardReport = async () => {
     const path = `/DashboardReport`;
     const response = await getApi({ path });
     console.log("Dashboard: ", response.data);
     setData(response.data)
   };

   useEffect(() => {
    GetDashboardReport(); 
  }, []);


  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>

        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>

      <Row className="match-height">
        <Col xl="8" md="6" xs="12">
          <ChartJS />
        </Col>

        <Col xl="4" md="6" xs="12">
          <GoalOverview2 />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>

        <Col lg="4" md="6" xs="12">
          <Sales />
        </Col>

        <Col lg="4" md="6" xs="12">
          <GoalOverview />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
