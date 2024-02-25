import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TourApi } from "../../api";
import {useNavigate} from "react-router-dom"
import "./TourstopEditForm.css"
import userContext from "../../userContext";


function TourstopEditForm (){
  // React controlled Form for User Login
  const [formData, setFormData] = useState({})
  const user = useContext(userContext)
  const navigate=useNavigate()
  const {id} = useParams()

 




  useEffect(()=>{
    const getTourstopData= async()=>{
        const res = await TourApi.getTourstopDetails(id) 
        res.tourstop.date = res.tourstop.date.slice(0,10)
        setFormData(res.tourstop)
        localStorage.setItem("tourstopdetails", res.tourstop)
        }
        getTourstopData()

},[])

  const editTour = async()=>{
   const data= {date: formData.date}
    const res = await TourApi.patchTourstop(id,data)
    if(res.updated){
      alert(`Updated Tourstop at ${formData.name}`)
      navigate("./../")
      window.location.reload()
    }
    else{
      
      alert(`${res.response.data.error.message}`)
    }
  }


  const handleChange = e => {
      const { name, value } = e.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    }

  const handleSubmit = (e)=>{
    e.preventDefault()
    editTour()
     
      
  }
    if(user.token){
    return(
      <div className="TourStopE">
      <div className="TourStopEditForm">
    
  <Form  onSubmit={handleSubmit}>
        <h1>Change date for tourstop at:  <br></br> {formData.name}</h1>
  <FormGroup>
    <Label for="firstName" >
   
      Date:
    </Label>
    <Input
    className="Date"
      id="date"
      name="date"
      placeholder="date"
      type="date"
      value={formData.date || ""}
      onChange={handleChange}

    
    />
  </FormGroup>
<Button size="lg">
    Edit
  </Button>
</Form>
</div>
</div>
        
    )}

    else {
      return(
        <div>
          <h1>Sorry this only available for logged in users</h1>
        </div>
      )
    }
}

export default TourstopEditForm