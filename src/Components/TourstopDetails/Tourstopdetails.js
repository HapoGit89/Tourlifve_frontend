import { useParams } from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { TourApi } from "../../api"
import { Card, CardBody,CardText, CardTitle, CardHeader, Button} from "reactstrap"
import "./TourstopDetails.css"
import userContext from "../../userContext"



function TourstopDetails(){
  // Shows company details for given tour_id
    const {id} = useParams()
    const [data, setData] = useState(null)
    const user = useContext(userContext)
   

    // get company info for given handle via JoblyApi and update State
    useEffect(()=>{
        const getTourstopData= async()=>{
            const res = await TourApi.getTourstopDetails(id) 
            setData(res.tourstop)
            }
            getTourstopData()
    },[data])


    if(data && user.token && user.tours.filter((el)=>el.id == data.tour_id).length > 0){  //conditional render protects route 
      return (
        <div className="TourDetails"> 
           <Card
    className="my-2"
    color="dark"
    inverse
    style={{
      width: '40rem',
      height: '40rem',
      justifyContent: "center",
      padding: "6%"
    }}
  >
  
    <CardBody>
      <CardTitle tag="h2">
        Tourstop Details:
      </CardTitle>
      <CardText>
        <h3>Location: {data.name}</h3>
        <h3>City: {data.city}</h3>
        <p>Date: {data.date.slice(0,10)}</p>
      </CardText>
      <Button>Edit Tourstop</Button>
    </CardBody>
  </Card>

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

export default TourstopDetails