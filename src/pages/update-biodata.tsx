'use client';

import { CompleteInput } from '@/components/common/complete-input';
import { CompleteTextArea } from '@/components/common/complete-text-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/Auth';
import { defaultAvatarSelect } from '@/lib/options-default';
import { useInsertBiodataUser } from '@/querries/user/user';
import { CreateAuthor, CreateAuthorSchema } from '@/schema/user/author';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Camera, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function FormBiodata() {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<{ id: string; name: string; path: string }>({
    id: '',
    name: '',
    path: '',
  });

  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<CreateAuthor>({
    resolver: zodResolver(CreateAuthorSchema),
    values: {
      email: user.session?.user.email || '',
      first_name: user.detail_user?.first_name || '',
      last_name: user.detail_user?.last_name || '',
      bio: user.detail_user?.bio || '',
      social_links: {},
      username: user.detail_user?.username || '',
      avatar_url: user.detail_user?.avatar_url || '',
      user_id: user.session?.user.id || '',
      role_id: user.detail_user?.role_id || 2,
    },
  });

  const { mutateAsync: insertBiodataUser, isPending } = useInsertBiodataUser();

  const onSubmit = async (payload: CreateAuthor) => {
    const response = await insertBiodataUser(payload);
    if (response) {
      toast.success('Biodata berhasil diubah');

      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    }
  };
  return (
    <div className="flex items-center justify-center p-10">
      <div className="sm:mx-auto w-2/4">
        <h3 className="text-2xl font-semibold text-foreground dark:text-foreground">Isi Biodata</h3>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground">
          Isi biodata Anda untuk memudahkan penggunaan aplikasi
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            {/* avatar section */}
            <div className="col-span-full">
              <div className="flex flex-col items-center space-y-4 p-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Profile Photo</h2>
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      disabled={isPending}
                      variant="outline"
                      className={`relative h-24 w-24 rounded-full p-0 ${
                        errors.avatar_url ? 'ring-2 ring-red-400' : ''
                      }`}
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage src={selectedAvatar.path} alt={selectedAvatar.name} />
                        <AvatarFallback>
                          <User className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <Camera className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-4" isContentWidthAuto={false}>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-3">Pilih Avatar Tersedia</h3>
                        <div className="grid grid-cols-4 gap-3">
                          {defaultAvatarSelect.map((avatar) => (
                            <Button
                              key={avatar.id}
                              type="button"
                              variant="outline"
                              className={`h-16 w-16 p-0 rounded-full ${
                                selectedAvatar.id === avatar.id ? 'ring-2 ring-primary' : ''
                              }`}
                              onClick={() => {
                                setSelectedAvatar(avatar);
                                setValue('avatar_url', avatar.path);
                                clearErrors('avatar_url');
                              }}
                            >
                              <Avatar className="h-full w-full">
                                <AvatarImage
                                  src={avatar.path || '/placeholder.svg'}
                                  alt={avatar.name}
                                />
                                <AvatarFallback>
                                  <User className="h-6 w-6" />
                                </AvatarFallback>
                              </Avatar>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* <div>
                        <Label htmlFor="photo-upload" className="font-medium">
                          Upload Your Own
                        </Label>
                        <div className="mt-2">
                          <Label
                            htmlFor="photo-upload"
                            className="flex items-center justify-center w-full h-12 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            <span className="text-sm">Click to upload</span>
                          </Label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </div> */}
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Klik kamera icon untuk mengubah foto profil
                  </p>
                  {errors.avatar_url && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <AlertCircle size={14} className="text-red-400" />
                      <Label className="text-red-400">{errors.avatar_url.message}</Label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* avatar section */}
            <div className="col-span-full">
              <CompleteInput
                disabled={isPending}
                {...register('username')}
                label="Username"
                placeholder="Username"
                error={errors.username?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
              <CompleteInput
                disabled={isPending}
                {...register('first_name')}
                label="Nama Depan"
                placeholder="Nama Depan"
                error={errors.first_name?.message}
              />
              <CompleteInput
                disabled={isPending}
                {...register('last_name')}
                label="Nama Belakang"
                placeholder="Nama Belakang"
                error={errors.last_name?.message}
              />
            </div>
            <div className="col-span-full">
              <CompleteInput
                disabled={isPending}
                {...register('email')}
                label="Email"
                placeholder="Email"
                error={errors.email?.message}
              />
            </div>
            <div className="col-span-full">
              <CompleteTextArea
                disabled={isPending}
                {...register('bio')}
                label="Bio"
                placeholder="Bio"
                error={errors.bio?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
              <CompleteInput
                disabled={isPending}
                {...register('social_links.twitter')}
                label="Twitter"
                placeholder="https://twitter.com/@username"
                error={errors.social_links?.twitter?.message}
              />
              <CompleteInput
                disabled={isPending}
                {...register('social_links.facebook')}
                label="Facebook"
                placeholder="https://facebook.com/@username"
                error={errors.social_links?.facebook?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
              <CompleteInput
                disabled={isPending}
                {...register('social_links.instagram')}
                label="Instagram"
                placeholder="https://instagram.com/@username"
                error={errors.social_links?.instagram?.message}
              />
              <CompleteInput
                disabled={isPending}
                {...register('social_links.tiktok')}
                label="Tiktok"
                placeholder="https://tiktok.com/@username"
                error={errors.social_links?.tiktok?.message}
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              className="whitespace-nowrap"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="whitespace-nowrap" disabled={isPending}>
              Submit {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
