'use client';

import * as React from 'react';

function Footerdemo() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-medium text-gray-900 mb-2">Stay Connected</h3>
            <p className="text-gray-600">Follow our latest updates and stories</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-center md:text-right">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Contact</span>
              <a
                href="mailto:hello@example.com"
                className="text-gray-900 hover:text-black transition-colors"
              >
                hello@example.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Social</span>
              <div className="flex gap-4 justify-center md:justify-end">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
