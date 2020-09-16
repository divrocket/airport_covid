// Dependiencies
const axios = require("axios")
const CryptoJS = require("crypto-js");
const atob = require("atob")
const btoa = require("btoa")

const cipher = {
    key:[],
    arrayBufferToBase64:function(e) {
        for (var t = "", r = new Uint8Array(e), a = r.byteLength, n = 0; n < a; n++)
            t += String.fromCharCode(r[n]);
        return btoa(t)
    },
    stringToUtf8Bytes:function(e) {
        for (var t = [], r = 0; r < e.length; r++) {
            var a = e.charCodeAt(r);
            a < 128 ? t.push(a) : a < 2048 ? t.push(192 | a >> 6, 128 | 63 & a) : a < 55296 || a >= 57344 ? t.push(224 | a >> 12, 128 | a >> 6 & 63, 128 | 63 & a) : (r++,
            a = 65536 + ((1023 & a) << 10 | 1023 & e.charCodeAt(r)),
            t.push(240 | a >> 18, 128 | a >> 12 & 63, 128 | a >> 6 & 63, 128 | 63 & a))
        }
        return t
    },
    base64ToArrayBuffer:function(e) {
        for (var t = atob(e), r = t.length, a = new Uint8Array(r), n = 0; n < r; n++)
            a[n] = t.charCodeAt(n);
        return a.buffer
    },
    toWordArray:function(e) {
        for (var t = e.length, r = [], a = 0; a < t; a++)
            r[a >>> 2] |= (255 & e[a]) << 24 - a % 4 * 8;
        return CryptoJS.lib.WordArray.create(r, t)
    },
    encryptPayload:function(message) {
        return CryptoJS.AES
                       .encrypt(message, this.toWordArray(this.key),
                        {
                         mode: CryptoJS.mode.ECB,
                         padding: CryptoJS.pad.ZeroPadding
                        })
                        .toString()
    },
    decryptPayload:function(message) {
       return CryptoJS.AES.decrypt(message, this.toWordArray(this.key), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.ZeroPadding
            }).toString(CryptoJS.enc.Utf8)
    },
    doEncrypt: function(e) {
        var t = this.stringToUtf8Bytes(e)
          , r = this.toWordArray(t)
          , a = this.encryptPayload(r)
          , n = this.base64ToArrayBuffer(a);
          return new Uint8Array(n)
    },
    doDecrypt:function(e){
            var t = this.arrayBufferToBase64(e);
            return this.decryptPayload(t)
    }
}
const validate={
    /**
     * @param {[[boolean,string]]} array a 2d array
     * @param {string} methodName property name of the current method
     * @returns {string}
     */
    isDefined:function(array, methodName){
       let result = ""
       array.forEach(e=>{
           e[0]?result = result + e[1] +"  ":void 0
       })
        if(result){throw new Error(methodName+" Error: "+ result+"is not defined. Please ensure you have input all argument before proceed again").message }
    },
    key:function(){
        if(cipher.key.length===0){throw new Error("Error: please setup aes key").message }
    }
}

const foratmApi={
    baseUrl: "https://www.foracare.live/ForaTMWeb",
    /**
     * Set key for AES128
     * @param {Array<Number>} key Must be a 16 in length interger array, which will automatically be converted to 128 bit with Uint8Array function
     */
    setKey:function(key){
        if(!Array.isArray(key)){throw new Error("setKey error: Key must be an array").message}
        if(key.length!==16){throw new Error("setKey error: array length must be 16").message }
        cipher.key = key
    },
    options:{
        language:"en"
    },
    getPhoto:function(token,groupId,tmNo,callback){
        validate.key(); // validate key
        validate.isDefined([ // validate input
            [typeof token ==="undefined", "token"],
            [typeof groupId ==="undefined", "groupId"],
            [typeof tmNo ==="undefined", "tm_no"],
            [typeof callback ==="undefined", "callback"]
        ], "getPhoto")
        let url = this.baseUrl + "/QryTMPhotoDataWebAES"
        //call
        axios(
            {method:"POST",
             url:url,
             responseType: "arraybuffer",
             headers: {
                 Authorization: "Bearer "+ token
             },
             data:cipher.doEncrypt(JSON.stringify({
                group_id:groupId,
                tm_no:tmNo
                }))
            })
          .then(function (response) {
            response.data = cipher.doDecrypt(response.data) // mutate data property (decrypt)
            callback("", response);
          })
          .catch(function (error) {
             callback(error, "");
          });
    },
    /**
     * Get Device data (query one day per device)
     * @param {string} token Token from getToken api response
     * @param {string} groupId group from getToken api response
     * @param {string} serialId propert sn_id from getDevicesId api response
     * @param {string} queryDate query one date for the selected device, formate yyyy-MM-dd (exp. 2020-08-11)
     * @param {(error:JSON,respons:JSON)=>void} callback callback function for response of this api call.
     */
    getDeviceData:function(token, groupId, serialId, queryDate, callback){
        validate.key(); // validate key
        validate.isDefined([ // validate input
            [typeof token ==="undefined", "token"],
            [typeof groupId ==="undefined", "groupId"],
            [typeof serialId ==="undefined", "serialId"],
            [typeof queryDate ==="undefined", "queryDate"],
            [typeof callback ==="undefined", "callback"]
        ], "getDeviceData")
        let url = this.baseUrl + "/QryTMDataWebAES"
        //call
        axios(
            {method:"POST",
             url:url,
             responseType: "arraybuffer",
             headers: {
                 Authorization: "Bearer "+ token
             },
             data:cipher.doEncrypt(JSON.stringify({
                group_id:groupId,
                sn_id:serialId,
                start_date:queryDate
                }))
            })
          .then(function (response) {
            response.data = cipher.doDecrypt(response.data) // mutate data property (decrypt)
            callback("", response);
          })
          .catch(function (error) {
             callback(error, "");
          });
    },
    /**
     * Get device id
     * @param {string} token Token from getToken api response
     * @param {string} groupId group from getToken api response
     * @param {(error:JSON,respons:JSON)=>void} callback callback function for response of this api call.
     */
    getDevicesId:function(token, groupId, callback){
        validate.key(); // validate key
        validate.isDefined([ //validate input
            [typeof token ==="undefined", "token"],
            [typeof groupId ==="undefined", "groupId"],
            [typeof callback ==="undefined", "callback"]
        ], "getDevicesId")
        let url = this.baseUrl + "/QryGroupUserListTMWebAES"
        //call
        axios(
            {method:"POST",
             url:url,
             responseType: "arraybuffer",
             headers: {
                 Authorization: "Bearer "+ token
             },
             data:cipher.doEncrypt(JSON.stringify({
                group_id:groupId
                }))
            })
          .then(function (response) {
            response.data = cipher.doDecrypt(response.data) // mutate data property (decrypt)
            callback("", response);
          })
          .catch(function (error) {
            callback(error, "");
          });
    },
    /**
     * Get device id
     * @param {string} account fora tm cloud account
     * @param {string} groupId fora tm cloud password
     * @param {(error:JSON,respons:JSON)=>void} callback callback function for response of this api call.
     */
    getToken:function(account, password, callback){
        validate.key(); // validate key
        validate.isDefined([ // validate input
            [typeof account ==="undefined", "account"],
            [typeof password ==="undefined", "password"],
            [typeof callback ==="undefined", "callback"]
        ], "getToken")
        let url = this.baseUrl + "/GroupLoginAES";
        const self = this;
        //validate payload
        //call
        axios(
            {method:"POST",
             url:url,
             responseType: "arraybuffer",
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded"
             },
             data:cipher.doEncrypt(JSON.stringify({
                Acct: account,
                Pwd: password,
                Lang: self.options.language
                }))
            })
          .then(function (response) {
            response.data = cipher.doDecrypt(response.data) // mutate data property (decrypt)
            callback("", response);
          })
          .catch(function (error) {
            callback(error, "");
          });
    },
}


module.exports = foratmApi