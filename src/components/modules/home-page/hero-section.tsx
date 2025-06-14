import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LayoutSection from './layout-section';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, MessageCircle, Star, TrendingUp, Calendar } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import TextWraped from './text-wrapped';

// Floating Card Component - Refined styling to align with Shadcn aesthetic
function FloatingCard({
  icon,
  title,
  subtitle,
  className = '',
  classNameIcon,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  className?: string;
  classNameIcon?: string;
}) {
  return (
    <div
      className={`absolute bg-card/95 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-border/60 hover:border-primary/40 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={cn(
            'p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20',
            classNameIcon,
          )}
        >
          {icon}
        </div>
        <div>
          <p className={cn('font-semibold text-sm  text-black-shadow')}>{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
// Stats Card Component - Now uses Shadcn's Card component with color variants
function StatsCard({
  number,
  label,
  icon: Icon,
  variant = 'default',
}: {
  number: string;
  label: string;
  icon: React.ElementType;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}) {
  const variantStyles = {
    default: 'hover:border-primary/40 bg-primary/10 text-primary dark:bg-primary/20',
    primary: 'hover:border-blue-500/40 bg-blue-500/10 text-blue-500 ',
    secondary: 'hover:border-purple-500/40 bg-purple-500/10 text-purple-500 dark:bg-purple-500/20',
    success: 'hover:border-green-500/40 bg-green-500/10 text-green-500 dark:bg-green-500/20',
    warning: 'hover:border-yellow-500/40 bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20',
    danger: 'hover:border-red-500/40 bg-red-500/10 text-red-500 dark:bg-red-500/20',
  };

  return (
    <Card className="text-center transition-colors">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
        <div className={`p-3 rounded-full ${variantStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-3xl font-bold text-black-shadow">{number}</CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground">
          {label}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default function HeroSection() {
  return (
    <LayoutSection>
      <div className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_450px] lg:gap-16 xl:grid-cols-[1fr_550px] items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              {/* Using Shadcn's Badge component */}
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Komunitas Buku Indonesia
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl/none">
                <span className="text-foreground">Temukan Dunia Baru</span>
                <br />
                <span className="text-primary">Melalui Buku</span>
                <br />
                <span className="text-foreground">
                  <TextWraped>Bersama Kami</TextWraped>
                </span>
              </h1>

              <p className="max-w-[600px] text-lg text-muted-foreground leading-relaxed">
                Bergabunglah dengan ribuan pembaca Indonesia untuk berbagi rekomendasi, diskusi
                mendalam, dan menemukan buku-buku terbaik yang akan mengubah cara pandang Anda.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 px-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Mulai Membaca
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 border-border hover:border-primary transition-colors duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Gabung Komunitas
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-6 sm:space-y-0 pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {/* Using Shadcn's Avatar component */}
                  {[...Array(5)].map((_, index) => (
                    <Avatar key={index} className="w-10 h-10 border-2 border-background shadow-md">
                      <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs font-semibold">
                        {String.fromCharCode(65 + index)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="pl-2">
                  <div className="font-bold text-xl text-foreground">12,000+</div>
                  <div className="text-sm text-muted-foreground">anggota aktif</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="pl-2">
                  <div className="font-bold text-xl text-foreground">4.9/5</div>
                  <div className="text-sm text-muted-foreground">rating komunitas</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              {/* Subtle background blur/glow effect */}
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl opacity-50 z-0 animate-pulse"></div>
              <div className="relative z-10">
                <Image
                  src="/home-page/hero-1.png"
                  width="450"
                  height="600"
                  alt="Stack of books in a library with warm lighting"
                  className="mx-auto aspect-[3/4] overflow-hidden rounded-2xl object-cover shadow-md border border-my-blue/10"
                  // Fallback image using placeholder service in case actual image is not found
                />

                <FloatingCard
                  icon={<MessageCircle className="h-6 w-6" />}
                  title="Diskusi Aktif"
                  classNameIcon="text-my-blue bg-my-blue/10"
                  subtitle="500+ diskusi/bulan"
                  className="-bottom-8 -left-8 md:-bottom-12 md:-left-12 border-my-blue hover:border-my-blue/40"
                />

                <FloatingCard
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Buku Terbaru"
                  subtitle="Update mingguan"
                  classNameIcon="text-my-orange bg-my-orange/10"
                  className="-top-8 -right-8 md:-top-12 md:-right-12 border-my-orange hover:border-my-orange/40"
                />

                <FloatingCard
                  icon={<TrendingUp className="h-6 w-6" />}
                  title="Trending Now"
                  classNameIcon="text-my-green bg-my-green/10"
                  subtitle="Sedang populer"
                  className="top-1/3 -left-12 md:top-1/4 md:-left-20 border-my-green hover:border-my-green/40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-border/70">
          <StatsCard number="25K+" variant="primary" label="Buku Direview" icon={BookOpen} />
          <StatsCard number="12K+" variant="secondary" label="Anggota Aktif" icon={Users} />
          <StatsCard number="500+" variant="success" label="Diskusi Bulanan" icon={MessageCircle} />
          <StatsCard number="50+" variant="warning" label="Event Tahunan" icon={Calendar} />
        </div>
      </div>
    </LayoutSection>
  );
}
