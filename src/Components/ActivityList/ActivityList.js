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
    <div className="ActivitiesList">
        <div className="ActivitiesHeading">
            <h1>Your Remembered Places:</h1>
            </div>
        {activities.map((el)=><ActivityCard activity={el}></ActivityCard>)}
        <Button>Add Place</Button>
    </div>
)

}
else {
    return (
        <div className="TourstopsList">
            <div className="Tourstopsheading">
                <h1>Your Saved Places:</h1>
                </div>
            <h3>No Places yet, add some!</h3>
            <Button>Find And Add Places</Button>
        </div>
    )
}
}


export default ActivityList