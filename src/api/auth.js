import client from '../utils/axiosUtils'

export default {
  login (creds,openid) {
    /*var query='?'
    if(openid)query=query+'openid'
    return client().post('https://dormium.birk-home.de:9001/nynm/auth/token'+query, { email: creds.email, password: creds.password })
    */
   return new Promise((resolve,reject) =>{
     var response = {
      "data": {
        "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzcyOTY2OTcsImlhdCI6MTUzNzI5MzA5Nywic3ViIjoiNWI3MjlmMDkwMTMyZTUwMDBkYjUzYjQyIiwicm9sZSI6Im1lbWJlciIsInR5cCI6ImJlYXJlciJ9.Xw3HZ5tCbEWC8dz_Viltit5PdLrE2rIoG1nvxWZu334lQKquIkAaHmZnXY1Q4-o5eDqKMD8FqYZEf4GowLd8bpvwVvGMYtXf2uITkTLtdNkBxuT2sDqgZ8VPcJtFKMLtxGiZKbr8pmIPUDudGpnPJmNv-ztlPY1B55cSFWFId6k",
        "type": "bearer",
        "expires_in": 3600,
        "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzk4ODUwOTcsImlhdCI6MTUzNzI5MzA5Nywic3ViIjoiNWI3MjlmMDkwMTMyZTUwMDBkYjUzYjQyIiwicm9sZSI6Im1lbWJlciIsInR5cCI6InJlZnJlc2gifQ.gZ-ERXQAe_fF-CIBJAdhYP10jwsuCGGPOsR4ZgOmrWb3_478WPq_LQQqDGRni977CWT2IzHUzl4_MO99Yp4GGSrOHVTNmsAWSVpaKEt1h09o64Nlz120NaOjhvsgzYPYRoXnPKvUgedNXrrNqKzU7sTVkZ36IliqrAdeFqiAjhc"
      }
    }
     resolve(response)
  })
  },
  register(email,username,password){
    return client().post('https://dormium.birk-home.de:9001/nynm/auth/user',{email:email,username:username,password:password})
  },
  userinfo(){
    //return client().get('https://dormium.birk-home.de:9001/nynm/auth/userinfo')
    return new Promise((resolve,reject) =>{
      var response = {
       "data": {
        id: "xyz",
        username: "hansPeter",
        email: "hans@test.com",
        created_at: 231033408723,
        profile_picture_path: "http://path.to.image.de"
      }
     }
      resolve(response)
   })
  },
  resetPassword (email, username) {
    return client().post('auth/password', {email, username})
  },
  changePassword (userid, oldpassword, newpassword) {
    return client().put('auth/user/' + userid + '/password', { id: userid, old_password: oldpassword, new_password: newpassword })
  },
  checkUsernameAvailable (userName) {
    return client().get('auth/register/available?username=' + userName)
  }
}
