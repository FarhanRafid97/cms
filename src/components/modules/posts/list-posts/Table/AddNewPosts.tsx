import { CompleteInput } from '@/components/common/complete-input';
import { MultipleSelectDropdown } from '@/components/custom/MultipleSelect';
import SelectDropdown from '@/components/custom/SelectDropdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogWrapperContent,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/Auth';
import { useGetListCategory } from '@/querries/parameter/category';
import { useGetListTag } from '@/querries/parameter/tags';
import { useCreateNewPost } from '@/querries/posts/post';
import { CreatePost, CreatePostSchema } from '@/schema/posts/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UploadThumbnail from './UploadThumbnail';

export function AddNewPosts() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user } = useAuth();

  const { data: dataCategory, isFetching: isFetchingCategory } = useGetListCategory();
  const { data: dataTags, isFetching: isFetchingTags } = useGetListTag();
  const { mutateAsync, isPending } = useCreateNewPost();
  const [randomNumb, setRandomNumb] = useState(1);

  const { handleSubmit, formState, watch, register, setValue, setError, clearErrors, reset } =
    useForm<CreatePost>({
      resolver: zodResolver(CreatePostSchema),
      defaultValues: {
        status: 'draft',
        category_id: '',
        author_id: user?.id || '',
        reading_time: 1,
        title: '',
      },
    });

  const watchValueCategory = watch('category_id');
  const watchValueTag = watch('slug');

  const onSubmit = async (payload: CreatePost) => {
    await mutateAsync({
      payload,
    });
    reset();
    setIsOpenModal(false);
    setRandomNumb((prev) => (prev === 1 ? 2 : 1));

    return;
  };
  console.log(formState.errors);
  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs font-normal gap-2">
          <Plus size={14} />
          Article Baru
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2/4"
        onCloseAutoFocus={() => {
          setRandomNumb((prev) => (prev === 1 ? 2 : 1));
          clearErrors();
          reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Tambahkan Artikel Baru</DialogTitle>
          <DialogDescription>
            Silakan isi form dibawah untuk menambahkan artikel baru. Pastikan untuk memilih kategori
            dan hashtag yang sesuai.
          </DialogDescription>
        </DialogHeader>
        <DialogWrapperContent>
          <form id="form-add-new-post" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CompleteInput
              {...register('title')}
              label="Judul Artikel"
              error={formState.errors.title?.message}
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
          </form>{' '}
        </DialogWrapperContent>
        <DialogFooter className="flex sm:justify-between">
          {' '}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpenModal(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button disabled={isPending} type="submit" form="form-add-new-post" className="gap-2">
            Tambahkan {isPending ? <Loader2 className="animate-spin " size={15} /> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
