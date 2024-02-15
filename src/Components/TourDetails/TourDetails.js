import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { TourApi } from "../../api"
import { Card, CardBody,CardText, CardTitle, CardHeader, Button} from "reactstrap"
import userContext from "../../userContext"
import TourstopList from "../TourstopsList/TourstopsList"
import "./TourDetails.css"


function TourDetails(){
  // Shows company details for given tour_id
    const {id} = useParams()
    const [data, setData] = useState(null)
    const user = useContext(userContext)
    const navigate = useNavigate()
    // checks if tour is owned by user

    // get tour info for given handle via JoblyApi and update State
    useEffect(()=>{
        const getTourData= async()=>{
            const res = await TourApi.getTourDetails(id) 
            setData(res.tour)
            }
            getTourData()

    },[user])

    const handleClick1 = ()=>{
      navigate("./edit")
    }

    const handleClick2 = ()=>{
      navigate("./delete")
    }
  


    if(data  && user.token && data.user_id == user.id){  //conditional render protects route 
      return (
    <div className="TourDetails"> 
        <div className="Tourinfo">
            <h1>Tour Details</h1>
            <h2>Title: {data.title}</h2>
            <h3>Artist: {data.artist}</h3>
            <h4>Start: {data.startdate.slice(0,10)}</h4>
            <h4>Start: {data.enddate.slice(0,10)}</h4>
            <div className="Buttons">
              <Button size="lg" onClick={handleClick1}>Edit Tour</Button>
              <Button size="lg" color="danger" onClick={handleClick2}>Delete Tour</Button>
            </div>
        </div>
         <div>
              <TourstopList tour_id={id} tourstops={data.tourstops}></TourstopList>
        </div>
    </div>
      )}

      else if(data && user.token){
        return (
          <div>
            <h1>Sorry but this is not your tour your looking for!</h1>
          </div>
        )

      }
   
      else{
        return (
          <div>
            <h1>Please log in to see this page</h1>
          </div>
        )
      }
  
}

export default TourDetails