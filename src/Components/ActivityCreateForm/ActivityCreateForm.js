
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
            if(res.destinations.length == 0){
              alert("Sorry couldnt find any places for your search!")
            }
            setResults(res.destinations)
      })
}



const handleMarkerClick = (id)=>{
  const selectedData = results.filter((el)=>el.place_id===id)
  setSelected(selectedData[0])
}



const createActivity = async () => {

          let poi = {}
        // post location or get existing location from db
        const res = await TourApi.postPoi({name: selected.name,
            address: selected.address, 
            googleplaces_id: selected.place_id, 
            googlemaps_link: selected.googlemaps_uri,
            category: selected.category || ""})


        if(res.poi){
        poi = res.poi
        }

        else if(res.response.data.error.message.slice(0,13)==="Duplicate poi"){
        const res2 = await TourApi.getAllPois()
        poi = res2.pois.filter((el)=>el.googleplaces_id==selected.place_id)[0]
        }

        else {
        alert ( 'ooops something went wrong, please try again or contact support')
        }

        const res3 = await TourApi.postActivity({tourstop_id: Number(tourstop_id), poi_id: poi.id, traveltime: selected.duration_value_secs, travelmode: selected.mode})

        if (res3.activity){
        alert(`Created Activity at ${selected.name} for tourstop ${tourstop_id}`)
        navigate("./../")
        }
        else if ( res3.response.data.error.message.slice(0,18)==="Duplicate activity"){
        alert("Sorry that activity already exists!")
        }
        else {
        alert("oops something went wrong")
        }
}



  if (user.token && tourstop) {
    return (<div className="ActivityCreateForm">

       

    <div className="ActivityMap">
            <ActivityMap handleMarkerClick={handleMarkerClick} key={results.length} results={results} location = {{location: {lat: tourstop.lat, lng: tourstop.lng}, name:tourstop.name}}></ActivityMap>
  
    </div>

   

      <div className="results">
      <PoiResultCard createActivity={createActivity}key={selected.place_id} activity={selected}></PoiResultCard>
      <ActivitySearchForm handleSearch={handleSearch} ></ActivitySearchForm>
       
        

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