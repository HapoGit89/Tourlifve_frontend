import { Card, CardBody, CardHeader, CardTitle, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

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
      className="my-2"
      color="dark"
      inverse
      style={{
        width: '18rem',
        height: '18rem'
      }}
    >
      <CardBody style={{ border: "solid", borderColor: "white", background: "linear-gradient(142deg, rgba(36,62,62,1) 3%, rgba(0,4,8,1) 97%)" }}>
        <CardTitle >
          <h2>{tour.title}</h2>
          <h4> <b>Artist:</b> {tour.artist}</h4>
          <br></br>
          <h5><b>Start:</b> {start}</h5>
          <h5><b>End:</b> {end}</h5>
        </CardTitle>
        <Button onClick={handleClick}
          style={{ margin: "5%" }}>
          Details
        </Button>
      </CardBody>
    </Card>
  )

}

export default TourCard