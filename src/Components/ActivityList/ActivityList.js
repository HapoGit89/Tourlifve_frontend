import { React } from "react"
import { useNavigate } from "react-router-dom"
import "./ActivityList.css"
import ActivityCard from "../ActivityCard/ActivityCard"
import { Button } from "reactstrap"






function ActivityList({ activities }) {
    const navigate = useNavigate()

    // handle Click on Add Button
    const handleClick = () => {
        navigate("./activity")
    }

    if (activities.length > 0) {
        return (
            <>
                <div className="ActivitiesHeading">
                    <h1>Your Saved Places:</h1>
                </div>
                <div className="ActivitiesList">
                    {activities.map((el) => <ActivityCard activity={el}></ActivityCard>)}
                </div>
                <Button style={{ marginBottom: "2%", background: "linear-gradient(142deg, rgba(36,62,62,1) 3%, rgba(0,4,8,1) 97%)" }} onClick={handleClick} size="lg">Find And Add Places</Button>
            </>
        )
    }


    else {
        return (
            <>
                <div className="ActivitiesHeading">
                    <h1>Your Saved Places:</h1>
                </div>
                <div className="ActivitiesList">
                    <h3>No Places yet, add some!</h3>
                </div>
                <Button style={{ marginBottom: "2%", background: "linear-gradient(142deg, rgba(36,62,62,1) 3%, rgba(0,4,8,1) 97%)" }} onClick={handleClick} size="lg">Find And Add Places</Button>
            </>
        )
    }
}


export default ActivityList