import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {

  GET_CONNECT: 'centralMaintenance/GroundTestNew/connect.php',
  POST_TEST_ORDER: 'centralMaintenance/GroundTestNew/groundTestOrders.php',

  GET_CURRENT_TESTS: 'centralMaintenance/GroundTestNew/getCurrentTests.php',
  GET_ALL_ATA_EQUI_TESTS: 'centralMaintenance/GroundTestNew/getAllAtaEquiTests.php',

}

// APIs

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

export const getCurrentTests = () => {
  return http({
    url: API.GET_CURRENT_TESTS,
    method: 'GET'
  })
}

export const getAllAtaEquiTests = () => {
  return http({
    url: API.GET_ALL_ATA_EQUI_TESTS,
    method: 'GET'
  })
}
