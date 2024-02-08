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
    height:'15rem',
    padding: "5%"
  }}>
<CardBody>
      <CardText>
        <h3>{activity.name}</h3>
        <h4>Category: {activity.category}</h4>
        <h4>Address: {activity.address}</h4>
        <h4>Distance: {Math.floor(activity.traveltime/60)+1} minutes by {activity.travelmode}</h4>
      </CardText>
    </CardBody>
  </Card>


  </div>
      )

}

export default ActivityCard