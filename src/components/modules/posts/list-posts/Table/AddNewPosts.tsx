import { MultipleSelectDropdown } from '@/components/custom/MultipleSelect';
import SelectDropdown from '@/components/custom/SelectDropdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/Auth';
import { useGetListCategory } from '@/querries/parameter/category';
import { useGetListTag } from '@/querries/parameter/tags';
import { useCreateNewPost } from '@/querries/posts/post';
import { CreatePost, CreatePostSchema } from '@/schema/posts/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import UploadThumbnail from './UploadThumbnail';
import { useState } from 'react';

export function AddNewPosts() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user } = useAuth();

  const { data: dataCategory, isFetching: isFetchingCategory } = useGetListCategory();
  const { data: dataTags, isFetching: isFetchingTags } = useGetListTag();
  const { mutateAsync, isPending } = useCreateNewPost();
  const [randomNumb, setRandomNumb] = useState(1);

  const hookForm = useForm<CreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      status: 'draft',
      category_id: '',
      author_id: user?.id || '',
      reading_time: 1,
      title: '',
    },
  });
  const { formState, watch, register, setValue, setError, clearErrors, reset } = hookForm;
  console.log(formState.errors);

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

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs font-normal gap-2">
          <Plus size={14} />
          Article Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2/4">
        <DialogHeader>
          <DialogTitle>Tambahkan Artikel Baru</DialogTitle>
        </DialogHeader>

        <FormProvider {...hookForm}>
          <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={hookForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Judul Artikel</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectDropdown
              isRequired
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
              isRequired={true}
            />

            <div className="flex justify-end gap-2">
              <DialogClose asChild disabled={isPending}>
                <Button type="button" variant="ghost">
                  Batalkan
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit" className="gap-2">
                Tambahkan {isPending ? <Loader2 className="animate-spin " size={15} /> : null}
              </Button>
            </div>
          </form>{' '}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
