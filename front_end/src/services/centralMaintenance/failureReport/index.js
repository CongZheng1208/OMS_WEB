// CMS模块下的所有api

import { http } from "../../../utils/http";
// url
// 只写相对路径

// TBD
// 这里具体的url自己定
const API = {
  GET_FAILURE_LIST: 'centralMaintenance/failureReport/failures.php',
  GET_FAILURE_DETAIL: 'centralMaintenance/failureDetail'
}

// APIs
export const getFailureList = () => {
  return http({
    url: API.GET_FAILURE_LIST,
    method: 'GET'
  })
}

export const getFailureDetail = (index) => {
  return http({
    url: API.GET_FAILURE_LIST,
    method: 'POST',
    data: index
  })
}
