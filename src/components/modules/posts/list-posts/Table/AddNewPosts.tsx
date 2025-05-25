import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Form, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePost, CreatePostSchema } from '@/schema/posts/post';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import SelectDropdown from '@/components/custom/SelectDropdown';
import { useGetListCategory } from '@/querries/parameter/category';
import { useAuth } from '@/context/Auth';
import { MultipleSelectDropdown } from '@/components/custom/MultipleSelect';
import { useGetListTag } from '@/querries/parameter/tags';
import { useCreateNewPost } from '@/querries/posts/post';

export function AddNewPosts() {
  const { user } = useAuth();
  console.log('user', user);

  const { data: dataCategory, isFetching: isFetchingCategory } = useGetListCategory();
  const { data: dataTags, isFetching: isFetchingTags } = useGetListTag();
  const { mutateAsync, isPending } = useCreateNewPost();

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
  const { formState, watch, setValue, clearErrors, reset } = hookForm;
  console.log(formState.errors);

  const watchValueCategory = watch('category_id');
  const watchValueTag = watch('slug');

  const onSubmit = async (payload: CreatePost) => {
    const response = await mutateAsync({ payload: payload });
    reset();

    return;
  };

  return (
    <Dialog>
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectDropdown
              option={dataCategory?.map((category) => {
                return {
                  label: category.name,
                  value: category.id,
                };
              })}
              label="Pilih Kategori"
              selectedVal={watchValueCategory}
              handleOnChange={(data) => {
                console.log(data);
                setValue('category_id', data.value);
                if (data.value) {
                  clearErrors('category_id');
                }
              }}
              error={formState.errors.category_id?.message}
              isPending={isFetchingCategory}
            />
            <MultipleSelectDropdown
              label="Hashtag"
              handleChange={(value) => {
                console.log('value', value);
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
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Batalkan
                </Button>
              </DialogClose>
              <Button type="submit">Tambahkan</Button>
            </div>
          </form>{' '}
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
