import {React, useContext, useEffect} from "react"
import "./TourstopsList.css"
import userContext from "../../userContext"
import TourStopCard from "../TourStopCard/TourStopCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"




function TourstopList({tourstops}){



if(tourstops.length > 0){
return (
    <div className="TourstopsList">
        <div className="Tourstopsheading">
            <h1>Tourstops:</h1>
            </div>
        {tourstops.map((el)=><TourStopCard tourstop={el}></TourStopCard>)}
        <Button>Add Tourstop</Button>
    </div>
)

}
else {
    return (
        <div className="TourstopsList">
            <div className="Tourstopsheading">
                <h1>Tourstops:</h1>
                </div>
            <h3>No Tourstops yet, add some!</h3>
            <Button>Add Tourstop</Button>
        </div>
    )
}
}


export default TourstopList