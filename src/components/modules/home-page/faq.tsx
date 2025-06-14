import React from 'react';
import LayoutSection from './layout-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
const listFaq = [
  {
    question: 'Apa saja jenis buku yang tersedia di komunitas ini?',
    answer: [
      'Fiksi: seperti novel, cerpen, dan puisi.',
      'Non-fiksi: seperti biografi, sejarah, dan pengembangan diri.',
      'Buku anak-anak dan remaja.',
      'Buku akademik dan referensi.',
      'Komik dan graphic novel.',
    ],
  },
  {
    question: 'Berapa banyak anggota komunitas saat ini?',
    answer: [
      'Hingga saat ini, komunitas kami memiliki lebih dari 10.000 anggota aktif dari seluruh Indonesia.',
    ],
  },
  {
    question: 'Sudah berapa lama komunitas ini berdiri?',
    answer: [
      'Komunitas ini berdiri sejak tahun 2018.',
      'Sudah lebih dari 6 tahun kami aktif mengadakan diskusi, review buku, dan acara literasi.',
    ],
  },
  {
    question: 'Di mana lokasi komunitas ini?',
    answer: [
      'Komunitas ini berbasis di Jakarta, namun terbuka untuk semua orang dari berbagai daerah.',
      'Kami juga memiliki chapter lokal di kota-kota besar seperti Bandung, Surabaya, dan Yogyakarta.',
    ],
  },
  {
    question: 'Apa keuntungan bergabung dengan komunitas ini?',
    answer: [
      'Bisa berbagi dan berdiskusi tentang buku favorit dengan sesama pecinta buku.',
      'Mendapatkan rekomendasi buku dari berbagai genre.',
      'Mengikuti event seperti bedah buku, tantangan membaca, dan workshop menulis.',
      'Kesempatan mendapatkan buku gratis melalui program giveaway dan review.',
    ],
  },
  {
    question: 'Apakah ada biaya untuk bergabung?',
    answer: [
      'Tidak, bergabung dengan komunitas ini gratis.',
      'Namun, beberapa acara atau workshop tertentu mungkin memiliki biaya pendaftaran.',
    ],
  },
];

const Faq = () => {
  return (
    <LayoutSection>
      <div>
        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-[#F5F5F5] py-4">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-primary text-center">
              Tanya jawab
            </CardTitle>
            <CardDescription className="text-center">
              <span>pertanyaan yang sering ditanyakan</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-16">
            <div className="md:w-3/4 w-full mx-auto">
              <Accordion type="single" collapsible>
                {listFaq.map((fat) => {
                  return (
                    <AccordionItem value={fat.question} key={fat.question}>
                      <AccordionTrigger className="md:text-lg text-sm text-start">
                        {fat.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside p-2 text-start md:text-md text-sm">
                          {fat.answer.map((answer) => {
                            return <li key={answer}>{answer}</li>;
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
            <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-white shadow p-4 text-center md:rounded-xl md:p-6 lg:p-8 mt-16">
              <div className="relative">
                <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
                  <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
                  <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <Avatar className="mb-4 size-16 border md:mb-5">
                  <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
              </div>
              <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
                Pertanyaan anda masi belum terjawab?
              </h3>
              <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
                silahkan kirimkan pertanyaan anda melalui email
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Button className="w-full sm:w-auto" asChild>
                  <a href="mailto:support@komunitasliterasi.com" target="_blank">
                    Kirim pertanyaan
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutSection>
  );
};

export default Faq;
