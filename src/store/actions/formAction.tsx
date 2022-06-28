import {
  GET_FORMS_DATA,
  GET_FORMS_ERROR,
  GET_FORMS_FETCH_DATA,
  GET_FORMS_CLEAR,
  POST_FORMS_DATA,
  POST_FORMS_ERROR,
  POST_FORMS_FETCH_DATA,
  POST_FORMS_CLEAR,
} from "../types";
import { Dispatch } from "redux";
import { getData, postData } from "../../utils/common";
export const getFormData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: GET_FORMS_FETCH_DATA });
    await getData("https://ulventech-react-exam.netlify.app/api/form")
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        dispatch({
          type: GET_FORMS_DATA,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        return dispatch({
          type: GET_FORMS_ERROR,
          payload: err.response,
        });
      });
  };
};

export const postFormData = (data: {}) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: POST_FORMS_FETCH_DATA });
    await postData("https://ulventech-react-exam.netlify.app/api/form", data)
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        dispatch({
          type: POST_FORMS_DATA,
          payload: data,
        });
        return data;
      })
      .catch((err) => {
        return dispatch({
          type: POST_FORMS_ERROR,
          payload: err.response,
        });
      });
  };
};

export const clearPostData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: POST_FORMS_CLEAR });
  };
};
export const clearGetData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: GET_FORMS_CLEAR });
  };
};
