import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import CustomTable from '../../shared/CustomTable';
import { Customer } from '../../../models/customer';

export const CustomerList = () => {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customersLength, setCustomersLength] = useState(0);

  // use memo can be used in here to avoid re-rendering
  const displayedCustomers = [
    { label: 'Id', value: 'id' },
    { label: 'Customer Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Address', value: 'address' },
    { label: 'Level', value: 'level' },
  ];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/customers?_page=${
            page + 1
          }&_limit=${rowsPerPage}`
        );
        const contentType = response.headers.get('content-type');
        let total = response.headers.get('X-Total-Count');
        setCustomersLength(Number(total));
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setCustomers(data);
        } else {
          console.log('No JSON data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomers();
  }, [page, rowsPerPage]);

  const tableUpdateAfterRecordDelete = (recordId: number) => {
    const updatedCustomers = customers.filter(
      (customer) => String(customer.id) !== String(recordId)
    );
    setCustomers(updatedCustomers);
    setCustomersLength(prev => prev-1);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>List of Customers</div>
      <CustomTable
        records={customers}
        tableURLExtension={'customers'}
        recordsLength={customersLength}
        onPageChange={(page) => setPage(page)}
        onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
        onRecordsDelete={(recordId) => {
          tableUpdateAfterRecordDelete(recordId);
        }}
        displayedItems={displayedCustomers}
      ></CustomTable>
    </div>
  );
};
