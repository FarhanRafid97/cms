import { listMenu } from '@/lib/options-default';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ListMenu = () => {
  return (
    <div className="h-auto   ">
      <div className=" mx-auto  ">
        <div className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {listMenu.map((menu, index) => (
            <Link href={menu.link} key={menu.id}>
              <div
                key={menu.id}
                className={`group cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                  index !== listMenu.length - 1 ? 'border-custome-bottom' : ''
                }`}
              >
                <div className="flex items-center justify-between px-8 py-8 md:px-12 md:py-12">
                  <h2 className="text-3xl md:text-4xl font-medium text-gray-900 group-hover:text-black transition-colors duration-200 !font-geist-mono">
                    {menu.title}
                  </h2>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-colors duration-200 ">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
