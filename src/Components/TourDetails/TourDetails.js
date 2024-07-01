import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { TourApi } from "../../api"
import { Button } from "reactstrap"
import userContext from "../../userContext"
import TourstopList from "../TourstopsList/TourstopsList"
import "./TourDetails.css"

// Shows details for tour including tourstops
function TourDetails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const user = useContext(userContext)
  const navigate = useNavigate()

  // get tour info for given handle via TourApi and update state
  useEffect(() => {
    const getTourData = async () => {
      const res = await TourApi.getTourDetails(id)
      setData(res.tour)
    }
    getTourData()

  }, [user])

  // handle edit button click
  const handleClick1 = () => {
    navigate("./edit")
  }

  // handle detele button click
  const handleClick2 = () => {
    navigate("./delete")
  }

  if (data && user.token && data.user_id == user.id) {  //conditional render protects route 
    return (
      <div className="TourDet">
        <div className="TourInfo">
          <h1>Tour Details</h1>
          <br></br>
          <h2>Title: {data.title}</h2>
          <h3>Artist: {data.artist}</h3>
          <h4>Start: {data.startdate.slice(0, 10)}</h4>
          <h4>End: {data.enddate.slice(0, 10)}</h4>
          <br></br>
          <div className="TourButtons">
            <Button size="lg" onClick={handleClick1}>Edit</Button>
            <Button size="lg" color="danger" onClick={handleClick2}>Delete</Button>
          </div>
        </div>
        <div className="Tourstops">
          <TourstopList tour_id={id} tourstops={data.tourstops}></TourstopList>
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

export default TourDetails