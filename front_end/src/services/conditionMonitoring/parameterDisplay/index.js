import { http } from "../../../utils/http";
// url
// 只写相对路径

const API = {
  // listDisplay
  GET_PARA_SET: "/conditionMonitoring/paramerDisplay/paramerList.php",
  GET_PARA_LIST: "/conditionMonitoring/paramerDisplay/getParaList.php",
  POST_LIST_SAVE: "/conditionMonitoring/paramerDisplay/saveSelection.php",
  POST_LIST_DELETE: "/conditionMonitoring/paramerDisplay/listDelete.php",

  // StartView
  POST_UNIT_IN_TIME: "/conditionMonitoring/paramerDisplay/getUnitInTime.php",
  POST_DATA_IN_TIME: "/conditionMonitoring/paramerDisplay/getDataInTime.php",

  // graphicDisplay
  POST_GRAPHIC_IN_TIME:
    "php/conditionMonitoring/paramerLinesDisplay/paramerShowDynamic.php",

  // rawDataDisplay
  GET_RAW_IN_TIME: "/conditionMonitoring/paramerDisplay/getRawInTime.php",
};

// APIs
export const getParaSet = () => {
  return http({
    url: API.GET_PARA_SET,
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

export const deleteList = (data) => {
  return http({
    url: API.POST_LIST_DELETE,
    method: "POST",
    data: data,
  });
};

export const postUnitInTime = (data) => {
  return http({
    url: API.POST_UNIT_IN_TIME,
    method: "POST",
    data: data,
  });
};

export const postDataInTime = (data) => {
  return http({
    url: API.POST_DATA_IN_TIME,
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
