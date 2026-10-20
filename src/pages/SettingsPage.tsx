import { Database, Languages, LayoutGrid, Monitor, Moon, Palette, Sun, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionSection } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { SwitchRow } from '@/components/ui/Switch';
import {
  clearAllStoredData,
  useSettings,
  type LanguagePreference,
  type ThemePreference,
} from '@/stores/settings';

/** Language names are shown in their own language so users can always find theirs. */
const LANGUAGE_NAMES: Record<Exclude<LanguagePreference, 'auto'>, string> = {
  en: 'English',
  ja: '日本語',
};

export function SettingsPage() {
  const { t } = useTranslation();
  const settings = useSettings();
  const [cleared, setCleared] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
      <Accordion>
        <AccordionSection value="appearance" title={t('settings.appearance')} icon={Palette}>
          <p className="mb-2 font-medium">{t('settings.theme')}</p>
          <SegmentedControl<ThemePreference>
            label={t('settings.theme')}
            value={settings.theme}
            onChange={(v) => settings.set('theme', v)}
            options={[
              { value: 'system', label: t('settings.themeSystem'), icon: Monitor },
              { value: 'light', label: t('settings.themeLight'), icon: Sun },
              { value: 'dark', label: t('settings.themeDark'), icon: Moon },
            ]}
          />
        </AccordionSection>

        <AccordionSection value="language" title={t('settings.language')} icon={Languages}>
          <label htmlFor="language" className="mb-2 block font-medium">
            {t('settings.languageLabel')}
          </label>
          <select
            id="language"
            value={settings.language}
            onChange={(e) => settings.set('language', e.target.value as LanguagePreference)}
            className="h-10 w-full max-w-xs rounded-xl border border-line bg-surface px-3"
          >
            <option value="auto">{t('settings.languageAuto')}</option>
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-muted">{t('settings.languageHint')}</p>
        </AccordionSection>

        <AccordionSection value="gallery" title={t('settings.gallery')} icon={LayoutGrid}>
          <div className="flex flex-col gap-5">
            <SwitchRow
              label={t('settings.livePreviews')}
              hint={t('settings.livePreviewsHint')}
              checked={settings.livePreviews}
              onCheckedChange={(v) => settings.set('livePreviews', v)}
            />
            <SwitchRow
              label={t('settings.reduceMotion')}
              hint={t('settings.reduceMotionHint')}
              checked={settings.reduceMotion}
              onCheckedChange={(v) => settings.set('reduceMotion', v)}
            />
          </div>
        </AccordionSection>

        <AccordionSection value="data" title={t('settings.data')} icon={Database}>
          <p className="font-medium">{t('settings.clearTitle')}</p>
          <p className="mt-0.5 mb-3 text-muted">{t('settings.clearDescription')}</p>
          <ConfirmDialog
            trigger={
              <Button variant="danger">
                <Trash2 className="size-4" aria-hidden />
                {t('settings.clearButton')}
              </Button>
            }
            title={t('settings.confirmTitle')}
            body={t('settings.confirmBody')}
            cancelLabel={t('settings.cancel')}
            confirmLabel={t('settings.confirm')}
            onConfirm={() => {
              clearAllStoredData();
              setCleared(true);
            }}
          />
          {cleared && (
            <p role="status" className="mt-3 text-success">
              {t('settings.cleared')}
            </p>
          )}
        </AccordionSection>
      </Accordion>
    </div>
  );
}
