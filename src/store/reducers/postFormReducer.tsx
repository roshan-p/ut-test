import {
  POST_FORMS_DATA,
  POST_FORMS_ERROR,
  POST_FORMS_FETCH_DATA,
  POST_FORMS_CLEAR
} from "../types";

const initialState = {
  data: {},
  loading: false,
};

const postFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_FORMS_FETCH_DATA:
      return {
        ...state,
        data: action.payload || {},
        loading: true,
      };
    case POST_FORMS_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case POST_FORMS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case POST_FORMS_CLEAR:
      return {
        data: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default postFormReducer;
