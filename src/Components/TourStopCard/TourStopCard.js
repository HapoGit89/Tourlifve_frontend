import { Card, CardBody, CardText, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./TourStopCard.css"


// user reactstrap Card component to render tourstop
function TourStopCard({ tourstop }) {
  const navigate = useNavigate()
  const date = tourstop.date.slice(0, 10)  // format date for rendering


  return (
    <div className="TourStopC">
      <Card
        className="my-2 TCard"
       >
        <CardBody className="cardBod">
          <CardText>
            {`${date} - ${tourstop.city} - ${tourstop.name}`} 
          </CardText>
        </CardBody>
      </Card>
      <Button className="DetailBut" onClick={() => navigate(`../tourstops/${tourstop.id}`)}>Details</Button>
    </div>
  )

}

export default TourStopCard