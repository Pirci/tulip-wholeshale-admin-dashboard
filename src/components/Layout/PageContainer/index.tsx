import * as React from "react";
import Box from "@mui/material/Box";
import styles from "./index.module.scss";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box className={styles.main_container} sx={{ display: "flex" }}>
      {children}
    </Box>
  );
};

export default PageContainer;
