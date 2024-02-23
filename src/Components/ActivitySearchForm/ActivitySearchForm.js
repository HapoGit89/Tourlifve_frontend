
import { Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap"
import { useState } from "react"
import { TimeConversion } from "./TimeConversion"
import "./ActivitySearchForm.css"

function ActivitySearchForm({handleSearch}) {
const [formData, setFormData] = useState({})
const [errors, setErrors] = useState({})


const handleChange = e => {
  const { name, value } = e.target;
  if(name==="traveltime"){
    setFormData(fData => ({
      ...fData,
      [name]: TimeConversion.StringToSeconds(value)
    }));

  }
  else{
  setFormData(fData => ({
    ...fData,
    [name]: value
  }));
  }
  if (!!errors[name]){
    setErrors({...errors, [name]: null})
  }
}

 const validateForm = ()=>{
      const {keyword, traveltime, mode} = formData
      const newErrors = {}

          if(!keyword || keyword == "") newErrors.keyword = "Please enter keyword"
          if(!traveltime) newErrors.traveltime = "Please select a traveltime"
          if(!mode) newErrors.mode= "Please select how you want to travel"
         

      return newErrors
    }
  


const handleSubmit = (e)=>{
  e.preventDefault()
  const formErrors = validateForm()
  if(Object.keys(formErrors).length > 0){
    setErrors(formErrors)
  }
  else{
  handleSearch(formData)}
  
}




return (

<div className="SearchForm">

    

<Form 
onSubmit={handleSubmit}>
  <h1>  Search For Interesting Places:</h1>
  
 
     <FormGroup>

<Input
id="keyword"
name="keyword"
placeholder="Keyword..."
type="text"
value={formData.keyword || ""}
onChange={handleChange}
invalid={!!errors.keyword}

/>
<FormFeedback >
     {errors.keyword}
     </FormFeedback>
</FormGroup>


<FormGroup>
<Label for="traveltime">
Traveltime
</Label>
<Input
id="traveltime"
name="traveltime"
placeholder="Traveltime"
type="select"
onChange={handleChange}
value = {TimeConversion.SecondsToString(formData.traveltime)|| ""}
invalid={!!errors.traveltime}

    >
      <option>
        Please Select
      </option>
      <option>
        5 min
      </option>
      <option>
        10 min
      </option>
      <option>
        15 min
      </option>
      <option>
        20 min
      </option>
      <option>
        30 min
      </option>
      <option>
        45 min
      </option>
      <option>
        1 h
      </option>
      <option>
        1,5 hrs
      </option>
      <option>
        2 hrs
      </option>
    </Input>



    <FormFeedback >
     {errors.traveltime}
     </FormFeedback>

</FormGroup>
<FormGroup>
<Label for="mode" >
Mode of Travel:
</Label>
<Input
className="mode"
id="mode"
name="mode"
placeholder="Mode of transport"
type="select"
value={formData.mode || ""}
onChange={handleChange}
invalid={!!errors.mode}


    > <option>
      Please Select
    </option>
      <option>
        walking
      </option>
      <option>
        driving
      </option>
      <option>
        bicycling
      </option>
      <option>
        transit
      </option>
     
      </Input>

    <FormFeedback >
     {errors.mode}
     </FormFeedback>



</FormGroup>



{' '}


<Button>
Search for places
</Button>
</Form>

</div>)}


export default ActivitySearchForm




