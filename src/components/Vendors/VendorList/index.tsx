import styles from './index.module.scss';
import React, { useState } from 'react';
import { Vendor } from '../../../models/vendor';
import CustomTable from '../../shared/CustomTable';

export const VendorList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vendorsLength, setVendorsLength] = useState(0);

  const displayedVendors = [
    { label: 'Id', value: 'id' },
    { label: 'Vendor Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Address', value: 'address' },
  ];

  React.useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/vendors?_page=${
            page + 1
          }]&_limit=${rowsPerPage}`
        );
        const contentType = response.headers.get('content-type');
        const total = response.headers.get('X-Total-Count');
        setVendorsLength(Number(total));
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setVendors(data);
        } else {
          console.log('No JSON data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchVendors();
  }, [page, rowsPerPage]);

  const tableUpdateAfterRecordDelete = (recordId: number) => {
    const updatedVendors = vendors.filter(
      (vendor) => String(vendor.id) !== String(recordId)
    );
    setVendors(updatedVendors);
    setVendorsLength((prev) => prev - 1);
  };

  return (
    <div className={styles.content_container}>
      <div className={styles.page_header}>List of Vendors</div>
      <CustomTable
        records={vendors}
        tableURLExtension={'vendors'}
        recordsLength={vendorsLength}
        onPageChange={(page) => setPage(page)}
        onRowsPerPageChange={(rows) => setRowsPerPage(rows)}
        onRecordsDelete={(recordId) => {
          tableUpdateAfterRecordDelete(recordId);
        }}
        displayedItems={displayedVendors}
      ></CustomTable>
    </div>
  );
};
