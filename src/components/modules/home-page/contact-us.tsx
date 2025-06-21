import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import LayoutSection from './layout-section';

interface ContactUsProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const ContactUs = ({
  title = 'Hubungi Kami',
  description = 'Kami siap menerima pertanyaan, masukan, atau peluang kolaborasi. Beri tahu kami bagaimana kami dapat membantu!',
  phone = '(123) 34567890',
  email = 'email@example.com',
  web = { label: 'shadcnblocks.com', url: 'https://shadcnblocks.com' },
}: ContactUsProps) => {
  return (
    <LayoutSection containerClassName="">
      <div className="container py-8">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Detail Kontak
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Telepon: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10 bg-background shadow">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">Nama Depan</Label>
                <Input type="text" id="firstname" placeholder="Nama Depan" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Nama Belakang</Label>
                <Input type="text" id="lastname" placeholder="Nama Belakang" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subjek</Label>
              <Input type="text" id="subject" placeholder="Subjek" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Pesan</Label>
              <Textarea placeholder="Ketik pesan Anda di sini." id="message" />
            </div>
            <Button className="w-full">Kirim Pesan</Button>
          </div>
        </div>
      </div>
    </LayoutSection>
  );
};
