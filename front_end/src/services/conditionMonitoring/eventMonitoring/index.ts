import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {
  // listDisplay
  GET_EVENT: "/conditionMonitoring/eventLog/eventLogDisplay.php",
  GET_EVENT_DATA: "/conditionMonitoring/eventLog/eventData.php",
  GET_EVENT_PARA: "/conditionMonitoring/eventLog/eventLogParameterDisplay.php",
};

// APIs
export const getEvent = () => {
  return http({
    url: API.GET_EVENT,
    method: "GET",
  });
};

export const getEventData = () => {
  return http({
    url: API.GET_EVENT_DATA,
    method: "GET",
  });
};

export const postEventPara = (index) => {
  return http({
    url: API.GET_EVENT_PARA,
    method: "POST",
    data: index,
  });
};
