import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  getFormData,
  clearGetData,
  postFormData,
  clearPostData,
} from "../../store/actions/formAction";
import InputForm from "../../components/InputForm";

type State = { a: string };
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const Forms = () => {
  const formData = useSelector((state: any) => state?.getFormReducer);
  const postRespData = useSelector((state: any) => state?.postFormReducer);
  const dispatch: AppDispatch = useDispatch();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    dispatch(getFormData());
  }, [dispatch]);

  return (
    <div className="centered-container">
      <InputForm
        data={formData?.data?.data}
        postResp={postRespData?.data}
        loading={formData?.loading}
        postLoading={postRespData?.loading}
        userData={userData}
        setUserData={setUserData}
        submitFormData={() => {
          dispatch(postFormData(userData));
        }}
        clearSubmission={() => {
          dispatch(clearGetData());
          dispatch(clearPostData());
        }}
      />
    </div>
  );
};
export default Forms;