
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap"
import ActivityMap from "../ActivityMap/ActivityMap";
import ActivitySearchForm from "../ActivitySearchForm/ActivitySearchForm";
import { TourApi } from "../../api";
import userContext from "../../userContext";
import { Card } from "reactstrap";
import "./ActivityCreateForm.css"


function ActivityCreateForm(data) {
  // React controlled Form for User Login
  const user = useContext(userContext)
  const [formData, setFormData] = useState({})
  const {tourstop_id} = useParams()
  const navigate = useNavigate()


 
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }




  if (user.token) {
    return (<div className="ActivityCreateForm">

       

    <div className="ActivityMap">
            <ActivityMap></ActivityMap>
            <ActivitySearchForm></ActivitySearchForm>
    </div>

   

      <div className="resultForm">

    

      <Form>
        <h1>  Your Selected Place:</h1>
        
       
           <FormGroup>
    <Label for="name">
      Place Name:
    </Label>
    <Input
      id="name"
      name="name"
      placeholder="Place name..."
      type="text"
      value={formData.name || ""}
     
    />
  </FormGroup>
  <FormGroup>
    <Label for="address" >
      Address:
    </Label>
    <Input
    className="address"
      id="address"
      name="address"
      placeholder="Address..."
      type="text"
      value={formData.address|| ""}
      
    />
  </FormGroup>
  <FormGroup>
    <Label for="category">
      Category:
    </Label>
    <Input
      id="category"
      name="category"
      placeholder="Category"
      type="text"
      value={formData.category|| ""}
     
    />
  </FormGroup>
  <FormGroup>
    <Label for="distance">
      Distance:
    </Label>
    <Input
      id="distance"
      name="distance"
      placeholder="Distance"
      type="text"
      value={formData.distance || ""}
      
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label for="mode">
      By:
    </Label>
    <Input
      id="mode"
      name="mode"
      placeholder="Walking/Driving/Public Transport..."
      type="text"
      value={formData.mode || ""}
    
    />
  </FormGroup>
  {' '}
 
  <Button>
    Create Activity
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


export default ActivityCreateForm