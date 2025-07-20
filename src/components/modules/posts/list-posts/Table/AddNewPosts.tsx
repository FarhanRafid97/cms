import { CompleteInput } from '@/components/common/complete-input';
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
import { useCreateNewPost } from '@/querries/posts/post';
import { CreatePost, CreatePostSchema } from '@/schema/posts/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetPostTypeId } from '@/hooks/use-get-lastpath';
import { useRouter } from 'next/navigation';

export function AddNewPosts() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user } = useAuth();

  const { data: dataCategory, isFetching: isFetchingCategory } = useGetListCategory();
  const { mutateAsync, isPending } = useCreateNewPost();
  const postTypeSelected = useGetPostTypeId();

  const { push } = useRouter();

  const { handleSubmit, formState, watch, register, setValue, clearErrors, reset } =
    useForm<CreatePost>({
      resolver: zodResolver(CreatePostSchema),
      defaultValues: {
        status: 'draft',
        category_id: '',
        author_id: user?.detail_user?.id || '',
        reading_time: 1,
        title: '',
      },
    });

  console.log('postTypeSelected', formState.errors);
  const watchValueCategory = watch('category_id');

  const onSubmit = async (payload: CreatePost) => {
    const { response } = await mutateAsync({
      payload: {
        ...payload,
        post_type_id: postTypeSelected.id || 1,
        slug: `${payload.title}`.toLowerCase().replace(/ /g, '-'),
      },
      postType: postTypeSelected.name || '',
    });
    reset();
    setIsOpenModal(false);

    push(`/dashboard/post/detail/${response?.id}`);
    return;
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs font-normal gap-2">
          <Plus size={14} />
          {postTypeSelected.name} Baru
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2/4"
        onCloseAutoFocus={() => {
          clearErrors();
          reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Tambahkan {postTypeSelected.name} Baru</DialogTitle>
          <DialogDescription>
            Silakan isi form dibawah untuk menambahkan {postTypeSelected.name} baru. Pastikan untuk
            memilih kategori dan hashtag yang sesuai.
          </DialogDescription>
        </DialogHeader>
        <DialogWrapperContent>
          <form id="form-add-new-post" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <CompleteInput
              {...register('title')}
              label={`Judul ${postTypeSelected.name}`}
              error={formState.errors.title?.message}
            />
            <CompleteInput
              {...register('real_author_name')}
              label="Nama Pengirim"
              error={formState.errors.real_author_name?.message}
            />
            <CompleteInput
              {...register('real_author_email')}
              label="Email Pengirim"
              error={formState.errors.real_author_email?.message}
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
