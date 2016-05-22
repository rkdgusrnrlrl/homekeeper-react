/**
 * Created by rkdgusrnrlrl on 16. 5. 22.
 */

var express = require('express');
var router = express.Router();


//select 하는 부분
router.get('/api/homekeepers', function (req, res)  {
    responseJson(res, mock_data);
});

//insert 하는 부분
router.post('/api/homekeepers', function (req, res)  {
    var homekeeper = getObjFromParamForExpress(req);
    insertHomekeeper(homekeeper);
    responseJson(res, mock_data);
});

//delete 하는 부분

router.delete('/api/homekeepers/homekeeper', function (req, res)  {

    console.log(req.param("id"))
    var homekeeper = getObjFromParamForExpress(req);
    var id = homekeeper.id;
    deleteHomeKeeper(id);
    responseJson(res, mock_data);
});


//modify 하는 부분

router.post('/api/homekeepers/homekeeper', function (req, res)  {
    var homekeeper = getObjFromParamForExpress(req);
    var id = homekeeper.id;
    updateHomekeeper(id, homekeeper);
    responseJson(res, mock_data);
});


module.exports = router;



//DB 연동부분
function insertHomekeeper(homekeeper) {
    mock_data.homekeepers.push(homekeeper);
}

function updateHomekeeper(id, homekeeper) {
    mock_data.homekeepers = mock_data.homekeepers.map((val, ind, arr)=> {
        if (val.id == id)  val = homekeeper;
        return val;
    });
}

/**
 * 가계부 내역 리스트를 보여줌
 * @param jsonData
 */
function findHomeKeeperList(jsonData) {
    return JSON.stringify(jsonData);
}

/**
 * 가계부내역을 삭제함
 * @param id
 */
function deleteHomeKeeper(id) {
    mock_data.homekeepers = mock_data.homekeepers.filter((val, ind, arr)=> {
            return val.id != id
    });
}


//request response 핸들링 하는 함수




/**
 * 파라미터의 값을 추출해 json 으로 만들어줌
 * @param data
 * @returns {{}}
 */
function getObjFromParam(data) {

    var keys = ["id" , "payDate", "inOut", "content", "money"];

    var obj = {}
    var temArr = (data+'').split('&');
    temArr.forEach((val, index, arr) => {
        var keyAndVal = val.split('=');
        var key = fromSnakeToCamel(keyAndVal[0]);
        if(keys.indexOf(key) != -1){
            if(key == 'content'){
                obj[key] = decodeURIComponent(keyAndVal[1].replace(/[+]/g, ' '));
            } else {
                obj[key] = keyAndVal[1];
            }

        }
    });
    return obj
}

function fromSnakeToCamel (string){
    return string.replace(/(\_[a-z])/g, ($1) =>  $1.toUpperCase().replace('_',''));
}

function getObjFromParamForExpress(expressReq) {

    var keys = ["id" , "payDate", "inOut", "content", "money"];

    var obj = {}
    keys.forEach((val, index, arr) => {
        var key = val.replace(/([A-Z])/g, ($1) => "_"+$1.toLowerCase() )
        if (expressReq.param(key)) {
            if(key == 'content'){
                obj[val] = decodeURIComponent(expressReq.param(key).replace(/[+]/g, ' '));
            } else {
                obj[val] = expressReq.param(key)
            }
        }

    });
    return obj
}

/**
 * response 에 json 데이터를 담아 보내줌
 * @param response
 * @param jsonData
 */
function responseJson(response, jsonData) {
    response.setHeader("Content-Type", "application/json");


    var homekeeperList = findHomeKeeperList(jsonData);
    response.write(homekeeperList);
    response.end();
}






var mock_data = { homekeepers : [
    {
        id : 1,
        payDate : "2016-02-11",
        inOut : "in",
        content : "월급",
        money : 1700000
    },
    {
        id : 2,
        payDate : "2016-02-11",
        inOut : "in",
        content : "책",
        money : 15000
    },
    {
        id : 3,
        payDate : "2016-02-11",
        inOut : "in",
        content : "피자 소주 (아빠 생일)",
        money : 20000
    },
    {
        id : 4,
        payDate : "2016-02-16",
        inOut : "out",
        content : "가방",
        money : 20000
    },
]};