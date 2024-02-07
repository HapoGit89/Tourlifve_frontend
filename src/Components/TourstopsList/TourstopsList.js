import {React, useContext, useEffect} from "react"
import "./TourstopsList.css"
import userContext from "../../userContext"
import TourStopCard from "../TourStopCard/TourStopCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"



function TourstopList({tourstops}){




return (
    <div className="TourstopsList">
        <div className="Tourstopsheading">
            <h1>Tourstops:</h1>
            </div>
        {tourstops.map((el)=><TourStopCard tourstop={el}></TourStopCard>)}
    </div>
)

}


export default TourstopList