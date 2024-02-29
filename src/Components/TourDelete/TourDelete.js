import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { TourApi } from "../../api"
import { Button } from "reactstrap"
import userContext from "../../userContext"
import "./TourDelete.css"

// Confirmation window for tour delete request
function TourDelete() {

  const { id } = useParams()
  const [data, setData] = useState(null)
  const user = useContext(userContext)
  const navigate = useNavigate()

  // get tourdetails for use in TourdeleteCard
  useEffect(() => {
    const getTourData = async () => {
      const res = await TourApi.getTourDetails(id)
      setData(res.tour)
    }
    getTourData()
  }, [user])

  // delete Tour or handle error
  const deleteTour = async () => {
    const res = await TourApi.deleteTour(id)
    if (res.deleted) {
      alert(`Deleted Tour ${data.title}`)
      navigate("./../..")
      window.location.reload()
    }
    else {
      alert(`${res.error.message}`)
    }


  }

  // handle "No" click
  const handleClick1 = () => {
    navigate("./..")

  }

  // handle "Yes" click
  const handleClick2 = () => {
    deleteTour()


  }


  if (data && user.token && data.user_id == user.id) {  //conditional render protects route 
    return (
      <div className="TourDeleteCard">
        <div className="Tourinfo">
          <h1>Do your really want to delete tour:</h1>
          <br></br>
          <h1>{data.title} ?</h1>
          <div className="Buttons">
            <Button size="lg" color="primary" onClick={handleClick1}>No</Button>
            <Button size="lg" color="danger" onClick={handleClick2}>Yes</Button>
          </div>
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

export default TourDelete