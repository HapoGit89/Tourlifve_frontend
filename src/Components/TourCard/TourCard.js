import { Card, CardBody,CardTitle, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./TourCard.css"

// user reactstrap Card component to render tour data
function TourCard({ tour }) {

  // format dates for render
  const end = tour.enddate.slice(0, 10)
  const start = tour.startdate.slice(0, 10)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`./${tour.id}`)
  }

  return (
    <Card
      className="my-2 TourC"
      color="dark"
      inverse
    >
      <CardBody className="CardBod" >
        <CardTitle >
          <h2>{tour.title}</h2>
          <h4> <b>Artist:</b> {tour.artist}</h4>
          <br></br>
          <h5><b>Start:</b> {start}</h5>
          <h5><b>End:</b> {end}</h5>
        </CardTitle>
        <Button className= "But"onClick={handleClick}
        >
          Details
        </Button>
      </CardBody>
    </Card>
  )

}

export default TourCard