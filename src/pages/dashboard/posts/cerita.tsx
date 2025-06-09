import TableListPosts from '@/components/modules/posts/list-posts/Table/table-complete-posts';
import { signUpload } from '@/lib/cloudinary.server';
import { setCloudinaryData } from '@/store/cloudinary';
import { Cloudinary } from '@/types/globals';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps<{
  data: { cloudinary: Cloudinary | null };
}> = async () => {
  const cloudinarySign = signUpload();

  return {
    props: {
      data: {
        cloudinary: cloudinarySign,
      },
    },
  };
};

const Cerita = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useEffect(() => {
    if (!data.cloudinary) {
      return;
    }
    setCloudinaryData({ cloudinary: data.cloudinary });
  }, [data.cloudinary]);

  return (
    <div>
      <TableListPosts />
    </div>
  );
};

export default Cerita;
