// CMS模块下的所有api

import { http } from "../../../utils/http";

const API = {
  GET_RETRIEVAL_STATUS: "centralMaintenance/NVM/retrievalStatus.php",
  GET_RESET_STATUS: "centralMaintenance/NVM/resetStatus.php",
  GET_RETRIEVAL_AE: "centralMaintenance/NVM/getRetrievalATAandEqui.php",
  GET_RESET_AE: "centralMaintenance/NVM/getResetATAandEqui.php",
};

// APIs
export const getRetrievalStatus = () => {
  return http({
    url: API.GET_RETRIEVAL_STATUS,
    method: "GET",
  });
};

export const getResetStatus = () => {
  return http({
    url: API.GET_RESET_STATUS,
    method: "GET",
  });
};

export const getRetrievalATAandEqui = () => {
  return http({
    url: API.GET_RETRIEVAL_AE,
    method: "GET",
  });
};

export const getResetATAandEqui = () => {
  return http({
    url: API.GET_RESET_AE,
    method: "GET",
  });
};
