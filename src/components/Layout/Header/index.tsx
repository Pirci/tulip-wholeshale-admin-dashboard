import Actions from './Actions';
import CenterComponent from './CenterComponent';
import Logo from './Logo';
import styles from './index.module.scss';

function Header() {
  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Logo />
        <CenterComponent />
        <Actions />
      </div>
    </div>
  );
}

export default Header;
