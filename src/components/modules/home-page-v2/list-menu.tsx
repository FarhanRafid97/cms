import { listMenu } from '@/lib/options-default';
import { ArrowUpRight, BookOpen, Newspaper, Users, ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import LayoutSection from '../home-page/layout-section';

const ListMenu = () => {
  // Icon mapping for different menu types
  const getIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('artikel') || lowerTitle.includes('berita'))
      return <Newspaper className="w-5 h-5" />;
    if (lowerTitle.includes('cerita') || lowerTitle.includes('story'))
      return <BookOpen className="w-5 h-5" />;
    if (lowerTitle.includes('kolase') || lowerTitle.includes('gallery'))
      return <ImageIcon className="w-5 h-5" />;
    if (lowerTitle.includes('user') || lowerTitle.includes('profile'))
      return <Users className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  return (
    <LayoutSection>
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Kategori</h2>
          <p className="text-gray-600">Jelajahi konten berdasarkan kategori</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {listMenu.map((menu) => (
            <Link href={menu.link} key={menu.id}>
              <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-blue-600">{getIcon(menu.title)}</div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {menu.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Jelajahi koleksi {menu.title.toLowerCase()} terbaru
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Lihat Semua</span>
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            <span className="text-sm font-medium">Lihat semua kategori</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </LayoutSection>
  );
};

export default ListMenu;
