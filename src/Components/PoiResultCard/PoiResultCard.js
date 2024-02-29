import { Card, CardBody, CardHeader, CardTitle, CardText, Button } from "reactstrap";
import "./PoiResultCard.css"


//component for showing poi details (from GoogleMap) and save poi as activity
function PoiResultCard(props) {

  // handle Save Button Click
  const handleClick = () => {
    props.createActivity()
  }

  return (
    <div className="PoiResultsCard">
      <Card
        className="my-2 PoiCardBody"
        inverse
      >
        <CardHeader>
          <h3>Your Selected Place:</h3>
        </CardHeader>
        <CardBody>
          <CardTitle tag="h3">
            {props.activity.name}
          </CardTitle>
          <CardText>
            <ul className="Details">
              <li><h5><b>Adress:</b>{props.activity.address}</h5></li>
              <li><h5><b>Distance:</b> {props.activity.distance}</h5></li>
              <li><h5><b>Traveltime:</b> {props.activity.mode}  {props.activity.duration_text} </h5></li>
              <li><h5> <a href={props.activity.googlemaps_uri} target="_blank"><b>{props.activity.googlemaps_uri && "Googlemaps Link"}</b></a> </h5></li>
            </ul>
          </CardText>
          <Button onClick={handleClick}>
            Save for Tourstop
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default PoiResultCard