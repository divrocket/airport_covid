## Dependencies:
```json
{
    "dependencies": {
        "atob": "^2.1.2",
        "axios": "^0.19.2",
        "btoa": "^1.2.1",
        "crypto-js": "^4.0.0"
    }
}
```
## Note:
1. This API is built to be simple and easy to use. If you are using other backend programming language, you can use API here to quickly deploy middleware with node.js. (see express.js for how to quickly deploy your own service in node.js)
2. Try to implement Cache to cache token to prevent unnecessary API consumption.
3. This api use axios to fetch. basically, the initial response will be from axios and actual result from the FORA's server will be embeded in the "data" property of each response. For more info about axios, please visit: https://www.npmjs.com/package/axios

## Flow:
* Get Token -> Get Device ID -> Get Device Data -> Get Photo (optional)

## Start:
*You need to obtain AES key from ForaCare first
>npm install
```javascript
const foratmApi = require('fora-tm-api')
// set Aes key (array)
const foratmApi.setKey("AES Secret")
// set/mutate options (optional)
const foratmApi.options.language = "tw" //default en (if you are in the U.S, you really do not have to mutate any option)
//.........
```
## Configure Options:
see above for example.
 > **Name**: options

 Property|Type|Expect value|Defalut|Explain
----|-----|-----|-----|-----
language |String|en/cn|en|Language that will be used in the returned message from each API call.

## Methods:
### A. Get Token

 >1. **Name**:
 > getToken(account, password, callback(error, response))
 >1. **Response formate:** JSON (Stringified)
 >1. **Options**: language (en = english, cn = chinese). Default en


Parameters|Type|Explain
----|-----|-----
account |String|Fora atms cloud account (required)
password|String|Fora atms cloud account password (required)
callback|Function|Callback function for response. Parameters (error, response) (required)
 - **Sample Response:**
 ```json
  {
   "ReturnCode":0,
   "GroupId":"Lcr3r2jK05Xbfkaxj9Ch2w==",
   "MailAccount":"abcd@example.com",
   "Name":"FORA USA DEMO",
   "is_manager":0,
   "lang":"en",
   "tm_unit":"1",
   "alert_email":"abcd@example.com",
   "alert_temperature":"38",
   "alert_with_photo":"1",
   "alert_open":"1",
   "alert_survey_open":0,
   "account_type":99,
   "AuthToken":"3cdbcdf277734996a89cf242417c431e",
   "Token":"eyghb1ciOvJIUzI1N5J9.   eyJ1aWQiOiJBU1NGS0RPRURTVy4uLiIsIdN1YiI6IntpZDpMelIzcjJqS1E1WGJmamF4UzdDaDk3PT12IiwiZXhwIjoxNTk3Mjc4NDczLCJpYXQiOjE1OTcyNzQ4NzMsImp0aSI6Ikx6cjNyMmpLUTVYYmZqYXhTN0NoMnc9PSJ9.DAxlIGPM1QU-ouCOdvkSfVY6KvX9MMcT9KZ6PmY7g70",
  }
```
 - **Example** I. Use Callback
```javascript
foratmApi.getToken("abdc@example.com", "YourPassword",
  function(error, response){
    if(error){
        console.log(error)
    }else{
        console.log(response.data)
        let result = JSON.parse(response.data)
        // ... proceed to your next step
    }
})
```
 - **Example** II. Apply Async
```javascript
// setup Promise
function getToken(account, password){
    return new Promise(function(resolve, reject){
        foratmApi.getToken(account, password,
         function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}
// setup async function
const execute = async function(){
  const tokenResponse = await getToken("abcd@example.com", "yourPassword")
  //console.log(tokenResponse.data)
  // try to setup Cache to cache the token to prevent unnecessary API resource consumption
  // ... proceed to your next step
}
// exec.
execute()
```
### B. Get Devices ID
 >1. **Name**:
 > getDevicesId(token, groupId, callback(error, response))
 >1. **Response formate:** JSON (Stringified)

Parameters|Type|Explain
----|-----|-----
token |String|"Token" property from the getToken method's response body (required)
groupId|String|"GroupId" property from the getToken method's response body (required)
callback|Function|Callback function for response. Parameters(error, Response) (required)
 - **Sample Response:**
 ```json
{
   "ReturnCode":0,
   "Data":[
      {
         "sn_id":"aQ9Xdv9qtsVYaE+GPmDzvQ==",
         "sn":"124221934000xxxx",
         "name":"Conference Room A",
         "customer":"FORA US Demo",
         "fever_tm":"38",
         "startdate":"2020-04-07 00:00:00.0",
         "enddate":"2021-12-01 23:59:59.0",
         "lastupdatetime":"2020-07-15 15:02:59.0",
         "cloud_en":1,
         "speech_en":1,
         "qrcode_en":1,
         "question_en":1,
         "vip_enddate":"2021-12-01 23:59:59.0",
         "app_question":1,
         "printer_en":1,
         "appweb_question":0
      },
      {
         "sn_id":"Z7CV4f9UeYjI7ckZ454+Fg==",
         "sn":"124222018000xxxx",
         "name":"Conference Room D",
         "customer":"FORA US Demo",
         "fever_tm":"37.5",
         "startdate":"2020-03-20 00:00:00.0",
         "enddate":"2021-04-20 23:59:59.0",
         "lastupdatetime":"2020-08-05 10:33:00.0",
         "cloud_en":1,
         "speech_en":1,
         "qrcode_en":1,
         "question_en":1,
         "vip_enddate":"2021-04-20 23:59:59.0",
         "app_question":1,
         "printer_en":1,
         "appweb_question":0
      },
   ]
}
```
 - **Example** I. Use Callback
```javascript
foratmApi.getToken("abcd@example.com", "yourPassword",
  function(error, response){
  if(error){
      console.log(error)
  }else{
      //console.log(response.data)
      let result = JSON.parse(response.data)
      foratmApi.getDevicesId(result.Token,result.GroupId, function(error, response){
         if(error){
             console.log(error)
          }else{
              //console.log(response.data)
              let result = JSON.parse(response.data)
              // continue to handle
          }
      })
  }
})
```
 - **Example** II. Apply Async
```javascript
// setup Promise
const getToken = function(account, password){
    return new Promise(function(resolve, reject){
      foratmApi.getToken(account, password,
        function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}

const getDeviceId = function(token,groupId){
    return new Promise(function(resolve, reject){
        foratmApi.getDevicesId(token,groupId, function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}
// setup async function
const execute = async function(){
  const tokenResponse = await getToken("abcd@example.com", "YourPassword")
  let tokenResult = JSON.parse(tokenResponse.data)
    // try to setup Cache to cache the token to prevent unnecessary API resource consumption
  const deviceIdResponse = await getDeviceId(tokenResult.Token,tokenResult.GroupId)
  //console.log(deviceIdResponse.data)
  let deviceIdResult = JSON.parse(deviceIdResponse.data)
  //... proceed to your next step
}
// exec.
execute()
```

### C. Get Devices Data
 >1. **Name**:
 > getDeviceData(token, groupId, serialId, startDate, callback(error, Response))
 >1. **Response formate:** JSON (Stringified)

Parameters|Type|Explain
----|-----|-----
token |String|"Token" property from the getToken method's response body (required)
groupId|String|"GroupId" property from the getToken method's response body (required)
serialId|String|"sn_id" property from the getDevicesId method's response body (required)
queryDate|String| query date for query data, formate yyyy-MM-dd (required)
callback|Function|Callback function for response. Parameters(error, Response) (required)
 - **Sample Response:**
 ```json
{
  "ReturnCode": 0,
  "Data": [
    {
      "tmNo": "272016",
      "sn": "124222018000xxxx",
      "name": "Conference Room D",
      "tm": "36",
      "datetime": "2020-06-12 17:07:26.0",
      "has_photo": false,
      "ques_ans": "[0,0,0,0]",
      "qrcode": "example"
    },
    {
      "tmNo": "271615",
      "sn": "124222018000xxxx",
      "name": "Conference Room D",
      "tm": "36.6",
      "datetime": "2020-06-12 15:12:58.0",
      "has_photo": false,
      "ques_ans": "[1,0,0,0]",
      "qrcode": "example2"
    },
  ]
}
```
 - **Example** I. Use Callback
```javascript
foratmApi.getToken("abcd@example.com", "your password",
  function(error, response){
  if(error){
      console.log(error)
  }else{
      console.log(response.data)
      let resultToken = JSON.parse(response.data)
      foratmApi.getDevicesId(resultToken.Token,resultToken.GroupId, function(error, response){
         if(error){
             console.log(error)
          }else{
              console.log(response.data)
              let resultDeviceId = JSON.parse(response.data)
              foratmApi.getDeviceData(resultToken.Token, resultToken.GroupId,resultDeviceId.Data[0]["sn_id"],"2020-08-11",
                function(error, response){
                if(error){
                    console.log(error)
                 }else{
                    console.log(response.data)
                  }
              })
          }
      })
  }
})
```
 - **Example** II. Use Async (all together)
```javascript
const getToken = function(account, password){
    return new Promise(function(resolve, reject){
        foratmApi.getToken(account, password, function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}
const getDeviceId = function(token,groupId){
    return new Promise(function(resolve, reject){
        foratmApi.getDevicesId(token,groupId, function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}
const getDeviceData = function(token, groupId,serialId,queryDate){
    return new Promise(function(resolve, reject){
        foratmApi.getDeviceData(token, groupId, serialId, queryDate,
         function(error, response){
            if(error){
                reject(error);
            }
            else{
                resolve(response);
            }
        })
    });
}
// setup async function
const execute = async function(){
  // get access token
  const tokenResponse = await getToken("abcd@example.com","yourPassowrd")
    //console.log(tokenResponse.data)
    let tokenResult = JSON.parse(tokenResponse.data)
  // get all devices Id
  const deviceIdResponse = await getDeviceId(tokenResult.Token,tokenResult.GroupId)
    let deviceIdResult = JSON.parse(deviceIdResponse.data)
  // get all devices data for particular date
  deviceIdResult.Data.forEach(async e=>{
    let deviceDataResponse = await getDeviceData(tokenResult.Token,tokenResult.GroupId, e.sn_id, "2020-08-10")
    console.log(deviceDataResponse.data)
    let deviceDataResult = JSON.parse(deviceDataResponse.data)
    //... proceed to your next step
  })
 }catch(e){
   console.log(e)
 }
}
// exec.
execute()
```

### D. Get photo
 >1. **Name**:
 > getDeviceData(token, groupId, tmNo, callback(error, Response))
 >1. **Response formate:** base64

Parameters|Type|Explain
----|-----|-----
token |String|"Token" property from the getToken method's response body (required)
groupId|String|"GroupId" property from the getToken method's response body (required)
tmNo|String|"tm_no" property from the getDevicesData method's response body. Thie is also the "ID" of the data set (required)
callback|Function|Callback function for response. Parameters(error, Response) (required)

- **Sample Response:**
 ```json
{
    "ReturnCode":0,
    "photo_data":"/9j/4AAQSkZJRgABAQAASABIAAD/........"
}
```
 - **Example** I. Use Callback
```javascript
const execute = function(){
    // photo to be query
    let no_tm = ["178901", "178911", "271104", "3042125"]
    no_tm.forEach((photo,i)=>{
     setTimeout(()=> // 3 seconds interval for each api call
        foratmApi.getPhoto("Your Token", "Your Group Id", photo, 
           function(error,response){
            if(error){
               console.log(error)
            }else{
              let photoResult = response.data
              console.log(photoResult)
              //Proceed to you next step....
            }
        })
        , 3000*i)
    })
}
//exec.
execute()
```
 - **Example** II. Use Async
```javascript
// setup utility functions
const Utilities = {
    /**
     * Set system to sleep
     * @param {Number} ms mili-seconds (3000 = 3s)
     * @return {Promise<void>}
     */
    sleep:function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
// setup async function
const execute = async function(){
  // photo to be query
  let no_tm = ["178901", "178911", "271104", "3042125"]
  no_tm.forEach(async (photo, i)=>{
    await Utilities.sleep(3000 * i) // sleep for 3s before each call
    let photoResponse = await getPhoto('Your Token',"Your Group Id", photo)
    let photoResult = photoResponse.data
    console.log(photoResult.photo_data)
    //Proceed to you next step....
  })
}
//exec.
execute()
```

### Complete Example
* refere to "example.js" for complete example
