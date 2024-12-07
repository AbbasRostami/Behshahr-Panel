import { Fragment, useContext } from 'react'
import { Row, Col } from 'reactstrap'
import BarChart from './ChartjsBarChart'
import { useSkin } from '@hooks/useSkin'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import 'chart.js/auto'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const ChartJS = ({data}) => {
  const { colors } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    successColorShade = '#28dac6'

  return (
    <Fragment>
      <Row className='match-height'>

        <Col xl='12' sm='12'>
          <BarChart data={data} success={successColorShade} labelColor={labelColor} gridLineColor={gridLineColor} />
        </Col>

      </Row>
    </Fragment>
  )
}

export default ChartJS
