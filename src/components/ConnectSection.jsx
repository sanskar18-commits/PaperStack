import { useState } from "react";
import { motion } from "framer-motion";

const CONFIG = {
  makerMessage: "Hey there! I'm Sanskar Rautela, a BCA (2025-28) student at Graphic Era Deemed University, Dehradun. I built PaperStack because academic papers shouldn't be hard to find, organize, or share. This is an unofficial, open-source, student-driven space where we can access resources without the usual friction. Let's make exam prep a little less painful!",
  googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfH2304TVnsZrg4dw80OH7XaBeVjOXp_VxCWX31Fw6p5Eq6AA/viewform?usp=publish-editor", // Paper Submission Google Form
  feedbackFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfH2304TVnsZrg4dw80OH7XaBeVjOXp_VxCWX31Fw6p5Eq6AA/viewform?usp=publish-editor", // Feedback Google Form (user can swap this)
  socials: {
    instagram: "https://www.instagram.com/sansi_cpp?igsh=MWNwZ25oNXV3OXZwdw==",
    linkedin: "https://www.linkedin.com/in/sanskar-rautela-85996336b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    x: "https://x.com/RautelaSa",
    telegram: "https://t.me/san_lee0",
    github: "https://github.com/sanskar18-commits",
    repo: "https://github.com/sanskar18-commits/PaperStack"
  }
};

// ── Icons ────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.65-.52.36-1 .53-1.42.52-.47-.01-1.37-.27-2.03-.49-.82-.27-1.47-.42-1.42-.88.03-.24.36-.49.99-.74 3.89-1.69 6.48-2.8 7.78-3.33 3.69-1.51 4.46-1.78 4.96-1.79.11 0 .36.03.52.16.14.12.18.28.2.44.02.13.01.27 0 .36z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const TeaIcon = () => (
  <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h15a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v5a2 2 0 002 2zM20 6.5h1.5a1.5 1.5 0 011.5 1.5v2a1.5 1.5 0 01-1.5 1.5H20M6 4V2m4 2V2m4 2V2" />
  </svg>
);

// ── Reusable Social Link ────────────────────────────────
function SocialLink({ href, label, hoverClass, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`flex items-center justify-center w-11 h-11 rounded-2xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:-translate-y-1 transition-all duration-300 ${hoverClass}`}
    >
      {children}
    </a>
  );
}

// ── Main Section ─────────────────────────────────────────
export default function ConnectSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-10 border-t border-zinc-900 mt-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* CARD 1: Maker Note & Socials */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          id="connect"
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between backdrop-blur-xl transition-colors hover:border-zinc-700 hover:bg-zinc-900/40"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">About the Creator</h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {CONFIG.makerMessage}
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800/50 mt-6 flex items-center justify-start gap-2.5">
            <SocialLink
              href={CONFIG.socials.instagram}
              label="Instagram"
              hoverClass="hover:bg-gradient-to-tr hover:from-[#f9ce3f] hover:via-[#e1306c] hover:to-[#833ab4] hover:text-white hover:border-transparent"
            >
              <InstagramIcon />
            </SocialLink>

            <SocialLink
              href={CONFIG.socials.linkedin}
              label="LinkedIn"
              hoverClass="hover:bg-[#0077b5] hover:text-white hover:border-transparent"
            >
              <LinkedInIcon />
            </SocialLink>

            <SocialLink
              href={CONFIG.socials.x}
              label="X"
              hoverClass="hover:bg-white hover:text-black hover:border-transparent"
            >
              <XIcon />
            </SocialLink>

            <SocialLink
              href={CONFIG.socials.telegram}
              label="Telegram"
              hoverClass="hover:bg-[#229ed9] hover:text-white hover:border-transparent"
            >
              <TelegramIcon />
            </SocialLink>

            <SocialLink
              href={CONFIG.socials.github}
              label="GitHub"
              hoverClass="hover:bg-white hover:text-black hover:border-transparent"
            >
              <GitHubIcon />
            </SocialLink>
          </div>
        </motion.div>

        {/* CARD 2: Submit Question Papers (Google Forms) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          id="contribute"
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between backdrop-blur-xl transition-colors hover:border-zinc-700 hover:bg-zinc-900/40"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">Contribute Papers</h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Help your peers by sharing previous year papers! The collection grows through our community's contributions.
            </p>

            <div className="border border-zinc-800/80 bg-zinc-950/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/35 text-[10px] font-bold text-blue-400 font-mono shrink-0">1</span>
                <span>Click the button below to open the secure Google Form.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/35 text-[10px] font-bold text-blue-400 font-mono shrink-0">2</span>
                <span>Upload your PDF file and submit. Easy as that!</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6 pt-4 border-t border-zinc-800/50">
            <a
              href={CONFIG.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-95 transition-all text-xs shadow-lg shadow-white/5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              Submit via Google Form
            </a>

            <div className="text-center">
              <a
                href={`${CONFIG.socials.repo}/blob/main/CONTRIBUTING.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 hover:text-zinc-300 hover:underline transition font-mono inline-flex items-center gap-1"
              >
                GitHub user? Send a PR instead →
              </a>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: Roast, Toast, or Spill the Tea (Humorous Feedback / GitHub Prompt) */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          id="feedback"
          className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between backdrop-blur-xl transition-colors hover:border-zinc-700 hover:bg-zinc-900/40"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <TeaIcon />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">Roast, Toast, or Spill the Tea</h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Did we save your CGPA? Did you find a broken link? Or do you just want to rant about that one exam syllabus? We are all ears! Spill the tea (or suggest new features) here. We promise not to tell your HOD. 🤫
            </p>
          </div>

          <div className="space-y-3 mt-6 pt-4 border-t border-zinc-800/50">
            <a
              href={CONFIG.feedbackFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all text-xs font-semibold text-white shadow-lg shadow-indigo-500/10"
            >
              Spill the Tea ☕
            </a>

            <div className="text-center pt-1">
              <a
                href={CONFIG.socials.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-zinc-500 hover:text-zinc-300 hover:underline transition font-mono inline-flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
                </svg>
                Love the project? Leave a star on GitHub! ⭐
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}