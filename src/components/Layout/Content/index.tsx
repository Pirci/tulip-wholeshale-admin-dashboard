import Sidebar from '../Sidebar';
import PageContainer from '../PageContainer';
import styles from './index.module.scss';

interface ContentProps {
  onHandleClick: (val: string) => void;
}

export default function Content(props: ContentProps) {
  const handleClick = (val: string) => {
    props.onHandleClick(val);
  };

  return (
    <div className={styles.main_container}>
      <Sidebar onHandleClick={(val) => handleClick(val)} />
      <PageContainer>
        <p>My page content</p>
      </PageContainer>
    </div>
  );
}
