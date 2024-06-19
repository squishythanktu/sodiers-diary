import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/Navbar';

export default function ManagementLayout() {
  return (
    <div className="container mt-8 text-sm text-gray-600">
      <div className="header mb-4 flex bg-yellow-50">
        <img src="/assets/images/logo.jpg" alt="logo" className="w-32 h-32 object-contain" />
        <img src="/assets/images/title.jpg" alt="title" className='max-w-5xl' />
      </div>
      <div className="divider my-2 w-full border-x-0 border-b-[3px] border-t-[3px] border-solid border-yellow-500">
        <h2 className="italic">"Cái gì xuất phát từ trái tim thì sẽ đi đến trái tim"</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="bg-b col-span-1 md:col-span-3 md:pr-4">
          <img src="/assets/images/auth-cover.jpg" alt="auth cover" className='max-w-xs' />
          <Navbar />
        </div>
        <div className="col-span-1  md:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
