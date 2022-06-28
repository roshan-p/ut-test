import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function FormButtons(props: { loading: any }) {
  const { loading } = props;
  return (
    <Stack
      spacing="30%"
      direction="row"
      justifyContent="center"
      paddingTop="20px"
      paddingBottom="20px"
    >
      <Button variant="contained" type="submit" disabled={loading}>
        Submit
      </Button>
      <Button variant="text" type="reset" disabled={loading}>
        Clear
      </Button>
    </Stack>
  );
}
