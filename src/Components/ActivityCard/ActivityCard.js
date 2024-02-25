import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ActivityCard.css"


const unix = require("unix-timestamp")



function ActivityCard ({activity}){
  // user reactstrap Card component to render activity data

  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate(`./activity/${activity.activity_id}/delete`)
  }

  
    return (
  <div className="ActivityCard">
<Card
  className="my-2 text-center"
  color="dark"
  inverse
  style={{
    width: '25rem',
    height:'18rem',
    padding: "3%",
    background: "linear-gradient(142deg, rgba(54,94,94,1) 3%, rgba(0,4,8,1) 97%)"
  }}>
<CardBody>
      <CardText>
        <h4><b>{activity.name}</b></h4>
        <br></br>
        <h5><b>Distance: </b>{Math.floor(activity.traveltime/60)+1} minutes by {activity.travelmode}</h5>
        {<h5><b>Category:</b> {activity.category || "-"}</h5>}
        <h5><a href={activity.googlemaps_link} target="_blank"><b>Googlemaps Link</b></a></h5>
      </CardText>
      <Button onClick={handleClick}>Delete</Button>
    </CardBody>
  </Card>


  </div>
      )

}

export default ActivityCard