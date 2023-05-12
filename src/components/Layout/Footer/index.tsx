import { Box, Typography } from "@mui/material";
import styles from "./index.module.scss";

export default function Footer() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        className={styles.main_container}
        variant='h6'
        gutterBottom
        color={"white"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        margin={"0px"}
        fontSize={"0.75rem"}
      >
        <p>@All rights reserved</p>
      </Typography>
    </Box>
  );
  // <div className={styles.main_container}>@All rights reserved</div>;
}
