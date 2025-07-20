'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Large 404 */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-black tracking-tight">404</h1>
          <div className="w-16 h-0.5 bg-black mx-auto"></div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-black">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            Halaman yang Anda cari tidak ada atau telah dipindahkan ke lokasi lain.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-black text-white hover:bg-gray-800 transition-colors">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </Button>
        </div>

        {/* Decorative element */}
        <div className="pt-8">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
