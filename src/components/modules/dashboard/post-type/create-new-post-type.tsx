import { CompleteInput } from '@/components/common/complete-input';
import { CompleteTextArea } from '@/components/common/complete-text-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateNewPostType } from '@/querries/parameter/post-type';
import { CreatePostType, PostTypeSchema } from '@/schema/posts/post';
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
  console.log(errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-xs">
          <Plus size={14} />
          <span>Tipe Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Tipe Post</DialogTitle>
          <DialogDescription>
            Tambahkan tipe post baru untuk kategori artikel Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex gap-2 justify-end mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewPostType;
