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
      <div className="w-full mt-10">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Jelajahi konten Lainnya</h2>
          <p className="text-gray-600 text-lg">Temukan berbagai kategori konten yang menarik</p>
        </div>

        {/* Category List */}
        <div className="space-y-2 grid">
          {listMenu.map((menu) => (
            <Link href={menu.link} key={menu.id}>
              <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  {/* Left side - Icon and Content */}
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-white">{getIcon(menu.title)}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-black mb-2">{menu.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Jelajahi koleksi {menu.title.toLowerCase()} terbaru dan temukan konten yang
                        sesuai dengan minat Anda
                      </p>
                    </div>
                  </div>

                  {/* Right side - Arrow */}
                  <div className="text-gray-400 group-hover:text-black ml-6">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-black font-semibold cursor-pointer border-2 border-black rounded-full px-8 py-4 hover:bg-black hover:text-white">
            <span className="text-base">Lihat semua kategori</span>
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </LayoutSection>
  );
};

export default ListMenu;
