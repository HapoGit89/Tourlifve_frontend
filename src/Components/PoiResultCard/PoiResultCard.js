import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./PoiResultCard.css"


const unix = require("unix-timestamp")



function PoiResultCard (props){
  // user reactstrap Card component to render activity data

  const navigate = useNavigate()

  const handleClick=()=>
  {props.createActivity()
}

  
    return (
  <div className="PoiResultsCard">
<Card
  className="my-2"
  inverse
  style={{
    width: '70vh',
    height: '50vh',
    background: "linear-gradient(142deg, rgba(36,62,62,1) 3%, rgba(0,4,8,1) 97%)"
  }}
>
  <CardHeader>
  <h3>Your Selected Place:</h3> 
  </CardHeader>
  <CardBody>
    <CardTitle tag="h3">
      {props.activity.name}
    </CardTitle>
    <CardText>
        <ul className="Details"  style={{listStyleType:"none"}}>
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