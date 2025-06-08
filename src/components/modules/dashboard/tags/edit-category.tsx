import { CompleteInput } from '@/components/common/complete-input';
import { CompleteTextArea } from '@/components/common/complete-text-area';
import { Button } from '@/components/ui/button';
import ColorPicker from '@/components/ui/color-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapperContent,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useUpdateCategory } from '@/querries/parameter/category';
import { Category, UpdateCategory, UpdateCategorySchema } from '@/schema/paramter/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { match, P } from 'ts-pattern';

const EditCategory = ({
  row,
  open,
  setOpen,
}: {
  row: Category;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategory>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: row.id.toString(),
      name: row.name || '',
      description: row.description || '',
      color: row.color || '',
      slug: row.slug || '',
    },
  });
  const { mutateAsync: updateCategory, isPending } = useUpdateCategory();

  const onSubmit = async (data: UpdateCategory) => {
    const isNothingDifferent = match(data)
      .with(
        {
          id: P.when((id) => id === row.id),
          name: P.when((name) => name === row.name),
          description: P.when((desc) => desc === row.description),
          color: P.when((color) => color === row.color),
        },
        () => true,
      )
      .otherwise(() => false);

    if (isNothingDifferent) {
      toast.info('Tidak ada perubahan');
      setOpen(false);
      return;
    }
    const response = await updateCategory({
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
            <CompleteTextArea
              label="Deskripsi Tipe Post"
              isRequired
              disabled={isPending}
              error={errors.description?.message}
              {...register('description')}
            />
            <div className="grid grid-cols-1 items-center gap-2">
              <Label>Warna Kategori</Label>{' '}
              <ColorPicker
                value={getValues('color')}
                error={errors.color?.message}
                handleColorChange={(value) => {
                  console.log(value);
                  setValue('color', value);
                }}
              />{' '}
            </div>
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

export default EditCategory;
