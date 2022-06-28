import {
  GET_FORMS_DATA,
  GET_FORMS_ERROR,
  GET_FORMS_FETCH_DATA,
  GET_FORMS_CLEAR
} from "../types";

const initialState = {
  data: {},
  loading: false,
};

const getFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_FORMS_FETCH_DATA:
      return {
        ...state,
        data: action.payload || {},
        loading: true,
      };
    case GET_FORMS_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case GET_FORMS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
      case GET_FORMS_CLEAR:
        return {
          data: {},
          loading: false,
        };

    default:
      return state;
  }
};

export default getFormReducer;
