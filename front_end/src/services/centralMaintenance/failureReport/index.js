// CMS模块下的所有api

import { http } from "../../../utils/http";
// url
// 只写相对路径

// TBD
// 这里具体的url自己定
const API = {

  GET_FDE_LIST: 'centralMaintenance/FailureReportNew/fdesNew.php',
  GET_FAILURE_LIST: 'centralMaintenance/FailureReportNew/failuresNew.php',

  POST_FIMCODE_FOR_URL: 'centralMaintenance/FailureReportNew/postFimCodeForURL.php',
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

export const postFimCodeForURL = (index) => {
  return http({
    url: API.POST_FIMCODE_FOR_URL,
    method: 'POST',
    data: index
  })
}
