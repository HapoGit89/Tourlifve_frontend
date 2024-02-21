
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap"
import SearchMap from "../SearchMap/SearchMap";
import { TourApi } from "../../api";
import "./TourstopCreateForm.css"
import userContext from "../../userContext";
import { Card } from "reactstrap";


function TourstopCreateForm(data) {
  // React controlled Form for User Login
  const user = useContext(userContext)
  const [formData, setFormData] = useState({})
  const {tour_id} = useParams()
  const navigate = useNavigate()

 



const createTourstop = async (data) => {

  
     let location = {}
    // post location or get existing location from db
    const res = await TourApi.postLocation({name: data.name,
       housenumber: data.housenumber, 
       city: data.city, 
       street: data.street, 
       postal_code: data.postal_code,
      googleplaces_id: data.googleplaces_id,
      country:data.country,
      lat: data.lat,
    lng: data.lng})


  if(res.location){
    location = res.location
  }

  else if(res.response.data.error.message.slice(0,18)==="Duplicate location"){
    const res2 = await TourApi.getAllLocations()
    location = res2.locations.filter((el)=>el.googleplaces_id==data.googleplaces_id)[0]
  }

  else {
    alert ( 'ooops something went wrong, please try again or contact support')
  }

 


 


  const res3 = await TourApi.postTourstop({date: data.date, location_id: location.id, tour_id: Number(tour_id)})

  if (res3.tourstop){
    alert(`Created Tourstop at ${data.name} on ${data.date}`)
    navigate("./../..")
  }
  else if ( res3.response.data.error.message.slice(0,18)==="Duplicate tourstop"){
  alert("Sorry that tourstop already exists!")
}
  else {
    alert("oops something went wrong")
  }
}

  const handleSubmit = (e)=>{
    e.preventDefault()
    createTourstop(formData)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }


  const handleMapOut = (data)=> {
    setFormData(fData => ({
      ...data,
      date: fData.date
    }));
  }



  if (user.token) {
    return (<div className="TourstopCreateForm">

      <SearchMap handleMapOut={handleMapOut}></SearchMap>

      <div className="resultForm">

      <Form onSubmit={handleSubmit}>
        <h1>  Your Selected Location:</h1>
        
       
           <FormGroup>
    <Label for="userName">
      Location Name:
    </Label>
    <Input
      id="name"
      name="name"
      placeholder="Location name..."
      type="text"
      value={formData.name || ""}
     
    />
  </FormGroup>
  <FormGroup>
    <Label for="firstName" >
      Country:
    </Label>
    <Input
    className="Country"
      id="country"
      name="country"
      placeholder="Country.."
      type="text"
      value={formData.country|| ""}
      
    />
  </FormGroup>
  <FormGroup>
    <Label for="lastName">
      City:
    </Label>
    <Input
      id="scity"
      name="city"
      placeholder="city"
      type="text"
      value={formData.city|| ""}
     
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Street
    </Label>
    <Input
      id="street"
      name="street"
      placeholder="street"
      type="text"
      value={formData.street || ""}
      
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label for="exampleEmail">
      Housenumber
    </Label>
    <Input
      id="housenumber"
      name="housenumber"
      placeholder="number"
      type="text"
      value={formData.housenumber || ""}
    
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label for="exampleEmail">
      Date
    </Label>
    <Input
      id="date"
      name="date"
      placeholder="date"
      type="date"
      value={formData.date || ""}
      onChange={handleChange}
    />
  </FormGroup>
  {' '}

  <Button>
    Create Tourstop
  </Button>
</Form>

      </div>

    </div>





    )
  }

  else {
    return (
      <div>
        <h1>Sorry this only available for logged in users</h1>
      </div>
    )
  }
}


export default TourstopCreateForm