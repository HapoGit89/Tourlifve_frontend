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
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
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

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";