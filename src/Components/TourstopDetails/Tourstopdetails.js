import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { TourApi } from "../../api"
import ActivityList from "../ActivityList/ActivityList"
import { Card, CardBody, CardText, CardHeader, Button } from "reactstrap"
import "./TourstopDetails.css"
import userContext from "../../userContext"


// Shows tourstop details for given id
function TourstopDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const user = useContext(userContext)
  const navigate = useNavigate()


  // get TourstopDetails and store in state
  useEffect(() => {
    const getTourstopData = async () => {
      const res = await TourApi.getTourstopDetails(id)
      setData(res.tourstop)
    }
    getTourstopData()
  }, [user])


  // handle "edit" click
  const handleClick = () => {
    navigate("./edit")
  }


  // handle "delete" click
  const handleClick2 = () => {
    navigate("./delete")
  }


  if (data && user.token && user.tours.filter((el) => el.id == data.tour_id).length > 0) {  //conditional render protects route 
    return (
      <div className="TourstopDetails">
        <Card
          className="my-2"
          inverse
          style={{
            display: "flex",
            width: '65rem',
            height: '20rem',
            justifyContent: "flex-start",
            background: "linear-gradient(142deg, rgba(36,62,62,1) 3%, rgba(0,4,8,1) 97%)"
          }}
        >    <CardHeader tag="h4">
            Tourstop Details
          </CardHeader>
          <CardBody style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <CardText >
              <h2>{data.name}</h2>
              <br></br>
              <h4><b>City:</b> {data.city}</h4>
              <h4><b>Date:</b> {data.date.slice(0, 10)}</h4>
            </CardText>
            <div className="B">
              <Button size="lg" color="secondary" onClick={handleClick} >Edit</Button>
              <Button size="lg" color="danger" onClick={handleClick2}>Delete</Button>
            </div>
          </CardBody>
        </Card>
        <div className="ActivityList">
          <ActivityList activities={data.activities}></ActivityList>
        </div>
      </div>
    )
  }

  else if (data && user.token) {
    return (
      <div>
        <h1>Sorry but this is not your tour your looking for!</h1>
      </div>
    )
  }

  else {
    return (
      <div>
        <h1>Please log in to see this page</h1>
      </div>
    )
  }

}

export default TourstopDetails