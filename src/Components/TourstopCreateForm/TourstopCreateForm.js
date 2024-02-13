
import { useContext } from "react";

import SearchMap from "../SearchMap/SearchMap";

import "./TourstopCreateForm.css"
import userContext from "../../userContext";


function TourstopCreateForm (){
  // React controlled Form for User Login

  const user = useContext(userContext)




  
    if(user.token){
    return(<div>
       
      <SearchMap></SearchMap>
       
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


export default TourstopCreateForm