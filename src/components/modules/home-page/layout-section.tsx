import { cn } from '@/lib/utils';

export default function LayoutSection({
  children,
  className = '',
  containerClassName = '',
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section className={cn('w-full py-16 md:py-24 px-2 md:px-0', className)}>
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
