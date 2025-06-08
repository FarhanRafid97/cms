import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogWrapperContent,
} from '@/components/ui/alert-dialog';
import React, { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';

import { CompleteInput } from '@/components/common/complete-input';
import { Button } from '@/components/ui/button';
import { MESSAGE_FIELD_REQUIRED } from '@/lib/constant';

import { useDeleteCategory } from '@/querries/parameter/category';
import { Category } from '@/schema/paramter/category';
import { Loader2 } from 'lucide-react';

const VERIFY_DELETE_CATEGORY = 'Delete Kategori';
const DeleteCategory = ({
  isOpen,
  setIsOpen,
  row,
}: {
  row: Category;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setErrror] = useState('');
  const [value, setValue] = useState('');

  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = () => {
    if (value.length === 0) {
      setErrror(MESSAGE_FIELD_REQUIRED);
      return;
    }
    if (value !== VERIFY_DELETE_CATEGORY) {
      setErrror('Input tidak sesuai dengan verifikasi');
      return;
    }
    deleteCategory(row.id.toString());
    setIsOpen(false);
    setValue('');
  };
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent
          onCloseAutoFocus={() => {
            setErrror('');
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                Kategori <span className="font-bold text-destructive"> {`"${row.name}"`}</span> akan
                dihapus secara permanen dari database. pastikan anda yakin untuk menghapus tipe post
                ini.
              </span>
            </AlertDialogDescription>

            <Alert className="bg-destructive/10 border-destructive/20 ">
              <AlertDescription className="text-destructive text-sm">
                <span className="font-semibold">Warning : </span>
                <span>Action ini tidak dapat dibatalkan.</span>
              </AlertDescription>
            </Alert>
          </AlertDialogHeader>
          <AlertDialogWrapperContent>
            <CompleteInput
              error={error}
              value={value}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleDelete();
                }
              }}
              onChange={(e) => {
                setErrror('');
                setValue(e.target.value);
              }}
              label={
                <span className="font-[300]">
                  Untuk Verifikasi, Masukan{' '}
                  <span className="font-semibold">{VERIFY_DELETE_CATEGORY}</span> di bawah
                </span>
              }
            />
          </AlertDialogWrapperContent>
          <AlertDialogFooter className="flex sm:justify-between">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              disabled={isPending}
              type="submit"
              className="gap-2"
              variant="destructive"
              onClick={() => {
                handleDelete();
              }}
            >
              Hapus {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCategory;
