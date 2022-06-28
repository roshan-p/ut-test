import * as React from "react";
import { CircularProgress, Box } from "@mui/material";
import { boxSxProperty } from "./CircularIndeterminateStyle";
export default function CircularIndeterminate(props: { loading: any }) {
  const { loading } = props;
  return (
    <span>
      {loading && (
        <Box sx={boxSxProperty}>
          <CircularProgress />
        </Box>
      )}
    </span>
  );
}
