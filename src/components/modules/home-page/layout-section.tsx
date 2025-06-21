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
    <section className={cn('w-full border-custome-bottom md:px-0 px-3', className)}>
      <div
        className={cn(
          `container mx-auto lg:px-8 border-custome-x max-w-6xl py-8 px-3 ${containerClassName}`,
        )}
      >
        {children}
      </div>
    </section>
  );
}
