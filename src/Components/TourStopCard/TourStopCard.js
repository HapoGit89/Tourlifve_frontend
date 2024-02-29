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
        className="my-2"
        style={{
          width: '35rem',
          height: '4rem',
          background: "linear-gradient(142deg, rgba(54,94,94,1) 3%, rgba(0,4,8,1) 97%)",
          borderStyle: "solid",
          borderColor: "white",
          color: "white"
        }}>
        <CardBody style={{ alignItems: "center" }}>
          <CardText>
            <p>{`${date} - ${tourstop.city} - ${tourstop.name}`} </p>
          </CardText>
        </CardBody>
      </Card>
      <Button style={{ marginLeft: "5%", height: "3rem" }} onClick={() => navigate(`../tourstops/${tourstop.id}`)}>Details</Button>
    </div>
  )

}

export default TourStopCard