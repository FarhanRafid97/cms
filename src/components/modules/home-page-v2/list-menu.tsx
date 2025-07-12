import { listMenu } from '@/lib/options-default';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const ListMenu = () => {
  return (
    <div className="h-auto">
      <div className="mx-auto">
        <div className="border  overflow-hidden bg-white">
          {listMenu.map((menu, index) => (
            <Link href={menu.link} key={menu.id}>
              <div
                className={`group cursor-pointer hover:bg-gray-50 ${
                  index !== listMenu.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
                  <div className="flex-1">
                    <h2 className="text-base md:text-lg font-medium text-gray-800 group-hover:text-gray-900 font--mono">
                      {menu.title}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-100 group-hover:bg-gray-900">
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
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
