
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap"
import { useState } from "react"
import "./ActivitySearchForm.css"

function ActivitySearchForm() {
const [formData, setFormData] = useState({})



return (

<div className="SearchForm">

    

<Form>
  <h1>  Search For Interesting Places:</h1>
  
 
     <FormGroup>

<Input
id="keyword"
name="keyword"
placeholder="Keyword..."
type="text"
value={formData.name || ""}

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


    >
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
<Label for="address" >
Mode of Travel:
</Label>
<Input
className="address"
id="address"
name="address"
placeholder="Address..."
type="select"


    >
      <option>
        walking
      </option>
      <option>
        driving
      </option>
      <option>
        public transport
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




