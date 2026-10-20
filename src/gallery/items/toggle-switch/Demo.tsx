import { useState } from 'react';

const ROWS = [
  { key: 'wifi', label: 'Wi-Fi', desc: 'Connect to nearby networks' },
  { key: 'notify', label: 'Notifications', desc: 'Show alerts on this device' },
  { key: 'dark', label: 'Dark mode', desc: 'Easier on the eyes at night' },
  { key: 'beta', label: 'Beta features', desc: 'Managed by your organization', disabled: true },
];

export default function Demo() {
  const [on, setOn] = useState<Record<string, boolean>>({ wifi: true, notify: false, dark: true });

  return (
    <div className="flex h-full items-center justify-center p-6">
      <ul className="w-full max-w-sm divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {ROWS.map(({ key, label, desc, disabled }) => {
          const checked = Boolean(on[key]);
          return (
            <li key={key}>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => setOn((s) => ({ ...s, [key]: !s[key] }))}
                className="flex w-full items-center gap-4 px-4 py-3.5 text-left disabled:opacity-50"
              >
                <span className="flex-1">
                  <span className="block font-medium">{label}</span>
                  <span className="block text-sm text-muted">{desc}</span>
                </span>
                <span
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${checked ? 'bg-success' : 'bg-surface-3'}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
