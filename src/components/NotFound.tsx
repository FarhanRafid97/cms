import notFound from '@/lottie/notfound.json';
import Lottie from 'lottie-react';

const NotFound = () => {
  return <Lottie autoplay loop animationData={notFound} className="h-[500px] w-[500px]" />;
};

export default NotFound;
