import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {
  // listDisplay
  GET_PARA_SET_NEW: "/conditionMonitoring/paramerDisplay/paramerListNew.php",
  GET_PARA_LIST: "/conditionMonitoring/paramerDisplay/getParaList.php",
  POST_LIST_SAVE: "/conditionMonitoring/paramerDisplay/saveSelection.php",

  // StartView
  POST_DATA_IN_TIME_NEW:
    "/conditionMonitoring/paramerDisplay/getDataInTimeNew.php",

  // graphicDisplay
  POST_GRAPHIC_IN_TIME:
    "/conditionMonitoring/paramerDisplay/paramerGraphNew.php",

  // rawDataDisplay
  GET_RAW_IN_TIME: "/conditionMonitoring/paramerDisplay/getRawInTime.php",
};

// APIs
export const getParaSetNew = () => {
  return http({
    url: API.GET_PARA_SET_NEW,
    method: "GET",
  });
};

export const getParaList = () => {
  return http({
    url: API.GET_PARA_LIST,
    method: "GET",
  });
};

export const saveList = (data) => {
  return http({
    url: API.POST_LIST_SAVE,
    method: "POST",
    data: data,
  });
};

export const postDataInTimeNew = (data) => {
  return http({
    url: API.POST_DATA_IN_TIME_NEW,
    method: "POST",
    data: data,
  });
};

export const postGraphicInTime = (data) => {
  return http({
    url: API.POST_GRAPHIC_IN_TIME,
    method: "POST",
    data: data,
  });
};

export const getRawInTime = () => {
  return http({
    url: API.GET_RAW_IN_TIME,
    method: "GET",
  });
};
