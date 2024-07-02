// CMS模块下的所有api

import { http } from "../../../utils/http";

const API = {
  GET_FDE_LIST: "centralMaintenance/FailureReportNew/fdesNew.php",
  GET_FAILURE_LIST: "centralMaintenance/FailureReportNew/failuresNew.php",

  POST_NOTE: "centralMaintenance/FailureReportNew/postNote.php",
  POST_FIMCODE_FOR_URL:
    "centralMaintenance/FailureReportNew/000.php",

  ADD_NOTE: "centralMaintenance/FailureReportNew/addNote.php",
};

// APIs
export const getFailureList = () => {
  return http({
    url: API.GET_FAILURE_LIST,
    method: "GET",
  });
};

export const getFDEList = () => {
  return http({
    url: API.GET_FDE_LIST,
    method: "GET",
  });
};

export const postFimCodeForURL = (index: string) => {
  return http({
    url: API.POST_FIMCODE_FOR_URL,
    method: "POST",
    data: index,
  });
};

export const postNote = (index) => {
  return http({
    url: API.POST_NOTE,
    method: "POST",
    data: index,
  });
};

export const addNote = (index) => {
  return http({
    url: API.ADD_NOTE,
    method: "POST",
    data: index,
  });
};
