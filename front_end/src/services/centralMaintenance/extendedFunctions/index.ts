// CMS模块下的所有api

import { http } from "../../../utils/http";

const API = {
  GET_TIME_CYCLE:
    "centralMaintenance/extendedFunctions/timeCycle/getTimeCycle.php",

  GET_ATA_EQUI:
    "centralMaintenance/extendedFunctions/timeCycle/getATAandEqui.php",

  FLIGHT_ORDERS:
    "centralMaintenance/extendedFunctions/flightLegPhase/flightOrders.php",
};

// APIs
export const getTimeCycle = () => {
  return http({
    url: API.GET_TIME_CYCLE,
    method: "GET",
  });
};

export const getATAandEqui = () => {
  return http({
    url: API.GET_ATA_EQUI,
    method: "GET",
  });
};

export const flightOrders = (index) => {
  return http({
    url: API.FLIGHT_ORDERS,
    method: "POST",
    data: index,
  });
};
