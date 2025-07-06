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
    <section className={cn('w-full border-custome-bottom px-3', className)}>
      <div
        className={cn(
          `container mx-auto md:px-6 lg:px-0 border-custome-x max-w-7xl py-8 px-0 ${containerClassName}`,
        )}
      >
        {children}
      </div>
    </section>
  );
}
