import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Loading = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      style={{ marginTop: "25%" }}
    >
      <CircularProgress />
      <Typography variant="h1" className="title-font">
        Content is loading ...
      </Typography>
    </Grid>
  );
};

export default Loading;
