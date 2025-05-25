import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/tiptap-utils';
import { CreatePost } from '@/schema/posts/post';
import { useGetCloudinary } from '@/store/cloudinary';
import { CloudinaryUploadResponse } from '@/types/cloudinary';

import axios from 'axios';
import { ImageOff, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'sonner';
import { match } from 'ts-pattern';

interface UploadThnumbnailWithHookForm {
  setValue: UseFormSetValue<CreatePost>;
  setError: UseFormSetError<CreatePost>;
  register: UseFormRegister<CreatePost>;
  errors: FieldErrors<CreatePost>;
  clearErrors: UseFormClearErrors<CreatePost>;
  watch: UseFormWatch<CreatePost>;
  isDisabled?: boolean;
}

const UploadThumbnail = ({
  watch,
  setValue,
  errors,
  isDisabled,
  clearErrors,
}: UploadThnumbnailWithHookForm) => {
  const [progress, setProgress] = useState(0);
  const watchImageThumbanil = watch('featured_image_url');

  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { cloudinary: cloudinarySign } = useGetCloudinary();

  const error = errors.featured_image_url?.message;

  async function handleOnChange(fileList: FileList) {
    setLoading(true);

    if (!fileList) {
      throw new Error('The file input is not found. Make sure you define it on your Form');
    }

    // If no files to submit then just return
    if (!fileList || fileList.length < 1) {
      return;
    }

    if (cloudinarySign === null || cloudinarySign === undefined) {
      toast.error('Currently Bussy, please refresh page');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileList[0]);
    formData.append('api_key', `${cloudinarySign?.apiKey || ''}`);
    formData.append('timestamp', cloudinarySign.timestamp.toString());
    formData.append('signature', cloudinarySign.signature);
    formData.append('folder', 'my-first-folder');
    // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); // You can manipulate image here

    setLoading(true);

    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudinarySign.cloudName}/auto/upload`;

      const { data } = await axios.post<CloudinaryUploadResponse>(url, formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / (data?.total || 1)));
        },
      });

      setValue('featured_image_url', data.secure_url);

      setLoading(false);
      clearErrors('featured_image_url');
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setValue('featured_image_url', '');
      setLoading(false);
    }
  }

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = async (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = e.dataTransfer?.files;

    handleOnChange(files);
  };

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-2">
        <Label
          className={cn('inline gap-2 font-medium ', error ? 'text-destructive' : '')}
          isRequired
        >
          Upload Thumbnail
        </Label>
        <input
          disabled={isDisabled || loading}
          className="hidden"
          readOnly
          data-test="upload-file-input"
          accept="image/*"
          ref={inputFileRef}
          onChange={(e) => {
            const fileList = e?.target?.files;
            if (fileList) {
              handleOnChange(fileList);
            }
          }}
          type="file"
        />
        {match(loading)
          .with(true, () => {
            return (
              <div className="relative" data-test="progress-bar-upload">
                <Progress value={progress - 2} max={100} className="h-8 rounded" color="green" />
                <div className="absolute left-1/2 text-white/90 top-1/2 transform -translate-y-1/2 ">
                  {progress >= 98 ? 98 : progress}%
                </div>
              </div>
            );
          })
          .otherwise(() => {
            return match(!!watchImageThumbanil)
              .with(true, () => {
                return (
                  <div>
                    <AspectRatio ratio={16 / 8} className="bg-muted">
                      <Image
                        src={watchImageThumbanil}
                        alt="Photo by Drew Beamer"
                        fill
                        className="h-full w-full rounded-md object-contain"
                      />
                    </AspectRatio>
                    <Button
                      disabled={isDisabled}
                      type="button"
                      className="w-full mt-2 gap-2"
                      variant="destructive"
                      onClick={() => {
                        setValue('featured_image_url', '');
                      }}
                    >
                      <ImageOff size={15} />
                      Ganti Foto
                    </Button>
                  </div>
                );
              })
              .otherwise(() => {
                return (
                  <div>
                    <button
                      type="button"
                      onDragEnter={handleDragEnter}
                      disabled={loading || isDisabled}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => inputFileRef.current?.click()}
                      className={cn(
                        `w-full mx-auto border-[2px]  rounded-md hover:border-gray-400 transition duration-200 border-dashed flex flex-col justify-center items-center py-[30px] ${
                          dragging && 'border-gray-400 bg-blue-100'
                        }`,
                        !!error ? 'border-red-400 hover:border-red-500' : null,
                      )}
                    >
                      <UploadCloud size={38} className="text-gray-500" />
                      <p className="text-sm font-bold text-gray-500">Upload File Disini</p>
                      <p className="text-xs font-semibold text-gray-500">Format CSV</p>
                      {!!error ? <Label className="text-red-400 mt-2">{error}</Label> : null}
                    </button>
                  </div>
                );
              });
          })}
        {error ? <Label className="text-destructive ">{error}</Label> : null}
      </div>{' '}
    </div>
  );
};

export default UploadThumbnail;
