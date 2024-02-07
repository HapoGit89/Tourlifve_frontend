import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ActivityCard.css"


const unix = require("unix-timestamp")



function ActivityCard ({activity}){
  // user reactstrap Card component to render activity data

  const navigate = useNavigate()

  
    return (
  <div className="ActivityCard">
<Card
  className="my-2"
  color="dark"
  inverse
  style={{
    width: '40rem',
    height:'10rem'
  }}>
<CardBody>
      <CardText>
        <h3>Name: {activity.name}</h3>
        <h3>Category: {activity.category}</h3>
        <h3>Adress: {activity.adress}</h3>
      </CardText>
    </CardBody>
  </Card>


  </div>
      )

}

export default ActivityCard