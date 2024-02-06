import { useParams } from "react-router-dom"
import { useEffect, useState, useContext} from "react"
import { TourApi } from "../../api"
import { Card, CardBody,CardText, CardTitle, CardHeader, Button} from "reactstrap"

import "./TourDetails.css"
import userContext from "../../userContext"


function TourDetails(){
  // Shows company details for given tour_id
    const {id} = useParams()
    const [data, setData] = useState(null)
    const user = useContext(userContext)
    const tour_user_check = user.tours.filter((el)=>el.id==id)   // checks if tour is owned by user

    // get company info for given handle via JoblyApi and update State
    useEffect(()=>{
        const getTourData= async()=>{
            const res = await TourApi.getTourDetails(id) 
            setData(res.tour)
            }
            getTourData()
    }, [])

    if(data && user.token && tour_user_check.length > 0){  //conditional render protects route 
      return (
        <div className="TourDetails"> 
           <Card
    className="my-2"
    color="dark"
    inverse
    style={{
      width: '100rem'
    }}
  >
    <CardHeader>
      Tour Details
    </CardHeader>
    <CardBody>
      <CardTitle tag="h2">
        Title: {data.title}
      </CardTitle>
      <CardText>
        <h3>Artist: {data.artist}</h3>
        <p>Start: {data.startdate.slice(0,10)}</p>
        <p>End: {data.enddate.slice(0,10)}</p>
      </CardText>
      <Button>Edit Tour</Button>
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

export default TourDetails