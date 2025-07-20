import LayoutSection from '@/components/modules/home-page/layout-section';
import ViewDetailPost from '@/components/modules/posts/detail-post/ViewDetailPost';
import { formatedDateDDMMYYY } from '@/lib/utils';
import { useGetPostDetail } from '@/querries/posts/post';
import { Calendar, Tag, User } from 'lucide-react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps<{
  slug: string;
}> = async (context) => {
  const slug = Array.isArray(context.query.slug) ? context.query.slug[0] : context.query.slug;

  return {
    props: {
      slug: slug || '',
    },
  };
};

const DetailPost = ({ slug }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data } = useGetPostDetail({ postId: slug });

  console.log('data', data);

  return (
    <LayoutSection>
      <div className="mx-auto min-h-screen w-full flex flex-col">
        {/* Enhanced Header Section */}
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex items-center justify-center relative md:h-[400px] h-[200px]">
          <Image
            src={data?.featured_image_url || ''}
            alt={data?.title || ''}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="w-full h-full top-0 left-0 object-cover object-center relative rounded-xl overflow-hidden"
          />
        </div>
        <header className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-4">
              {data?.title}
            </h1>

            {/* Decorative line */}
            <div className="w-20 h-1 bg-gray-900 dark:bg-gray-100 mx-auto rounded-full"></div>
          </div>

          {/* Meta Information */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left side - Author and Date */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                      Author
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {data?.real_author_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <Calendar className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                      Published
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatedDateDDMMYYY(data?.created_at || '')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Category and Tags */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:items-end">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <Tag className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
                      Category
                    </p>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600">
                      {data?.category_name}
                    </span>
                  </div>
                </div>

                {/* Tags from slug */}
                {data?.slug && (
                  <div className="flex flex-wrap gap-2">
                    {data.slug
                      .split('-')
                      .slice(0, 4)
                      .map((item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                          #{item}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex flex-col mx-auto items-center justify-center max-w-4xl px-4">
          <ViewDetailPost content={data?.content || ''} />
        </div>
      </div>
    </LayoutSection>
  );
};

export default DetailPost;
