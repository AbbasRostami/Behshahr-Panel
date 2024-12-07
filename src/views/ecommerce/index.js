import { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import CardMedal from "./../ecommerce/CardMedal";
import StatsCard from "./../ecommerce/StaticiesSite";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import ChartJS from "./ChartJS";
import GoalOverview2 from "./GoalOverview2";
import { getApi } from "../../core/api/api";
import ApexRadialbar from "./ApexRadialbar";
import ChartjsPolarAreaChart from "./ChartjsPolarAreaChart";
import ApexRadiarChart from "./ApexRadarChart";

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors);
  const trackBgColor = "#e9ecef";

  const [data, setData] = useState([])
   const GetDashboardReport = async () => {
     const path = `/Report/DashboardReport`;
     const response = await getApi({ path });
     console.log("Dashboard: ", response.data);
     setData(response.data)
   };

   useEffect(() => {
    GetDashboardReport(); 
  }, []);


  const [tech, setTech] = useState([])
   const GetDashboardReportTech = async () => {
     const path = `/Report/DashboardTechnologyReport`;
     const response = await getApi({ path });
     console.log("Dashboard: ", response.data);
     setData(response.data)
   };

   useEffect(() => {
    GetDashboardReportTech(); 
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal data={data} tech={tech}/>
        </Col>

        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} data={data} tech={tech}/>
        </Col>
      </Row>

      <Row className="match-height">
        <Col xl="8" md="6" xs="12">
          <ChartJS data={data} tech={tech}/>
        </Col>

        <Col xl="4" md="6" xs="12">
          <GoalOverview2 data={data} tech={tech}/>
        </Col>
      </Row>
      <Row className="match-height">
      <Col xl="6" md="6" xs="12">
          <ChartjsPolarAreaChart  data={data} tech={tech}/>
        </Col>
        <Col xl="6" md="6" xs="12">
          <ApexRadiarChart  data={data} tech={tech}/>
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
