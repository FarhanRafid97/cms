import { CompleteInput } from '@/components/common/complete-input';
import { CompleteTextArea } from '@/components/common/complete-text-area';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdatePostType } from '@/querries/parameter/post-type';
import { PostType, UpdatePostType, UpdatePostTypeSchema } from '@/schema/paramter/post-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const EditPostType = ({
  row,
  open,
  setOpen,
}: {
  row: PostType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePostType>({
    resolver: zodResolver(UpdatePostTypeSchema),
    defaultValues: {
      id: row.id,
      created_at: row.created_at,
      name: row.name || '',
      description: row.description || '',
    },
  });
  const { mutateAsync: updatePostType, isPending } = useUpdatePostType();

  const onSubmit = async (data: UpdatePostType) => {
    const response = await updatePostType(data);
    if (response) {
      setOpen(false);
      reset();
    }
  };
  console.log(errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tipe Post</DialogTitle>
          <DialogDescription>Edit tipe post untuk kategori artikel Anda.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CompleteInput
            label="id Post Type"
            isRequired
            disabled={true}
            error={errors.name?.message}
            {...register('id')}
          />
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

export default EditPostType;
