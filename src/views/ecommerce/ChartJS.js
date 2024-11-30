// ** React Imports
import { Fragment, useContext } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Deom Charts
import BarChart from './ChartjsBarChart'


// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Third Party Components
import 'chart.js/auto'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ChartJS = () => {
  // ** Context, Hooks & Vars
  const { colors } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    successColorShade = '#28dac6'

  return (
    <Fragment>
      <Row className='match-height'>

        <Col xl='12' sm='12'>
          <BarChart success={successColorShade} labelColor={labelColor} gridLineColor={gridLineColor} />
        </Col>

      </Row>
    </Fragment>
  )
}

export default ChartJS
