import {React, useContext} from "react"
import "./TourList.css"
import userContext from "../../userContext"
import TourCard from "../TourCard/TourCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"


function TourList(){
  const user = useContext(userContext)
  const navigate = useNavigate()


    if (user.token){  //Route protection
    return(
      <div className="TourListPage">
            
      <Button className="AddTourButton"
        color="secondary"
        onClick={()=>navigate("./new")}
      >
        Create NEW ...
      </Button>

        <div className="TourList">
          
          {user.tours.map((el,id)=>(<div className="TourCard" key={id}><TourCard tour={el}/></div>))}
        </div>
        </div>
    )}

    else{
      return (
        <div>
          <h1>Please log in to see this page</h1>
        </div>
      )
    }
}

export default TourList