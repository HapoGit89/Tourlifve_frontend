import {React} from "react"
import "./TourstopsList.css"
import TourStopCard from "../TourStopCard/TourStopCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"




function TourstopList({tourstops, tour_id}){

    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate(`/tours/${tour_id}/tourstops/new`)
    }



if(tourstops.length > 0){
return (
    <div className="TourstopsList">
        <div className="Tourstopsheading">
            <h1 className="Tourstoplistheading">Tourstops:</h1>
            </div>
        {tourstops.map((el)=><TourStopCard tourstop={el}></TourStopCard>)}
        <Button size="lg" className="AddStopButton" onClick={handleClick}>Add Tourstop</Button>
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
            <Button onClick={handleClick}>Add Tourstop</Button>
        </div>
    )
}
}



export default TourstopList