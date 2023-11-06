import Grid from "@mui/material/Grid";
import classes from "./Header.module.css";
import { Typography } from "@mui/material";
function Header({ title, content, size}) {
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={8} sx={{ textAlign: "center" }}>
          <div style={{margin: '5%'}}>
            <Typography variant={size} className={classes.header}>{title} </Typography>
            <Typography>{content}</Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
