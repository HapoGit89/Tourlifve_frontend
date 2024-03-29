import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class providing API functionality.
 */

export class TourApi {
  // store user token for API access
  static token = localStorage.getItem("token") || ""


// universal request method
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` ,  'Access-Control-Allow-Origin': '*',};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      
      return err
    }
  }

  // Individual API routes

  static async SignUp(data){
    try{
      let res = await this.request(`auth/register`, {...data}, "post")
      return res
      }
    catch(e){
      return (e)
    }
  }

  static async Login(data, callback){
    try{let res = await this.request(`auth/token`, {...data}, "post")
    return res}
    catch(e){
      return (e)
    }
}

static async getUser(username){
  try{
    let res = await this.request(`users/${username}`)
    return res
  }
  catch(e){
    return e
  }
}

static async deleteUser(username){
  try{
    let res = await this.request(`users/${username}`,{}, "delete")
    return res
  }
  catch(e){
    return e
  }
}

static async patchUser(username,data){
  try{
    let res = await this.request(`users/${username}`,{...data}, "patch")
    return res
  }
  catch(e){
    return e
  }
}

static async postTour(data){
  try{
    let res = await this.request(`tours/`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}

static async getTourDetails(id){
  try{
    let res = await this.request(`tours/${id}`,{},"get")
    return res
  }
  catch(e){
    return e
  }
}

static async getTourstopDetails(id){
  try{
    let res = await this.request(`tourstops/${id}`,{},"get")
    return res
  }
  catch(e){
    return e
  }
}

static async patchTour(id, data){
  try{
    let res = await this.request(`tours/${id}`,{...data},"patch")
    return res
  }
  catch(e){
    return e
  }
}

static async deleteTour(id){
  try{
    let res = await this.request(`tours/${id}`,{},"delete")
    return res
  }
  catch(e){
    return e
  }
}

static async postLocation(data){
  try{
    let res = await this.request(`locations`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}

static async getAllLocations(){

  try{
    let res = await this.request(`locations`,{},"get")
    return res
  }
  catch(e){
    return e
  }

}

static async postTourstop(data){
  try{
    let res = await this.request(`tourstops`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}


static async patchTourstop(id,data){
  try{
    let res = await this.request(`tourstops/${id}`,{...data},"patch")
    return res
  }
  catch(e){
    return e
  }
}




static async deleteTourstop(id){
  try{
    let res = await this.request(`tourstops/${id}`,{},"delete")
    return res
  }
  catch(e){
    return e
  }
}


static async searchPlaces(data){
  try{
    let res = await this.request(`search/complex`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}

static async postPoi(data){
  try{
    let res = await this.request(`pois`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}

static async getAllPois(){
  try{
    let res = await this.request(`pois`,{},"get")
    return res
  }
  catch(e){
    return e
  }
}

static async postActivity(data){
  try{
    let res = await this.request(`activities`,{...data},"post")
    return res
  }
  catch(e){
    return e
  }
}

static async getActivity(id){
  try{
    let res = await this.request(`activities/${id}`,{},"get")
    return res
  }
  catch(e){
    return e
  }
}

static async deleteActivity(id){
  try{
    let res = await this.request(`activities/${id}`,{},"delete")
    return res
  }
  catch(e){
    return e
  }
}


}
