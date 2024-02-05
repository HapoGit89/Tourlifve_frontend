import {React, useContext} from "react"
import "./TourList.css"
import userContext from "../../userContext"
import TourCard from "../TourCard/TourCard"


function TourList(){
  const user = useContext(userContext)


    if (user.token){  //Route protection
    return(
        <div className="TourList">
          {user.tours.map((el,id)=>(<div className="TourCard" key={id}><TourCard tour={el}/></div>))}
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