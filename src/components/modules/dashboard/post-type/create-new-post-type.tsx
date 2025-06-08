import { CompleteInput } from '@/components/common/complete-input';
import { CompleteTextArea } from '@/components/common/complete-text-area';
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
import { useCreateNewPostType } from '@/querries/parameter/post-type';
import { CreatePostType, PostTypeSchema } from '@/schema/paramter/post-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateNewPostType = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostType>({
    resolver: zodResolver(PostTypeSchema),
  });
  const { mutateAsync: createNewPostType, isPending } = useCreateNewPostType();

  const onSubmit = async (data: CreatePostType) => {
    const response = await createNewPostType(data);
    if (response) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-xs">
          <Plus size={14} />
          <span>Tipe Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => {
          reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Tambahkan Tipe Post</DialogTitle>
          <DialogDescription>
            Tambahkan tipe post baru untuk kategori artikel Anda.
          </DialogDescription>
        </DialogHeader>
        <DialogWrapperContent>
          <form id="form-create-post-type" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CompleteInput
              label="Nama Tipe Post"
              isRequired
              disabled={isPending}
              error={errors.name?.message}
              {...register('name')}
            />
            <CompleteTextArea
              label="Deskripsi Tipe Post"
              isRequired
              disabled={isPending}
              error={errors.description?.message}
              {...register('description')}
            />
          </form>{' '}
        </DialogWrapperContent>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" form="form-create-post-type" disabled={isPending} className="gap-2">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPostType;
