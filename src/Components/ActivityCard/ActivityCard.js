import { Card, CardBody, CardText, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./ActivityCard.css"


// User reactstrap Card component to render activity data
function ActivityCard({ activity }) {
  const navigate = useNavigate()

  // handle Click on Delete Button
  const handleClick = () => {
    navigate(`./activity/${activity.activity_id}/delete`)
  }


  return (
    <div className="ActivityCard">
      <Card
        className="my-2 text-center ActCardIn"
        color="dark"
        inverse
        >
        <CardBody>
          <CardText>
            <h5><b>{activity.name}</b></h5>
            <br></br>
            <div className="ActivityInfo">
              <p><b>Distance: </b>{Math.floor(activity.traveltime / 60) + 1} minutes by {activity.travelmode}</p>
              {<p><b>Category:</b> {activity.category || "-"}</p>}
              <p><a href={activity.googlemaps_link} target="_blank"><b>Googlemaps Link</b></a></p>
            </div>
          </CardText>
          <Button onClick={handleClick}>Delete</Button>
        </CardBody>
      </Card>


    </div>
  )

}

export default ActivityCard