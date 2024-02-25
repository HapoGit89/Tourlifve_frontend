import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { TourApi } from "../../api"
import { Button} from "reactstrap"
import userContext from "../../userContext"

import "./TourstopDelete.css"


function TourstopDelete(){
    const {tourstop_id} = useParams()
    const [data, setData] = useState(null)
    const user = useContext(userContext)
    const navigate = useNavigate()

    


    
        useEffect(()=>{
            const getTourstopData= async()=>{
                const res = await TourApi.getTourstopDetails(tourstop_id)
                setData(res.tourstop)
                }
                getTourstopData()
    
        },[user])

    const deleteTourstop = async () => {
      
        const res = await TourApi.deleteTourstop(tourstop_id)
       if(res.deleted){
        alert(`Deleted Tourstop ${data.name} on ${data.date.slice(0,10)}`)
        navigate(`/tours/${data.tour_id}`)
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
        deleteTourstop()

      
    }
  
  


    if(data  && user.token && user.tours.filter((el)=>el.id == data.tour_id).length > 0){  //conditional render protects route 
      return (
    <div className="TourDeleteCard"> 
        <div className="Tourinfo">
            <h1>Do your really want to delete tourstop:</h1>
            <br></br>
            <h1>{data.name}?</h1>
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

export default TourstopDelete