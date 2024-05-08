// CMS模块下的所有api

import { http } from "../../../utils/http";

const API = {
  GET_TIME_CYCLE: 'centralMaintenance/extendedFunctions/getTimeCycle.php',
}

// APIs
export const getTimeCycle = () => {
  return http({
    url: API.GET_TIME_CYCLE,
    method: 'GET'
  })
}

// export const postFimCodeForURL = (index) => {
//   return http({
//     url: API.POST_FIMCODE_FOR_URL,
//     method: 'POST',
//     data: index
//   })
// }
