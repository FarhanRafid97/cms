import HeroSection from '@/components/modules/home-page-v2/hero-section';
import NewestArticle from '@/components/modules/home-page-v2/newest-article';
import { dummyPost } from '@/lib/options-default';

export default function Home() {
  // Pick 3 random items from dummyPost
  const getRandomPosts = (arr: typeof dummyPost, n: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const randomPosts = getRandomPosts(dummyPost, 3);
  return (
    <div className="grid grid-cols-1 relative ">
      <HeroSection />
      <div className="bg-white">
        <NewestArticle dummyPost={randomPosts} label="Prosa" />
      </div>

      <NewestArticle dummyPost={randomPosts} label="Esai" />
      <div className="bg-white">
        <NewestArticle dummyPost={randomPosts} label="Liputan" />
      </div>

      <NewestArticle dummyPost={randomPosts} label="Kolase" />
    </div>
  );
}
