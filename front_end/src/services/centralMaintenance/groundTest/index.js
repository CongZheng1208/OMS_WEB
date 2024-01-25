import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {
  GET_TEST_LIST: 'centralMaintenance/groundTest',
  GET_TEST_DETAIL: 'centralMaintenance/testDetail'
}

// APIs
export const getTestList = () => {
  return http({
    url: API.GET_TEST_LIST,
    method: 'GET'
  })
}

export const getTestDetail = (index) => {
  return http({
    url: API.GET_TEST_DETAIL,
    method: 'POST',
    data: index
  })
}