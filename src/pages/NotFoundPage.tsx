import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { buttonClass } from '@/components/ui/buttonClass';

export function NotFoundPage({ message }: { message?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-5xl font-bold text-muted">404</p>
      <h1 className="text-xl font-semibold">{t('notFound.title')}</h1>
      <p className="text-muted">{message ?? t('notFound.body')}</p>
      <Link to="/" className={buttonClass('primary')}>
        {t('notFound.home')}
      </Link>
    </div>
  );
}
