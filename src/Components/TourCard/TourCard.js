import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const unix = require("unix-timestamp")



function TourCard ({tour}){
  // user reactstrap Card component to render tour data
  const end = tour.enddate.slice(0,10)
  const start = tour.startdate.slice(0,10)
  const navigate = useNavigate()


  const handleClick = ()=>{
    navigate(`./${tour.id}`)
  }
  

  
    return (
        <Card
        className="my-2"
        color="dark"
        inverse
        style={{
          width: '18rem',
          height:'18rem'
        }}
      >
        <CardBody>
          <CardTitle tag="h2">
            {tour.title}
          </CardTitle>
          <CardText>
            <h4>Artist: {tour.artist}</h4>
            <p>Start: {start}</p>
            <p>End: {end}</p>
          </CardText>
          <Button onClick={handleClick}>
       Details
    </Button>
        </CardBody>
      </Card>
 
      )

}

export default TourCard