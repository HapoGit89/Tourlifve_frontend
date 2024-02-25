import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { TourApi } from "../../api"
import {Button} from "reactstrap"
import userContext from "../../userContext"
import "./TourDelete.css"


function TourDelete(){
  // Shows company details for given tour_id
    const {id} = useParams()
    const [data, setData] = useState(null)
    const user = useContext(userContext)
    const navigate = useNavigate()
    // checks if tour is owned by user


        // get company info for given handle via JoblyApi and update State
        useEffect(()=>{
            const getTourData= async()=>{
                const res = await TourApi.getTourDetails(id) 
                setData(res.tour)
                }
                getTourData()
    
        },[user])

    const deleteTour = async () => {
      
        const res = await TourApi.deleteTour(id)
       if(res.deleted){
        alert(`Deleted Tour ${data.title}`)
        navigate("./../..")
        window.location.reload()
       }
       else {
        alert(`${res.error.message}`)
       }
     

    }
   

    const handleClick1 = ()=>{
        navigate("./..")
      
    }

    const handleClick2 = ()=>{
        deleteTour()

      
    }
  
  


    if(data  && user.token && data.user_id == user.id){  //conditional render protects route 
      return (
    <div className="TourDeleteCard"> 
        <div className="Tourinfo">
            <h1>Do your really want to delete tour:</h1>
            <br></br>
            <h1>{data.title} ?</h1>
            <div className="Buttons">
                <Button size="lg" color="primary" onClick={handleClick1}>No</Button>
                <Button size="lg" color="danger" onClick={handleClick2}>Yes</Button>
            </div>
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

export default TourDelete