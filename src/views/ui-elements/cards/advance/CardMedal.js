// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/badge.svg'

const CardMedal = () => {
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>سلام </h5>
        
        <CardText className='font-small-6'>خوش آمدید !!!</CardText>

        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal
