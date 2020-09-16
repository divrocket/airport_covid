const foratmApi = require('./index.js')
const fs = require('fs')
var moment = require('moment'); // require

const today_is = moment().format('YYYY-MM-DD');

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

// setup Promise
/**
 * Get Access Token from Fora's TM cloud
 * @param {String} account Your FORA TM Cloud Account
 * @param {String} password Your FORA TM Cloud Password
 * @returns {Promise<JSON>}
 */
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
/**
 * Get all devices detials (most importantly, getting device id)
 * @param {String} token Token property from api response of getToken
 * @param {String} groupId group_id property from api response of getToken
 * @returns {Promise<JSON>}
 */
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
/**
 * Get data of particular devices
 * @param {String} token Token property from api response of getToken
 * @param {String} groupId group_id property from api response of getToken
 * @param {String} serialId sn_id peroperty from api response of getDeviceId
 * @param {String} queryDate one date (format yyyy-MM-dd. exp. 2020-08-11)
 * @returns {Promise<JSON>}
 */
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
/**
 *
 * @param {String} token Token property from api response of getToken
 * @param {String} groupId group_id property from api response of getToken
 * @param {String} tmNo tm_no property from api response of getDeviceData
 * @returns {Promise<JSON>}
 */
const getPhoto = function(token,groupId,tmNo){
    return new Promise(function(resolve, reject){
        foratmApi.getPhoto(token, groupId, tmNo,
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
let colleted_line_items = []
// setup execution
const execute = async function(){
  // get Access Token
      // add your AES key, your account, password and query date

      let stored_data = []
      
  try {
  // set key, length 16 ,which will be converted to 128 bit with Uint8Array)
  foratmApi.setKey([67, 34, 119, 18, 83, 57, 112, 9, 73, 50, 81, 120, 24, 54, 82, 101])
  // get access token
  const tokenResponse = await getToken("Arielle.Sewell@fresno.gov","Frontier!")
    //console.log(tokenResponse.data)
    let tokenResult = JSON.parse(tokenResponse.data)
        if(!tokenResult.ReturnCode==0) return  // break if return code is not 0
  // get all devices Id
  const deviceIdResponse = await getDeviceId(tokenResult.Token,tokenResult.GroupId)
    //console.log(deviceIdResponse.data)
    let deviceIdResult = JSON.parse(deviceIdResponse.data)
        if(!deviceIdResult.ReturnCode==0) return // break if return code is not 0
        if(!deviceIdResult.Data) return // break if data is empty
  // get all devices data for particular date
  let apiCallCount_getData = -1
  let apiCallCount_getPhoto = -1

  deviceIdResult.Data.forEach(async e=>{
    //sleep 3 seconds before each call
    apiCallCount_getData++;
    await Utilities.sleep(3000*apiCallCount_getData)
    let deviceDataResponse = await getDeviceData(tokenResult.Token,tokenResult.GroupId, e.sn_id, today_is)
    //console.log(deviceDataResponse.data)
    let deviceDataResult = JSON.parse(deviceDataResponse.data)
    let deviceDataResult_raw = deviceDataResponse.data
    
        if(!deviceDataResult.ReturnCode==0) return // break if return code is not 0
        if(!deviceDataResult.Data) return // break if data is empty

        let entry = deviceDataResult.Data

        console.log(deviceDataResult)
        
        entry.forEach(function(line_item) {
            colleted_line_items.push(line_item)
        })

        let json = JSON.stringify(colleted_line_items)

        let file_name = './results/' + today_is + '.json'

        fs.appendFileSync(file_name, json, 'utf8', function(err){
            if (err) throw err;
            console.log(json)
        });

  })

 }catch(e){
   console.log(e)
 }
}
// exec.
execute();

