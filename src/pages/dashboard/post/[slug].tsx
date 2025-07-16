import TableListPosts from '@/components/modules/posts/list-posts/Table/table-complete-posts';
import NotFound from '@/components/NotFound';
import { signUpload } from '@/lib/cloudinary.server';
import { setCloudinaryData } from '@/store/cloudinary';
import { Cloudinary } from '@/types/globals';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps<{
  data: { cloudinary: Cloudinary | null; slug: string };
}> = async (context) => {
  const cloudinarySign = signUpload();
  const slug = Array.isArray(context.query.slug) ? context.query.slug[0] : context.query.slug;

  return {
    props: {
      data: {
        cloudinary: cloudinarySign,
        slug: slug || '',
      },
    },
  };
};

const Page = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    if (!data.cloudinary) {
      return;
    }
    setCloudinaryData({ cloudinary: data.cloudinary });
  }, [data.cloudinary]);

  if (!data.slug) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div>
      <TableListPosts postTypeSelected={data.slug} />
    </div>
  );
};

export default Page;
