import React from 'react';
import Lottie from 'lottie-react';
import maintenance from '../lottie/maintenance.json';

const UnderMaintenance = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[400px] h-[400px]">
        <Lottie
          autoplay
          loop
          animationData={maintenance}
          style={{ height: '100', width: '100', margin: 'auto' }}
        />
      </div>
      <h1 className="text-3xl font-bold underline">Under Development</h1>
    </div>
  );
};

export default UnderMaintenance;
