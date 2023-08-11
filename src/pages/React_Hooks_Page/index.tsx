import { Outlet } from 'react-router-dom';

export default function ReactHooksPage() {
  return (
    <div className='bg-white p-8 w-full'>
      <Outlet></Outlet>
    </div>
  );
}
