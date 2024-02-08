import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TourStopCard.css"
const unix = require("unix-timestamp")



function TourStopCard ({tourstop}){
  // user reactstrap Card component to render tour data
  const date = tourstop.date.slice(0,10)
  const navigate = useNavigate()

  

  
    return (
  <div className="TourStopCard">
<Card
  className="my-2"
  color="light"
 
  style={{
    width: '40rem',
    height:'4rem'
  }}>
<CardBody>
      <CardText>
        <p>{`${date} - ${tourstop.city} - ${tourstop.name}`} <Button style={{marginLeft: "5%"}} onClick={()=>navigate(`../tourstops/${tourstop.id}`)}>Details</Button></p>
      </CardText>
    </CardBody>
  </Card>


  </div>
      )

}

export default TourStopCard