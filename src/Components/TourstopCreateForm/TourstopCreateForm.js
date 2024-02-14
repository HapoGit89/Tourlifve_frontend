
import { useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import SearchMap from "../SearchMap/SearchMap";
import { TourApi } from "../../api";
import "./TourstopCreateForm.css"
import userContext from "../../userContext";
import { Card } from "reactstrap";


function TourstopCreateForm(data) {
  // React controlled Form for User Login
  const user = useContext(userContext)
  const [formData, setFormData] = useState({})


  const createTourstop = () => {

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

      <Form>
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
      name="number"
      placeholder="number"
      type="text"
      value={formData.number || ""}
    
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