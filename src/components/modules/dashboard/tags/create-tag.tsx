import { CompleteInput } from '@/components/common/complete-input';
import { Button } from '@/components/ui/button';
import ColorPicker from '@/components/ui/color-picker';
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
import { Label } from '@/components/ui/label';
import { useCreateNewTag } from '@/querries/parameter/tags';
import { CreateTag, CreateTagSchema } from '@/schema/paramter/tag';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateNewTag = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateTag>({
    resolver: zodResolver(CreateTagSchema),
  });

  const { mutateAsync: createNewTag, isPending } = useCreateNewTag();

  const onSubmit = async (data: CreateTag) => {
    const response = await createNewTag({
      ...data,
      slug: data.name.toLowerCase().replace(/ /g, '-'),
    });
    if (response) {
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
          <Plus size={14} />
          <span>Tag</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseAutoFocus={() => {
          reset();
        }}
      >
        <DialogHeader>
          <DialogTitle>Tambahkan Tag</DialogTitle>
          <DialogDescription>Tambahkan tag baru untuk artikel Anda.</DialogDescription>
        </DialogHeader>
        <DialogWrapperContent>
          <form id="form-create-post-type" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <CompleteInput
              label="Nama Tag"
              disabled={isPending}
              error={errors.name?.message}
              {...register('name')}
            />
            <div className="grid grid-cols-1 items-center gap-2">
              <Label>Warna Tag</Label>{' '}
              <ColorPicker
                value={getValues('color')}
                error={errors.color?.message}
                handleColorChange={(value) => {
                  setValue('color', value);
                }}
              />{' '}
            </div>
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

export default CreateNewTag;
