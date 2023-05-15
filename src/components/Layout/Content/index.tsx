import Sidebar from "../Sidebar";
import PageContainer from "../PageContainer";
import styles from "./index.module.scss";

export default function Content() {
  return (
    <div className={styles.main_container}>
      <Sidebar />
      {/* put your page component here */}
      <PageContainer>
        {/* Your page component */}
        <p>My page content</p>
      </PageContainer>
    </div>
  );
}
