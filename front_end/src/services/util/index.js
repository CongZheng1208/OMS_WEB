// CMS模块下的所有api

import { http } from "../../utils/http";

const API = {
  GET_FLIGHT_LEG: "utils/getFlightLeg.php",
};

// APIs
export const getFlightLeg = () => {
  return http({
    url: API.GET_FLIGHT_LEG,
    method: "GET",
  });
};
