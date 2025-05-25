import React from 'react';
import { MessageLoading } from '../ui/message-loading';

export const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-2 items-center justify-center p-8">
      <div className="flex items-center ">
        <MessageLoading />
      </div>

      <div className="text-center">
        <p className="text-gray-600  text-xl font-normal leading-relaxed">
          Please wait a moment...
        </p>
      </div>
    </div>
  );
};
