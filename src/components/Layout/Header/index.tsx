import Actions from './Actions';
import CenterComponent from './CenterComponent';
import Logo from './Logo';
import styles from './index.module.scss';

interface HeaderProps{
  title: string;
  subtitle?: string;
}

function Header(props: HeaderProps) {

  return (
    <div className={styles.main_container}> 
      <div className={styles.wrapper}>
        <Logo />
        <CenterComponent title={props.title} subtitle={props.subtitle}/>
        <Actions />
      </div>
    </div>
  );
}

export default Header;
