import {React, useContext, useEffect} from "react"
import "./ActivityList.css"
import userContext from "../../userContext"
import TourStopCard from "../TourStopCard/TourStopCard"
import ActivityCard from "../ActivityCard/ActivityCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"





function ActivityList({activities}){

if(activities.length > 0){
return (
<>
<div className="ActivitiesHeading">
            <h1>Your Saved Places:</h1>
            </div>
    <div className="ActivitiesList">
        
        {activities.map((el)=><ActivityCard activity={el}></ActivityCard>)}
        <Button size= "lg">Add Place</Button>
    </div>
    </>
)

}
else {
    return (
        <>
        <div className="Activitiesheading">
        <h1>Your Saved Places:</h1>
        </div>
        <div className="ActivitiesList">
          
            <h3>No Places yet, add some!</h3>
            <Button>Find And Add Places</Button>
        </div>
        </>
    )
}
}


export default ActivityList