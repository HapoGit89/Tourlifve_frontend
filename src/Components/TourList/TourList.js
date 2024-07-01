import { React, useContext } from "react"
import "./TourList.css"
import userContext from "../../userContext"
import TourCard from "../TourCard/TourCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"

// Lists user tours in cards
function TourList() {
  const user = useContext(userContext)
  const navigate = useNavigate()

  if (user.token && user.tours.length == 0) {
    return (
      <div className="TourListPage">
        <Button className="AddTourButton"
         
          onClick={() => navigate("./new")}
          size="lg"
          data-testid="AddButton">
          Create New Tour ...
        </Button>
        <div className="EmptyTourList">
          <h1>No Tours yet, add some!</h1>
        </div>
      </div>
    )
  }

  if (user.token) {
    return (
      <div className="TourListPage">
        <Button className="AddTourButton"
          onClick={() => navigate("./new")}
          size="lg">
          Create New Tour ...
        </Button>
        <div className="TourList">
          {user.tours.map((el, id) => (<div className="TourCard" key={id}><TourCard tour={el} /></div>))}
        </div>
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

export default TourList