import { rem } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/Navbar';

export default function ManagementLayout() {
  return (
    <div className="container mt-8 text-sm text-gray-600">
      <div className="header mb-4 flex gap-12">
        <img src="/assets/images/logo.jpg" alt="logo" className="w-3h-32 h-32 object-contain" />
        <div className="mb-2 flex flex-1 flex-col items-start">
          <div className="flex items-center justify-start gap-2">
            <IconStar style={{ width: rem(40), height: rem(40) }} stroke={1.5} fill="yellow" color="yellow" />
            <h2 className="m-0 text-3xl text-red-500">Nhật ký điện tử</h2>
            <IconStar style={{ width: rem(40), height: rem(40) }} stroke={1.5} fill="yellow" color="yellow" />
          </div>
          <h3 className="my-6 text-4xl uppercase text-green-500">Sẻ chia & Thấu hiểu</h3>
        </div>
      </div>
      <div className="divider my-2 w-full border-x-0 border-b-[3px] border-t-[3px] border-solid border-yellow-500">
        <h2 className="italic">"Cái gì xuất phát từ trái tim thì sẽ đi đến trái tim"</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="bg-b col-span-1 md:col-span-3 md:pr-4">
          <Navbar />
        </div>
        <div className="col-span-1  md:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
