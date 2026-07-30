'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Shield } from 'lucide-react'
import { useEffect } from 'react'

export default function LegalShell({ title, eyebrow, updated, children }) {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <div className="relative min-h-screen bg-space text-white overflow-x-hidden">
      {/* Ambient layers (same as home) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="stars absolute inset-0 opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* Nav */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-32px)] max-w-5xl">
        <div className="glass rounded-full pl-4 pr-2 py-2 flex items-center justify-between neon-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow" />
            <span className="font-display font-bold text-white tracking-tight">FocusPath</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link href="/privacy" className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/5">Privacy</Link>
            <Link href="/terms" className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/5">Terms</Link>
            <Link href="/#contact" className="px-3 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/5">Contact</Link>
          </div>
          <Link href="/" className="h-9 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="glass border border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest rounded-full px-3 py-1 flex items-center gap-1">
              <Shield className="w-3 h-3" /> {eyebrow}
            </span>
            {updated && <span className="text-[10px] font-mono text-white/40 tracking-widest">Updated {updated}</span>}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold neon-text leading-tight">{title}</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 glass-strong neon-border rounded-3xl p-6 md:p-10 holo"
        >
          <div className="prose-legal space-y-6 text-white/80">
            {children}
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap gap-3 justify-between items-center text-xs font-mono text-white/40">
          <Link href="/" className="text-cyan-300 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Return to FocusPath
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-cyan-300">Privacy</Link>
            <Link href="/terms" className="hover:text-cyan-300">Terms</Link>
            <Link href="/#contact" className="hover:text-cyan-300">Contact</Link>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .prose-legal h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.35rem; font-weight: 600; color: white; margin-top: 1.75rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .prose-legal h2::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 999px; background: linear-gradient(135deg, #00d4ff, #a855f7); box-shadow: 0 0 8px rgba(0,212,255,0.7); }
        .prose-legal p { line-height: 1.7; color: rgba(255,255,255,0.72); }
        .prose-legal ul { list-style: none; padding-left: 0; }
        .prose-legal ul li { position: relative; padding-left: 1.25rem; line-height: 1.7; color: rgba(255,255,255,0.72); }
        .prose-legal ul li::before { content: '▸'; position: absolute; left: 0; top: 0; color: #00d4ff; font-size: 0.7rem; top: 0.4rem; }
        .prose-legal strong { color: white; font-weight: 600; }
        .prose-legal a { color: #67e8f9; text-decoration: underline; text-underline-offset: 3px; }
        .prose-legal a:hover { color: white; }
        .prose-legal .callout { background: linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08)); border-left: 3px solid #00d4ff; padding: 1rem 1.25rem; border-radius: 0.75rem; color: rgba(255,255,255,0.9); font-style: italic; }
      `}</style>
    </div>
  )
}
