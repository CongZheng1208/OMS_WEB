// CMS模块下的所有api

import { http } from "../../../utils/http";
// url
// 只写相对路径

// TBD
// 这里具体的url自己定
const API = {

  GET_FDE_LIST: 'centralMaintenance/failureReport/fdes.php',
  GET_FAILURE_LIST: 'centralMaintenance/failureReport/failures.php',

  POST_URL: 'centralMaintenance/failureReport/pdfURL.php',
  POST_FAILURE_DETAIL: 'centralMaintenance/failureDetail'
}

// APIs
export const getFailureList = () => {
  return http({
    url: API.GET_FAILURE_LIST,
    method: 'GET'
  })
}

export const getFDEList = () => {
  return http({
    url: API.GET_FDE_LIST,
    method: 'GET'
  })
}

export const postURL = (index) => {
  return http({
    url: API.POST_URL,
    method: 'POST',
    data: index
  })
}


export const postFailureDetail = (index) => {
  return http({
    url: API.POST_FAILURE_LIST,
    method: 'POST',
    data: index
  })
}
