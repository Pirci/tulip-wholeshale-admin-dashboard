import { useState } from 'react';
import styles from './index.module.scss';
import { RecentOrders } from '../../components/Dashboard/RecentOrders';
import { TotalSales } from '../../components/Dashboard/TotalSales';
import { BestSellers } from '../../components/Dashboard/BestSellers';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('list');

  const handleClick = (val: string) => {
    setActiveView(val);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'list':
        return <RecentOrders />;
      case 'form':
        return <TotalSales />;
      case 'bestSellers':
        return <BestSellers />;
      default:
        return <RecentOrders />;
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.button_container}>
        <button
          className={activeView === 'list' ? styles.active_button : ''}
          onClick={() => handleClick('list')}
        >
          Recent Orders
        </button>
        <button
          className={activeView === 'form' ? styles.active_button : ''}
          onClick={() => handleClick('form')}
        >
          Total Sales
        </button>
        <button
          className={activeView === 'bestSellers' ? styles.active_button : ''}
          onClick={() => handleClick('bestSellers')}
        >
          Best Sellers
        </button>
      </div>
      <div>{renderActiveView()}</div>
    </div>
  );
}
