// CMS模块下的所有api

import { http } from "../../../utils/http";

const API = {
  GET_ATA_AND_EQUI: "centralMaintenance/configuration/getATAandEqui.php",
  POST_CONFIG_DATA: "centralMaintenance/configuration/postConfigData.php",
};

// APIs
export const getATAandEqui = () => {
  return http({
    url: API.GET_ATA_AND_EQUI,
    method: "GET",
  });
};

export const postConfigData = (index) => {
  return http({
    url: API.POST_CONFIG_DATA,
    method: "POST",
    data: index,
  });
};
