import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#020617] text-slate-50 font-sans">

      {/* BACKGROUND BLOBS */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px] z-0" />
      <div className="pointer-events-none absolute bottom-0 right-[20%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px] z-0" />

      {/* LEFT PANEL */}
      <div className="relative z-10 flex w-[42%] flex-col justify-center border-r border-white/5 px-16 xl:px-20">
        <div>
          {/* Brand badge */}
          <span className="mb-4 inline-block rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-blue-400">
            Powered by AI
          </span>

          <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-tight xl:text-6xl">
            MediAgent<span className="text-slate-400">.</span>
          </h1>

          <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-400">
            Experience the future of healthcare scheduling with our
            intelligent, conversational AI assistant.
          </p>

          {/* Cards */}
          <InfoCard
            icon="🚀"
            title="What it does"
            body="Book, check, and cancel appointments using natural language. Seamlessly integrated with clinical workflows."
          />

          <InfoCard icon="⚡" title="How to use">
            <ul className="mt-1 list-disc pl-5 text-sm leading-loose text-slate-400">
              <li>Check real-time slots for any doctor</li>
              <li>Secure your booking in seconds</li>
              <li>Instant cancellations via ID</li>
            </ul>
          </InfoCard>

          <InfoCard icon="💡" title="Try this">
            <div className="mt-2 flex flex-col gap-2">
              <PromptChip text={`"Check slots for Dr. Sharma"`} />
              <PromptChip text={`"Book with Dr. Mehta tomorrow 10am"`} />
            </div>
          </InfoCard>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative z-10 flex w-[58%] items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, body, children }) => (
  <div className="mb-4 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-transform duration-200 hover:-translate-y-0.5">
    <div className="mb-2 flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <h3 className="text-[15px] font-semibold text-slate-100">{title}</h3>
    </div>
    {body && <p className="text-sm leading-relaxed text-slate-400">{body}</p>}
    {children}
  </div>
);

const PromptChip = ({ text }) => (
  <code className="rounded-lg border border-blue-500/20 bg-black/30 px-3 py-2 font-mono text-[13px] text-blue-400">
    {text}
  </code>
);

export default Layout;