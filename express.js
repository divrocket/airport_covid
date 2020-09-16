const fs = require('fs')
const foratmApi = require('./index.js')

const moment = require('moment') // require
const express = require('express')
const app = express();
const results = express.Router()
const port = 3000


// setup utility functions
const Utilities = {
    /**
     * Set system to sleep
     * @param {Number} ms mili-seconds (3000 = 3s)
     * @return {Promise<void>}
     */
    sleep: function (ms) {
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
const getToken = function (account, password) {
    return new Promise(function (resolve, reject) {
        foratmApi.getToken(account, password, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
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
const getDeviceId = function (token, groupId) {
    return new Promise(function (resolve, reject) {
        foratmApi.getDevicesId(token, groupId, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
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
const getDeviceData = function (token, groupId, serialId, queryDate) {
    return new Promise(function (resolve, reject) {
        foratmApi.getDeviceData(token, groupId, serialId, queryDate,
            function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
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
const getPhoto = function (token, groupId, tmNo) {
    return new Promise(function (resolve, reject) {
        foratmApi.getPhoto(token, groupId, tmNo,
            function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response);
                }
            })
    });
}

const today_is = moment().format('YYYY-MM-DD')

const data = {
    table: [{
        ReturnCode: 0,
        Data: [
            {
                tmNo: '3420707',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '37.2',
                datetime: '2020-09-14 17:44:35.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17473'
            },
            {
                tmNo: '3419444',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '37.4',
                datetime: '2020-09-14 15:49:29.0',
                has_photo: true,
                ques_ans: '',
                qrcode: ''
            },
            {
                tmNo: '3419445',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '37.4',
                datetime: '2020-09-14 15:49:13.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17956'
            },
            {
                tmNo: '3418828',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.4',
                datetime: '2020-09-14 13:38:44.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '08730'
            },
            {
                tmNo: '3418814',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '37',
                datetime: '2020-09-14 13:34:32.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '00879'
            },
            {
                tmNo: '3418802',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.4',
                datetime: '2020-09-14 13:32:11.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '09874'
            },
            {
                tmNo: '3418751',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.3',
                datetime: '2020-09-14 13:24:51.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '05344'
            },
            {
                tmNo: '3417460',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.5',
                datetime: '2020-09-14 11:24:46.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0216'
            },
            {
                tmNo: '3415600',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.1',
                datetime: '2020-09-14 07:52:17.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17128'
            },
            {
                tmNo: '3414541',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.3',
                datetime: '2020-09-14 06:44:15.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17805'
            },
            {
                tmNo: '3411732',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.2',
                datetime: '2020-09-14 05:44:59.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '03727'
            },
            {
                tmNo: '3411688',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '35.9',
                datetime: '2020-09-14 05:43:45.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '16525'
            },
            {
                tmNo: '3411517',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36',
                datetime: '2020-09-14 05:39:58.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0209'
            },
            {
                tmNo: '3411468',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.1',
                datetime: '2020-09-14 05:38:09.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '02397'
            },
            {
                tmNo: '3411270',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36',
                datetime: '2020-09-14 05:31:21.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '08086'
            },
            {
                tmNo: '3409359',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.3',
                datetime: '2020-09-14 03:58:33.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '16762'
            },
            {
                tmNo: '3409240',
                sn: '1242220200001970',
                name: 'taxi',
                tm: '36.4',
                datetime: '2020-09-14 03:51:56.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17067'
            }
        ]
    },
    {
        ReturnCode: 0,
        Data: [
            {
                tmNo: '3418585',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 13:03:13.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3418546',
                sn: '1242220180004734',
                name: '',
                tm: '35.9',
                datetime: '2020-09-14 12:59:01.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3418424',
                sn: '1242220180004734',
                name: '',
                tm: '36',
                datetime: '2020-09-14 12:45:37.0',
                has_photo: true,
                ques_ans: '',
                qrcode: ''
            },
            {
                tmNo: '3418233',
                sn: '1242220180004734',
                name: '',
                tm: '36',
                datetime: '2020-09-14 12:22:06.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '15385'
            },
            {
                tmNo: '3417536',
                sn: '1242220180004734',
                name: '',
                tm: '36.5',
                datetime: '2020-09-14 11:30:27.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '10262'
            },
            {
                tmNo: '3416733',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 10:15:47.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0202'
            },
            {
                tmNo: '3416734',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 10:15:25.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3416707',
                sn: '1242220180004734',
                name: '',
                tm: '36.4',
                datetime: '2020-09-14 10:11:26.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0203'
            },
            {
                tmNo: '3416556',
                sn: '1242220180004734',
                name: '',
                tm: '36.2',
                datetime: '2020-09-14 09:48:59.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3416172',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 08:52:46.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '14846'
            },
            {
                tmNo: '3416069',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 08:41:22.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415991',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 08:30:08.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0204'
            },
            {
                tmNo: '3415979',
                sn: '1242220180004734',
                name: '',
                tm: '36.6',
                datetime: '2020-09-14 08:28:55.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '10842'
            },
            {
                tmNo: '3415913',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 08:21:24.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '12642'
            },
            {
                tmNo: '3415914',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 08:20:54.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '05961'
            },
            {
                tmNo: '3415897',
                sn: '1242220180004734',
                name: '',
                tm: '36.5',
                datetime: '2020-09-14 08:19:07.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '14006'
            },
            {
                tmNo: '3415876',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 08:16:32.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '15153'
            },
            {
                tmNo: '3415755',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 08:05:30.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13928'
            },
            {
                tmNo: '3415752',
                sn: '1242220180004734',
                name: '',
                tm: '36.6',
                datetime: '2020-09-14 08:04:52.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13924'
            },
            {
                tmNo: '3415728',
                sn: '1242220180004734',
                name: '',
                tm: '35.8',
                datetime: '2020-09-14 08:01:47.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'C0101'
            },
            {
                tmNo: '3415678',
                sn: '1242220180004734',
                name: '',
                tm: '36.2',
                datetime: '2020-09-14 07:57:31.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '16348'
            },
            {
                tmNo: '3415659',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 07:56:32.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '00170'
            },
            {
                tmNo: '3415643',
                sn: '1242220180004734',
                name: '',
                tm: '36',
                datetime: '2020-09-14 07:55:33.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415634',
                sn: '1242220180004734',
                name: '',
                tm: '36.2',
                datetime: '2020-09-14 07:55:01.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415635',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 07:54:41.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: 'T0206'
            },
            {
                tmNo: '3415636',
                sn: '1242220180004734',
                name: '',
                tm: '36.4',
                datetime: '2020-09-14 07:54:20.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415621',
                sn: '1242220180004734',
                name: '',
                tm: '36.6',
                datetime: '2020-09-14 07:53:52.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415614',
                sn: '1242220180004734',
                name: '',
                tm: '35.8',
                datetime: '2020-09-14 07:53:19.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415605',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 07:52:51.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415463',
                sn: '1242220180004734',
                name: '',
                tm: '36',
                datetime: '2020-09-14 07:42:55.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '15167'
            },
            {
                tmNo: '3415450',
                sn: '1242220180004734',
                name: '',
                tm: '36',
                datetime: '2020-09-14 07:42:13.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415416',
                sn: '1242220180004734',
                name: '',
                tm: '35.8',
                datetime: '2020-09-14 07:38:57.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '05061'
            },
            {
                tmNo: '3415349',
                sn: '1242220180004734',
                name: '',
                tm: '36.4',
                datetime: '2020-09-14 07:33:02.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '14040'
            },
            {
                tmNo: '3415262',
                sn: '1242220180004734',
                name: '',
                tm: '35.9',
                datetime: '2020-09-14 07:26:01.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13774'
            },
            {
                tmNo: '3415253',
                sn: '1242220180004734',
                name: '',
                tm: '36.1',
                datetime: '2020-09-14 07:25:16.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '12997'
            },
            {
                tmNo: '3415137',
                sn: '1242220180004734',
                name: '',
                tm: '36.5',
                datetime: '2020-09-14 07:13:39.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '07991'
            },
            {
                tmNo: '3414797',
                sn: '1242220180004734',
                name: '',
                tm: '36.5',
                datetime: '2020-09-14 06:54:43.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17713'
            },
            {
                tmNo: '3414772',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 06:53:31.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3414594',
                sn: '1242220180004734',
                name: '',
                tm: '36.3',
                datetime: '2020-09-14 06:46:05.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '00745'
            },
            {
                tmNo: '3411611',
                sn: '1242220180004734',
                name: '',
                tm: '36.2',
                datetime: '2020-09-14 05:42:11.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '04075'
            },
            {
                tmNo: '3411394',
                sn: '1242220180004734',
                name: '',
                tm: '35.9',
                datetime: '2020-09-14 05:35:32.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '15461'
            }
        ]
    },
    {
        ReturnCode: 0,
        Data: [
            {
                tmNo: '3420838',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.1',
                datetime: '2020-09-14 17:52:25.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '14438'
            },
            {
                tmNo: '3420795',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.5',
                datetime: '2020-09-14 17:49:17.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17066'
            },
            {
                tmNo: '3416925',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.2',
                datetime: '2020-09-14 10:34:44.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13054'
            },
            {
                tmNo: '3416390',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.3',
                datetime: '2020-09-14 09:29:23.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13740'
            },
            {
                tmNo: '3416018',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.4',
                datetime: '2020-09-14 08:33:24.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '05678'
            },
            {
                tmNo: '3415298',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.1',
                datetime: '2020-09-14 07:29:45.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '14838'
            },
            {
                tmNo: '3415299',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.1',
                datetime: '2020-09-14 07:29:15.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: ''
            },
            {
                tmNo: '3415001',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36.6',
                datetime: '2020-09-14 07:04:22.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '13332'
            },
            {
                tmNo: '3414054',
                sn: '124222018000401B',
                name: 'ARFF',
                tm: '36',
                datetime: '2020-09-14 06:24:15.0',
                has_photo: true,
                ques_ans: '[0,0]',
                qrcode: '17757'
            }
        ]
    }]
};

function createError(status, message) {
    var err = new Error(message);
    err.status = status;
    return err;
}

app.param('user', function (req, res, next, id) {
    if (req.user = users[id]) {
        next();
    } else {
        next(createError(404, 'failed to find user'));
    }
});
let colleted_line_items = []
app.get('/results/:date', async function (req, res, next) {
    // console.log({
    //     1: req,
    //     2: res
    // })
    console.log(req.params.date)

    const request_date = req.params.date;


    const execute = async function () {


        let stored_data = []
        

        try {

            colleted_line_items = []

            foratmApi.setKey([67, 34, 119, 18, 83, 57, 112, 9, 73, 50, 81, 120, 24, 54, 82, 101])

            const tokenResponse = await getToken("Arielle.Sewell@fresno.gov", "Frontier!")
            let tokenResult = JSON.parse(tokenResponse.data)
            if (!tokenResult.ReturnCode == 0) return

            const deviceIdResponse = await getDeviceId(tokenResult.Token, tokenResult.GroupId)
            let deviceIdResult = JSON.parse(deviceIdResponse.data)
            if (!deviceIdResult.ReturnCode == 0) return
            if (!deviceIdResult.Data) return

            let apiCallCount_getData = -1
            let apiCallCount_getPhoto = -1

            for (let device of deviceIdResult.Data) {
                //console.log(device)
                let deviceDataResponse = await getDeviceData(tokenResult.Token, tokenResult.GroupId, device.sn_id, req.params.date)
                //console.log(deviceDataResponse.data)
                let deviceDataResult = JSON.parse(deviceDataResponse.data)
                let deviceDataResult_raw = deviceDataResponse.data
                
                colleted_line_items.push(deviceDataResult)

                //console.log(deviceDataResult)
            }

            // deviceIdResult.Data.forEach(async e => {

            //     apiCallCount_getData++;
            //     await Utilities.sleep(3000 * apiCallCount_getData)
            //     let deviceDataResponse = await getDeviceData(tokenResult.Token, tokenResult.GroupId, e.sn_id, request_date)
            //     //console.log(deviceDataResponse.data)
            //     let deviceDataResult = JSON.parse(deviceDataResponse.data)
            //     let deviceDataResult_raw = deviceDataResponse.data

            //     if (!deviceDataResult.ReturnCode == 0) return // break if return code is not 0
            //     if (!deviceDataResult.Data) return // break if data is empty

            //     let entry = deviceDataResult.Data
            //     colleted_line_items.push(entry)

            //     console.log(deviceDataResult)
            //     let json = JSON.stringify(colleted_line_items)

            //     for (let line_item of entry) {
            //         await Utilities.sleep(50)
            //     }

                


            //     // let file_name = './results/' + today_is + '.json'

            //     // fs.appendFileSync(file_name, json, 'utf8', function (err) {
            //     //     if (err) throw err;
            //     //     console.log(json)
            //     // });

            // })


        } catch (e) {
            console.log(e)
        }
    }
    // exec.
    await execute();
    console.log()
    res.write(JSON.stringify(colleted_line_items));
    res.end()
    console.clear()
});

results.get('/', (req, res) => {
    console.log(req.baseUrl)

    let colleted_line_items = []
    data.table.forEach(function (element) {

        let entry = element.Data


        entry.forEach(function (line_item) {
            console.log(line_item)
            colleted_line_items.push(line_item)
        })

    });

    let json = JSON.stringify(colleted_line_items)
    res.write(json)
    res.end()
})

app.use('/results', results)
app.listen(port, () => console.log('server started'))