import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, MessageCircle, Users } from 'lucide-react';
import LayoutSection from './layout-section';

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

export default function StatCard() {
  return (
    <LayoutSection>
      <div className="relative z-10">
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
