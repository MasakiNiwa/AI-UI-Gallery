export default function Demo() {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-slate-900 p-6">
      <style>{`
        @keyframes demo-drift-a { 50% { transform: translate(40px, 30px) scale(1.1); } }
        @keyframes demo-drift-b { 50% { transform: translate(-50px, -20px) scale(0.9); } }
      `}</style>
      <div
        className="absolute top-[10%] left-[15%] size-56 rounded-full bg-indigo-400/70 blur-2xl"
        style={{ animation: 'demo-drift-a 9s ease-in-out infinite' }}
      />
      <div
        className="absolute right-[12%] bottom-[8%] size-64 rounded-full bg-teal-300/60 blur-2xl"
        style={{ animation: 'demo-drift-b 11s ease-in-out infinite' }}
      />
      <div
        className="absolute top-[45%] left-[45%] size-40 rounded-full bg-rose-300/60 blur-2xl"
        style={{ animation: 'demo-drift-a 13s ease-in-out infinite reverse' }}
      />
      <div className="relative w-full max-w-xs rounded-3xl border border-white/30 bg-white/15 p-6 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/30 text-xl font-semibold">
            AK
          </div>
          <div>
            <p className="text-lg font-semibold">Aki Kato</p>
            <p className="text-sm text-white/75">Product Designer</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/85">
          Designing calm interfaces and tiny delightful details. Based in Kyoto.
        </p>
        <div className="mt-5 flex gap-2">
          <button className="flex-1 rounded-xl bg-white/90 py-2 text-sm font-medium text-slate-900">
            Follow
          </button>
          <button className="flex-1 rounded-xl border border-white/40 py-2 text-sm font-medium">
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
