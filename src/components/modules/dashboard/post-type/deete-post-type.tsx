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
import { PostType } from '@/schema/paramter/post-type';

import { CompleteInput } from '@/components/common/complete-input';
import { Button } from '@/components/ui/button';
import { MESSAGE_FIELD_REQUIRED } from '@/lib/constant';

const VERIFY_DELETE_POST_TYPE = 'Delete My Project';
const DeletePostType = ({
  isOpen,
  setIsOpen,
  row,
}: {
  row: PostType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [error, setErrror] = useState('');
  const [value, setValue] = useState('');
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
                Tipe post ini akan dihapus secara permanen dari database. Semua artikel yang
                menggunakan tipe post ini juga akan terhapus.
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
              onChange={(e) => {
                setErrror('');
                setValue(e.target.value);
              }}
              label={
                <span className="font-[300]">
                  Untuk Verifikasi, Masukan{' '}
                  <span className="font-semibold">{VERIFY_DELETE_POST_TYPE}</span> di bawah
                </span>
              }
            />
          </AlertDialogWrapperContent>
          <AlertDialogFooter className="flex sm:justify-between">
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              type="submit"
              variant="destructive"
              onClick={() => {
                if (value.length === 0) {
                  setErrror(MESSAGE_FIELD_REQUIRED);
                  return;
                }
                if (value !== VERIFY_DELETE_POST_TYPE) {
                  setErrror('Input tidak sesuai dengan verifikasi');
                  return;
                }
              }}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeletePostType;
