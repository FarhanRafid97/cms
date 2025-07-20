import { CompleteInput } from '@/components/common/complete-input';
import { MultipleSelectDropdown } from '@/components/custom/MultipleSelect';
import SelectDropdown from '@/components/custom/SelectDropdown';

import { CompleteTextArea } from '@/components/common/complete-text-area';
import { Button } from '@/components/ui/button';
import { SheetContent, Sheet as WrapperSheet } from '@/components/ui/sheet';
import { WIDTH_SIDE_CONTENT } from '@/lib/constant';
import { useGetListCategory } from '@/querries/parameter/category';
import { useGetListTag } from '@/querries/parameter/tags';
import { useUpdatePost } from '@/querries/posts/post';
import { CompleteDetailPost, CreatePost, UpdatePostSchema } from '@/schema/posts/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import UploadThumbnail from '../list-posts/Table/UploadThumbnail';

const WrapperSideContent = ({
  children,
  isMobile,
  setIsEdit,
  isEdit,
}: {
  children: React.ReactNode;
  isMobile: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
}) => {
  if (isMobile) {
    return (
      <WrapperSheet open={isEdit} onOpenChange={setIsEdit}>
        <SheetContent>{children}</SheetContent>
      </WrapperSheet>
    );
  }
  return (
    <motion.div
      animate={{
        marginLeft: isEdit ? '0px' : `-${WIDTH_SIDE_CONTENT}px`,
        x: isEdit ? '0px' : `${WIDTH_SIDE_CONTENT}px`,
      }}
      transition={{ ease: [0.79, 0.14, 0.15, 0.86], duration: 0.15 }}
    >
      <div
        className="flex-shrink-0    md:sticky top-12 inset-0 h-[calc(100vh-4.05rem)]  bg-background border-l-[0.5px] border-border-clean"
        // eslint-disable-next-line react/no-unknown-property
        style={{ width: `${WIDTH_SIDE_CONTENT}px` }}
      >
        <div className="disabled:pointer-events-none  w-full ">
          <div className="w-full h-full flex">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const SideContent = ({
  isMobile,
  setIsEdit,
  isEdit,
  data,
}: {
  isMobile: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsEdit: (value: boolean) => void;
  isEdit: boolean;
  data: CompleteDetailPost;
}) => {
  const { data: dataCategory, isFetching: isFetchingCategory } = useGetListCategory();
  const { data: dataTags, isFetching: isFetchingTags } = useGetListTag();
  const { mutateAsync, isPending } = useUpdatePost();
  const [randomNumb, setRandomNumb] = useState(1);

  const { handleSubmit, formState, watch, register, setValue, setError, clearErrors } =
    useForm<CreatePost>({
      resolver: zodResolver(UpdatePostSchema),
      defaultValues: {
        title: data.title || '',
        slug: data.slug || '',
        category_id: data.category_id || '',
        featured_image_url: data.featured_image_url || '',
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        author_id: data.author_id || '',
        real_author_name: data.real_author_name || '',
        real_author_email: data.real_author_email || '',
      },
    });

  const watchValueCategory = watch('category_id');
  const watchValueTag = watch('slug');
  const onSubmit = async (payload: CreatePost) => {
    console.log(payload);
    // No, the current code checks if ALL fields are unchanged (all conditions must be true).
    // If you want "if one is true then all true" (i.e., if ANY field is unchanged, treat as unchanged), use this:
    const isNotChanged =
      data.id === data.id &&
      data.title === payload.title &&
      data.slug === payload.slug &&
      data.category_id === payload.category_id &&
      data.featured_image_url === payload.featured_image_url &&
      data.real_author_name === payload.real_author_name &&
      data.real_author_email === payload.real_author_email &&
      data.meta_description === payload.meta_description;
    // But this logic is likely not what you want for "no changes" detection.
    console.log(payload.real_author_name, data.real_author_name);
    if (isNotChanged) {
      toast.info('Tidak ada perubahan');
      return;
    }
    if (!data.id) {
      toast.error('Artikel tidak ditemukan');
      return;
    }
    mutateAsync({ payload, postId: data.id });
    setRandomNumb((prev) => prev + 1);
  };
  return (
    <WrapperSideContent isMobile={isMobile} setIsEdit={setIsEdit} isEdit={isEdit}>
      <div className="w-full h-full flex flex-col gap-4">
        <form
          id="form-add-new-post"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 gap-1 h-[calc(100vh-10rem)]  overflow-y-auto p-4"
        >
          <CompleteInput
            {...register('title')}
            label="Judul"
            error={formState.errors.title?.message}
          />
          <CompleteInput
            {...register('real_author_name')}
            label="Pengirim"
            error={formState.errors.real_author_name?.message}
          />
          <CompleteInput
            {...register('real_author_email')}
            label="Email Pengirim"
            error={formState.errors.real_author_email?.message}
          />{' '}
          <CompleteTextArea
            {...register('meta_title')}
            label="Meta Title"
            error={formState.errors.meta_title?.message}
          />
          <SelectDropdown
            disabled={isPending}
            option={dataCategory?.map((category) => {
              return {
                label: category.name,
                value: category.id,
              };
            })}
            label="Pilih Kategori"
            selectedVal={watchValueCategory}
            handleOnChange={(data) => {
              setValue('category_id', data.value);
              if (data.value) {
                clearErrors('category_id');
              }
            }}
            error={formState.errors.category_id?.message}
            isPending={isFetchingCategory}
          />
          <UploadThumbnail
            isDisabled={isPending}
            clearErrors={clearErrors}
            errors={formState.errors}
            register={register}
            setError={setError}
            setValue={setValue}
            watch={watch}
          />
          <MultipleSelectDropdown
            label="Hashtag"
            key={`triggerd-${randomNumb}`}
            handleChange={(value) => {
              setValue('slug', value);
              if (value.length > 0) {
                clearErrors('slug');
              }
            }}
            options={
              dataTags
                ? dataTags.map((tag) => {
                    return {
                      label: tag.name,
                      value: tag.slug,
                    };
                  })
                : []
            }
            selectedData={watchValueTag}
            isPending={isFetchingTags}
            error={formState.errors.slug?.message}
          />
        </form>
        <div className="p-4">
          <Button form="form-add-new-post" type="submit" className="w-full" disabled={isPending}>
            Simpan Perubahan {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          </Button>
        </div>
      </div>
    </WrapperSideContent>
  );
};
