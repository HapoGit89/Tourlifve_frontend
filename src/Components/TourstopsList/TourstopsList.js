import { React } from "react"
import "./TourstopsList.css"
import TourStopCard from "../TourStopCard/TourStopCard"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"



// List rendering TourstopCards for given tourstops
function TourstopList({ tourstops, tour_id }) {
    const navigate = useNavigate()


    // handle "Add Tourstop" click
    const handleClick = () => {
        navigate(`/tours/${tour_id}/tourstops/new`)
    }



    if (tourstops.length > 0) {
        return (
            <div className="TourstopsList">
                <div className="Tourstopsheading">
                    <h1 className="Tourstoplistheading">Tourstops:</h1>
                </div>
                {tourstops.map((el) => <TourStopCard key={el.id} tourstop={el}></TourStopCard>)}
                <Button size="lg" className="AddStopButton" onClick={handleClick}>Add Tourstop</Button>
            </div>
        )
    }

    else {
        return (
            <div className="TourstopsList">
                <div className="Tourstoplistheading">
                    <h1>Tourstops:</h1>
                    <h3>No Tourstops yet, add some!</h3>
                </div>
                <Button className="AddStopButton" size="lg" onClick={handleClick}>Add Tourstop</Button>
            </div>
        )
    }
}



export default TourstopList