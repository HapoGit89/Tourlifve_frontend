
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap"
import ActivityMap from "../ActivityMap/ActivityMap";
import PoiResultCard from "../PoiResultCard/PoiResultCard";
import ActivitySearchForm from "../ActivitySearchForm/ActivitySearchForm";
import { fromPlaceId, setKey} from "react-geocode";
import { TourApi } from "../../api";
import userContext from "../../userContext";
import "./ActivityCreateForm.css"


function ActivityCreateForm(data) {
  // React controlled Form for User Login
  const user = useContext(userContext)
  const [tourstop, setTourstop] = useState()
  const [results, setResults] = useState({})
  const [selected, setSelected] = useState({})
  const {tourstop_id} = useParams()
  const navigate = useNavigate()

  setKey(process.env.REACT_APP_API_KEY)

   // get tourstop info from TourApi and store in state
   useEffect(()=>{
    const getTourstopData= async()=>{
        const res = await TourApi.getTourstopDetails(tourstop_id) 
        setTourstop(res.tourstop)
        }
        getTourstopData()
},[user])

const handleSearch = async (data) => {
      const res = await TourApi.searchPlaces({lat: tourstop.lat, lng: tourstop.lng, origin_id: tourstop.googleplaces_id, mode: data.mode, duration: data.traveltime, query:data.keyword})
      const geoPromises = []
      for(let i = 0; i < res.destinations.length; i++){
        geoPromises.push(fromPlaceId(res.destinations[i].place_id))
      }
      Promise.all(geoPromises).then(results=>{
            for(let i=0; i <results.length; i++){
          res.destinations[i].position= results[i].results[0].geometry.location
            
            }
            setResults(res.destinations)
      })
}

const handleMarkerClick = (id)=>{
const selectedData = results.filter((el)=>el.place_id===id)
setSelected(selectedData[0])
}
console.log(selected)


  if (user.token && tourstop) {
    return (<div className="ActivityCreateForm">

       

    <div className="ActivityMap">
            <ActivityMap handleMarkerClick={handleMarkerClick} key={results.length} results={results} location = {{location: {lat: tourstop.lat, lng: tourstop.lng}, name:tourstop.name}}></ActivityMap>
            <ActivitySearchForm handleSearch={handleSearch} ></ActivitySearchForm>
    </div>

   

      <div className="results">

        <PoiResultCard key={selected.place_id} activity={selected}></PoiResultCard>
        

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