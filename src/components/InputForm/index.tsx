import React, { useState, useEffect, Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormGroup,
  TextareaAutosize,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import CircularIndeterminate from "../CircularIndeterminate";
import { camelCaseToWords, validateEmail } from "../../utils/common";
import FormButtons from "../FormButtons";
import { commonStyles } from "./InputFormStyle";
import Alert from "../Alert";

interface IformsData {
  type?: string;
  fieldName?: string;
  value?: string;
}

export default function InputForm(props: {
  data: Array<IformsData>;
  loading: boolean;
  postLoading: boolean;
  userData: Array<string>;
  setUserData: any;
  submitFormData: any;
  postResp: any;
  clearSubmission: any;
}) {
  const {
    data,
    loading,
    postLoading,
    userData,
    setUserData,
    submitFormData,
    postResp,
    clearSubmission,
  } = props;
  const [textAreaIDs, setTextAreaIDs] = useState([]);
  const [errorList, setErrorList] = useState({});
  const [showAlert, setShowAlert] = useState(null);
  const boxHeight = (data && data?.length * 15 + "vh") || "50vh";
  const router = useRouter();

  useEffect(() => {
    if (typeof postResp?.success !== "undefined") {
      setShowAlert(postResp?.success ? "success" : "error");
    }
  }, [postResp?.success]);

  useEffect(() => {
    if (data) {
      let setDefaultValueArray = {};
      let tmpTextAreaIDs = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === "multiline") {
          tmpTextAreaIDs.push("input" + i);
        }
        setDefaultValueArray = {
          ...setDefaultValueArray,
          [data[i]?.fieldName]: data[i]?.value,
        };
      }
      setUserData({ ...setDefaultValueArray });
      setTextAreaIDs(tmpTextAreaIDs);
    }
  }, [data, setUserData]);

  const validateForm = () => {
    let tmpErrorList: any = errorList;
    let blocking = true;
    for (const key in userData) {
      if (!userData[key]) {
        tmpErrorList[key] = `Please fill ${camelCaseToWords(key)}`;
      }
      if (userData[key]) {
        if (key === "emailAddress") {
          if (!validateEmail(userData["emailAddress"])) {
            tmpErrorList["emailAddress"] = `Please valid Email`;
          } else {
            delete tmpErrorList[key];
          }
        } else {
          delete tmpErrorList[key];
        }
      }
    }
    setErrorList({ ...tmpErrorList });

    if (JSON.stringify(tmpErrorList) === "{}") {
      blocking = false;
    }

    return blocking;
  };
  const onRetry = () => {
    router.push("/");
    router.reload();
  };
  const handleSubmit = (e: any) => {
    if (!validateForm()) {
      submitFormData();
    }
    e.preventDefault();
  };
  const onCLear = () => {
    if (data) {
      let setDefaultValueArray = {};
      for (let i = 0; i < data.length; i++) {
        setDefaultValueArray = {
          ...setDefaultValueArray,
          [data[i]?.fieldName]: null,
        };
      }
      if (textAreaIDs.length > 0) {
        for (let i = 0; i < textAreaIDs.length; i++) {
          if (document.getElementById(textAreaIDs[i])) {
            document.getElementById(textAreaIDs[i]).innerHTML = "";
          }
        }
      }
      setErrorList({})
      setUserData({ ...setDefaultValueArray });
    }
  };

  const setQuery = (e: any) => {
    setErrorList({
      ...errorList,
      [e.target.name]: null,
    });
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <form onSubmit={handleSubmit} onReset={onCLear}>
        <Box
          className="input-form-box"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={boxHeight}
          minWidth="80vw"
          maxHeight="100vh"
          height="auto"
          overflow="hidden"
          marginTop="30px"
          sx={commonStyles(loading || postLoading)}
        >
          <Container
            onClick={() => {
              setShowAlert(false);
            }}
          >
            <CircularIndeterminate loading={loading || postLoading} />
            {showAlert && (
              <Alert
                title={postResp?.success ? "Congratulations!" : "Error!"}
                message={postResp?.message}
                severity={postResp?.success ? "success" : "error"}
                onClose={() => {
                  if (postResp?.success) {
                    onCLear();
                    clearSubmission();
                    setShowAlert(false);
                  } else {
                    setShowAlert(false);
                  }
                }}
              ></Alert>
            )}
            {!loading && showAlert !== "success" && data && (
              <div>
                <FormGroup>
                  {data &&
                    data.map((item: any, index: any) => (
                      <FormControl key={index} style={{ marginBottom: "20px" }}>
                        {item?.type !== "select" && item?.type !== "multiline" && (
                          <TextField
                            onChange={(e: any) => {
                              setQuery(e);
                            }}
                            id={"input" + index}
                            name={item?.fieldName}
                            aria-describedby="input-text"
                            type={item?.type || "text"}
                            value={userData[item?.fieldName] || ""}
                            label={camelCaseToWords(item?.fieldName)}
                            error={!!errorList[item?.fieldName]}
                            helperText={errorList[item?.fieldName]}
                            disabled={postLoading}
                            placeholder={camelCaseToWords(item?.fieldName)}
                            size="medium"
                          />
                        )}
                        {item?.type === "multiline" && (
                          <div>
                            <InputLabel
                              style={{
                                color: errorList[item?.fieldName] && "#d32f2f",
                              }}
                              htmlFor={"input" + index}
                            >
                              {camelCaseToWords(item?.fieldName)}
                            </InputLabel>
                            <TextareaAutosize
                              onChange={(e) => {
                                setQuery(e);
                              }}
                              id={"input" + index}
                              name={item?.fieldName}
                              placeholder={camelCaseToWords(item?.fieldName)}
                              aria-label="input-text"
                              minRows={3}
                              maxRows={3}
                              disabled={postLoading}
                              value={userData[item?.fieldName] || ""}
                              style={{
                                width: "100%",
                                marginTop: 50,
                                marginBottom: 10,
                                maxWidth: "100%",
                                resize: "none",
                                borderColor:
                                  errorList[item?.fieldName] && "#d32f2f",
                              }}
                            />
                            {errorList[item?.fieldName] && (
                              <FormHelperText className="form-error-helper-text-style">
                                {errorList[item?.fieldName]}
                              </FormHelperText>
                            )}
                          </div>
                        )}

                        {item?.type === "select" && (
                          <Fragment>
                            <InputLabel id={"input-select-label" + index}>
                              {camelCaseToWords(item?.fieldName)}
                            </InputLabel>
                            <Select
                              labelId={"select-label" + index}
                              id={"input" + index}
                              name={item?.fieldName}
                              value={
                                userData[item?.fieldName] ||
                                (userData[item?.fieldName] && item?.value) ||
                                ""
                              }
                              label={camelCaseToWords(item?.fieldName)}
                              onChange={(e) => {
                                setQuery(e);
                              }}
                              disabled={postLoading}
                              error={!!errorList[item?.fieldName]}
                            >
                              {item?.options &&
                                item?.options.map(
                                  (option: any, optionIndex: any) => (
                                    <MenuItem value={option} key={optionIndex}>
                                      {option}
                                    </MenuItem>
                                  )
                                )}
                            </Select>
                            {errorList[item?.fieldName] && (
                              <FormHelperText className="form-error-helper-text-style">
                                {errorList[item?.fieldName]}
                              </FormHelperText>
                            )}
                          </Fragment>
                        )}
                      </FormControl>
                    ))}
                </FormGroup>
              </div>
            )}
            {!data && !loading && (
              <div className="retry-label">
                {'Click on "RETRY" button to refill your form'}
              </div>
            )}
          </Container>
        </Box>
        {showAlert !== "success" && data && <FormButtons loading={loading} />}
        {!loading && !data && (
          <div className="retry-button-container">
            <Button
              onClick={() => {
                onRetry();
              }}
              variant="contained"
            >
              Retry
            </Button>
          </div>
        )}
      </form>
    </React.Fragment>
  );
}
