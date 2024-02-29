import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { TourApi } from "../../api"
import { Button } from "reactstrap"
import userContext from "../../userContext"
import "./ActivityDelete.css"

// Delete Window for Activities
function ActivityDelete() {
  const { activity_id } = useParams()
  const [data, setData] = useState(null)
  const user = useContext(userContext)
  const navigate = useNavigate()

  // get activity details for use in Confirm Window
  useEffect(() => {
    const getActivityData = async () => {
      const res = await TourApi.getActivity(activity_id)
      setData(res.activity)
    }
    getActivityData()

  }, [user])

  // delete Activity and show confirmation or error message
  const deleteActivity = async () => {
    const res = await TourApi.deleteActivity(activity_id)
    if (res.deleted) {
      alert(`Deleted Activity ${data.poi_name}`)
      navigate("./../../..")
      window.location.reload()
    }
    else {
      alert(`ooops something went wrong, please try again or contact admin`)
    }


  }

  // Click handle for "No" Button
  const handleClick1 = () => {
    navigate("./../../..")
  }

  // Click handle for "Yes" Button
  const handleClick2 = () => {
    deleteActivity()
  }




  if (data && user.token && data.user_id == user.id) {  //conditional render 
    return (
      <div className="TourDeleteCard">
        <div className="Tourinfo">
          <h1>Do your really want to delete activity:</h1>
          <br></br>
          <h1>{data.poi_name} ?</h1>
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

export default ActivityDelete