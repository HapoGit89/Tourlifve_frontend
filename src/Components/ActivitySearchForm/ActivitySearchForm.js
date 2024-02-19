
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap"
import { useState } from "react"
import { TimeConversion } from "./TimeConversion"
import "./ActivitySearchForm.css"

function ActivitySearchForm({handleSearch}) {
const [formData, setFormData] = useState({})


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
}


const handleSubmit = (e)=>{
  e.preventDefault()
  handleSearch(formData)
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

/>
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


</FormGroup>



{' '}


<Button>
Search for places
</Button>
</Form>

</div>)}


export default ActivitySearchForm




