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
    <section className={cn('w-full  px-2', className)}>
      <div className={cn(`container mx-auto md:px-6   max-w-7xl py-8 px-4  ${containerClassName}`)}>
        {children}
      </div>
    </section>
  );
}
