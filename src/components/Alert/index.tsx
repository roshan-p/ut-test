import * as React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

export default function DescriptionAlerts(props: {
  severity: any;
  title: any;
  message: any;
  onClose: Function;
}) {
  const { severity, title, message, onClose } = props;
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        style={{
          position: "absolute",
          zIndex: 100,
          width: "50%",
          justifyContent: "center",
          margin: "auto",
          left:0,
          right:0
        }}
        onClose={() => onClose()}
        severity={severity || "success"}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}
