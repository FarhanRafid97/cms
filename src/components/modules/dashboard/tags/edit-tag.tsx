import { CompleteInput } from '@/components/common/complete-input';
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
import { useUpdateTag } from '@/querries/parameter/tags';
import { UpdateCategory } from '@/schema/paramter/category';
import { Tag, UpdateTag, UpdateTagSchema } from '@/schema/paramter/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { match, P } from 'ts-pattern';

const EditTag = ({
  row,
  open,
  setOpen,
}: {
  row: Tag;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTag>({
    resolver: zodResolver(UpdateTagSchema),
    defaultValues: {
      id: row.id.toString(),
      name: row.name || '',
      slug: row.slug || '',
    },
  });
  const { mutateAsync: updateTag, isPending } = useUpdateTag();

  const onSubmit = async (data: UpdateCategory) => {
    const isNothingDifferent = match(data)
      .with(
        {
          id: P.when((id) => id === row.id),
          name: P.when((name) => name === row.name),
        },
        () => true,
      )
      .otherwise(() => false);

    if (isNothingDifferent) {
      toast.info('Tidak ada perubahan');
      setOpen(false);
      return;
    }
    const response = await updateTag({
      ...data,
      slug: data.name?.toLowerCase().replace(/ /g, '-') || '',
    });
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

export default EditTag;
