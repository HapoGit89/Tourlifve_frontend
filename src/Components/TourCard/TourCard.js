import { Card,CardBody, CardHeader,CardTitle,CardSubtitle, CardText,Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const unix = require("unix-timestamp")



function TourCard ({tour}){
  // user reactstrap Card component to render tour data
  const end = tour.enddate.slice(0,10)
  const start = tour.startdate.slice(0,10)
  const navigate = useNavigate()
  

  
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
          <Button onClick={()=>navigate(`./${tour.id}`)}>
       Details
    </Button>
        </CardBody>
      </Card>
 
    // <Card
    //     style={{
    //       width: '40vh'
    //     }}
    //   >
    //     <CardBody>
    //       <CardTitle tag="h5">
    //         <NavLink to={`./${tour.id}`}>{tour.title}</NavLink>
    //       </CardTitle>
    //       <CardSubtitle
    //         className="mb-2 text-muted"
    //         tag="h6"
    //       >
    //         @ {tour.artist}
    //       </CardSubtitle>
    //       <ul>
    //         <li>From: {tour.startdate}</li>
    //         <li>Through: {tour.enddate}</li>
    //       </ul>
      
    //     </CardBody>
    //   </Card>
      )

}

export default TourCard