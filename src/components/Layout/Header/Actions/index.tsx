import { Avatar, IconButton, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import styles from "./index.module.scss";

export default function Actions() {
  return (
    <div className={styles.header_container}>
      <Stack style={{ alignItems: "center" }} direction='row' spacing={1}>
        <IconButton
          className={styles.header_container_notification}
          aria-label='notification'
        >
          <CircleNotificationsIcon style={{ width: "45px", height: "45px" }} />
        </IconButton>
        <Avatar
          className={styles.header_container_avatar}
          style={{ backgroundColor: "#61dafb" }}
          sx={{ bgcolor: deepOrange[500] }}
        >
          N
        </Avatar>
      </Stack>
    </div>
  );
}
