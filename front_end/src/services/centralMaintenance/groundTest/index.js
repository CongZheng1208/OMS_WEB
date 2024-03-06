import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {
  GET_ATA_AND_EQUI: 'centralMaintenance/GroundTestNew/getATAandEqui.php',

  GET_CONNECT: 'centralMaintenance/GroundTestNew/connect.php',
  POST_TEST_ORDER: 'centralMaintenance/GroundTestNew/groundTestOrders.php',

  POST_ID_TEST: 'centralMaintenance/GroundTestNew/postIDforTest.php'
}

// APIs
export const getATAandEqui = () => {
  return http({
    url: API.GET_ATA_AND_EQUI,
    method: 'GET'
  })
}


export const getConnect = () => {
  return http({
    url: API.GET_CONNECT,
    method: 'GET'
  })
}


export const postTestOrder = (index) => {
  return http({
    url: API.POST_TEST_ORDER,
    method: 'POST',
    data: index
  })
}

export const postIDforTest = (index) => {
  return http({
    url: API.POST_ID_TEST,
    method: 'POST',
    data: index
  })
}
