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
  DialogWrapperContent,
} from '@/components/ui/dialog';
import { useUpdatePostType } from '@/querries/parameter/post-type';
import { PostType, UpdatePostType, UpdatePostTypeSchema } from '@/schema/paramter/post-type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { match, P } from 'ts-pattern';

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
    const isNothingDifferent = match(data)
      .with(
        {
          id: P.when((id) => id === row.id),
          name: P.when((name) => name === row.name),
          description: P.when((desc) => desc === row.description),
        },
        () => true,
      )
      .otherwise(() => false);

    if (isNothingDifferent) {
      toast.info('Tidak ada perubahan');
      setOpen(false);
      return;
    }
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
        <DialogWrapperContent>
          <form id="form-edit-post-type" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          </form>
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
          <Button type="submit" form="form-edit-post-type" disabled={isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostType;
