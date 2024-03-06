import React from 'react';
import { DataTable } from './DataTable';
import { columns } from './columns';

interface TableProps {
  data: any[];  // Replace 'any' with the appropriate data type
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

const Table: React.FC<TableProps> = ({ data, page, setPage, pageSize, setPageSize }) => {
  console.log('Data in Table component:', data);
  
  return (
    <section className='py-24'>
      <div className='container'>
        {/* <h1 className='text-3xl font-bold'>ALL USERS</h1> */}
        <DataTable
          columns={columns}
          data={data}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </section>
  );
};

export default Table;
