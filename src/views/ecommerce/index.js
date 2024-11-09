// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import Sales from './Sales'
import GoalOverview from './GoalOverview'
import ChartJS from './index2'
import GoalOverview2 from './GoalOverview2'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** vars
  const trackBgColor = '#e9ecef'

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col>

        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>

      <Row className='match-height'>
      <Col xl='8' md='6' xs='12'>
          <ChartJS />
        </Col>

        <Col xl='4' md='6' xs='12'>
          <GoalOverview2 />
        </Col>
      </Row>
      
      <Row className='match-height'>
        <Col lg='4' md='12'>
          
            {/* <Col lg='6' md='3' xs='6'>
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg='6' md='3' xs='6'>
              <ProfitLineChart info={colors.info.main} />
            </Col> */}
            {/* <Col lg='12' md='6' xs='12'>
          <ChartJS />
        </Col>
            <Col lg='12' md='6' xs='12'>
          <GoalOverview2 />
        </Col> */}
          
        </Col>
        {/* <Col lg='8' md='12'>
          <RevenueReport primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
        <Col lg='4' md='6' xs='12'>
          <Sales />
        </Col> */}

      </Row>

      <Row className='match-height'>
        <Col lg='4' md='6' xs='12'>
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>

        <Col lg='4' md='6' xs='12'>
          <Sales />
        </Col>

        <Col lg='4' md='6' xs='12'>
          <GoalOverview />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
