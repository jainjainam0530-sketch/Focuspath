'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { toast } from 'sonner'
import {
  Download, MessageCircleQuestion, Sparkles, Send, X, Mic, MicOff,
  Rocket, Brain, Target, TrendingUp, Compass, LineChart, ChevronRight,
  Instagram, Linkedin, MessageSquare, Mail, Github, Play, Bug, Lightbulb,
  UserRound, Shield, FileText, Info, ArrowUpRight, Zap, Cpu, Star,
  BookOpen, Trophy, Clock, Users, Code2, Waves, Bot, Volume2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

/* =========================================================
   BOOT SEQUENCE
   ========================================================= */
const BOOT_LINES = [
  { t: 'Initializing FocusPath...', d: 700 },
  { t: 'Connecting AI Mentor...', d: 700 },
  { t: 'Loading Student Intelligence System...', d: 800 },
  { t: 'Preparing Your Future...', d: 800 },
]

function BootScreen({ onDone }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cancelled = false
    async function run() {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return
        setStep(i)
        setProgress(((i + 1) / BOOT_LINES.length) * 100)
        await new Promise(r => setTimeout(r, BOOT_LINES[i].d))
      }
      await new Promise(r => setTimeout(r, 400))
      if (!cancelled) onDone()
    }
    run()
    return () => { cancelled = true }
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-space flex items-center justify-center overflow-hidden"
    >
      <div className="stars absolute inset-0 opacity-70" />
      <div className="scan-line" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        {/* Emblem */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mx-auto mb-10 relative w-32 h-32"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-400 opacity-30 blur-2xl animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-cyan-400/40 pulse-ring" />
          <div className="absolute inset-8 rounded-full glass-strong flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl font-bold neon-text mb-2"
        >
          FocusPath
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm font-mono tracking-widest uppercase mb-10"
        >
          Student Intelligence System v1.0.7
        </motion.p>

        {/* Boot lines */}
        <div className="space-y-2 mb-10 font-mono text-sm text-left max-w-md mx-auto">
          {BOOT_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= step ? 1 : 0.2, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className={i < step ? 'text-cyan-400' : i === step ? 'text-purple-400' : 'text-white/30'}>
                {i < step ? '✓' : i === step ? '▸' : '○'}
              </span>
              <span className={i <= step ? (i === step ? 'text-white typing-cursor' : 'text-white/70') : 'text-white/30'}>
                {line.t}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 neon-glow"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* =========================================================
   FOCUS AI AVATAR + CHAT
   ========================================================= */
function FocusAvatar({ open, setOpen }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 1 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 1 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = (e) => {
      // gentle attraction offset from cursor for a "guardian" feel
      const cx = e.clientX
      const cy = e.clientY
      const w = window.innerWidth
      const h = window.innerHeight
      // Position it near cursor but constrained to bottom-right region as a guide
      const targetX = Math.min(w - 100, Math.max(20, cx - 40))
      const targetY = Math.min(h - 100, Math.max(20, cy + 60))
      x.set(targetX)
      y.set(targetY)
    }
    // Initial position bottom-right
    x.set(window.innerWidth - 120)
    y.set(window.innerHeight - 140)
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y])

  return (
    <motion.button
      onClick={() => setOpen(!open)}
      style={{ x: sx, y: sy, position: 'fixed', top: 0, left: 0, zIndex: 60 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="focus:outline-none group"
      aria-label="Talk to FOCUS AI"
    >
      <div className="relative w-16 h-16">
        {/* Outer pulse rings */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
        <div className="absolute inset-0 rounded-full pulse-ring" />
        {/* Orbital ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-cyan-400/40"
          style={{ borderStyle: 'dashed' }}
        />
        {/* Core */}
        <div className="absolute inset-2 rounded-full glass-strong flex items-center justify-center holo neon-glow">
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400/40 to-purple-500/40" />
          <Bot className="relative z-10 w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(0,212,255,0.9)]" />
        </div>
        {/* Label bubble */}
        {!open && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
            Talk to FOCUS
          </div>
        )}
      </div>
    </motion.button>
  )
}

function FocusChatPanel({ open, setOpen }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello, I'm FOCUS. Welcome to FocusPath. Let's discover what you're capable of becoming. ✨ What's on your mind today — a career, a subject, or a goal?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())))
  const scrollRef = useRef(null)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading])

  const send = useCallback(async (text) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    const newMsgs = [...messages, { role: 'user', content }]
    setMessages(newMsgs)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/focus/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs.map(m => ({ role: m.role, content: m.content })), sessionId })
      })
      const data = await res.json()
      const reply = data.reply || 'Signal received.'
      setMessages(m => [...m, { role: 'assistant', content: reply }])
      // Optional TTS
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.__focusVoice) {
        const u = new SpeechSynthesisUtterance(reply)
        u.rate = 1.05; u.pitch = 1.1
        window.speechSynthesis.speak(u)
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Interference detected. Try once more — I\'m here.' }])
    } finally {
      setLoading(false)
    }
  }, [input, messages, loading, sessionId])

  const startVoice = () => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { toast.error('Voice not supported in this browser'); return }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return }
    const r = new SR()
    r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 1
    r.onresult = (e) => {
      const text = e.results[0][0].transcript
      setInput(text)
      setListening(false)
      send(text)
    }
    r.onerror = () => setListening(false)
    r.onend = () => setListening(false)
    recognitionRef.current = r
    r.start()
    setListening(true)
  }

  const quickPrompts = [
    'What career suits me?',
    'How do I stay focused?',
    "I'm stressed about exams",
    'Analyze my strengths',
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-[70] w-[min(420px,calc(100vw-24px))] h-[min(600px,calc(100vh-100px))] glass-strong neon-border rounded-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3 relative">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center neon-glow">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold text-white flex items-center gap-2">FOCUS <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-400/30 text-[10px]">AI MENTOR</Badge></div>
              <div className="text-[11px] font-mono text-white/50">Neural link active</div>
            </div>
            <button
              onClick={() => { window.__focusVoice = !window.__focusVoice; toast(window.__focusVoice ? 'Voice ON' : 'Voice OFF') }}
              className="p-2 rounded-lg hover:bg-white/5 text-white/60"
              aria-label="Toggle voice output"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-white/60" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-400/30 text-white rounded-br-sm'
                    : 'glass text-white/90 rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full glass hover:bg-white/10 text-cyan-200 border border-cyan-400/20"
                >{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex gap-2 items-center">
            <button
              onClick={startVoice}
              className={`p-2.5 rounded-xl border ${listening ? 'bg-red-500/20 border-red-400/40 text-red-300' : 'glass border-white/10 text-white/60'}`}
              aria-label="Voice input"
            >
              {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Ask FOCUS anything..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Button onClick={() => send()} disabled={loading || !input.trim()} className="bg-gradient-to-br from-cyan-500 to-purple-600 hover:opacity-90 border-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* =========================================================
   FLOATING ACTION STACK (persistent CTAs)
   ========================================================= */
function FloatingActions({ setChatOpen, setModal }) {
  const [expanded, setExpanded] = useState(false)
  const actions = [
    { id: 'download', label: 'Download FocusPath', icon: Download, color: 'from-cyan-400 to-blue-500', onClick: () => { window.open(APK_URL, '_blank'); fetch('/api/downloads', { method: 'POST' }); toast.success('Downloading FocusPath v1.0.7') } },
    { id: 'bug', label: 'Report a Problem', icon: Bug, color: 'from-rose-400 to-red-500', onClick: () => setModal('bug') },
    { id: 'idea', label: 'Suggest a Feature', icon: Lightbulb, color: 'from-amber-400 to-orange-500', onClick: () => setModal('idea') },
    { id: 'community', label: 'Join Community', icon: Users, color: 'from-emerald-400 to-teal-500', onClick: () => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'founder', label: 'Contact Founder', icon: UserRound, color: 'from-purple-400 to-pink-500', onClick: () => setModal('founder') },
  ]
  return (
    <div className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
      {actions.map((a, i) => (
        <motion.button
          key={a.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.08 }}
          onClick={a.onClick}
          onMouseEnter={() => setExpanded(a.id)}
          onMouseLeave={() => setExpanded(false)}
          className="group flex items-center gap-2"
        >
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.color} p-[1px] neon-glow`}>
            <div className="w-full h-full rounded-[11px] bg-black/70 backdrop-blur-xl flex items-center justify-center">
              <a.icon className="w-4.5 h-4.5 text-white" />
            </div>
          </div>
          <AnimatePresence>
            {expanded === a.id && (
              <motion.span
                initial={{ opacity: 0, x: -8, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -8, width: 0 }}
                className="glass px-3 py-1.5 rounded-lg text-xs whitespace-nowrap text-white overflow-hidden"
              >{a.label}</motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  )
}

/* =========================================================
   MODAL (feedback / bug / founder)
   ========================================================= */
function Modal({ modal, setModal }) {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [sending, setSending] = useState(false)

  if (!modal) return null
  const config = {
    bug: { title: 'Report a Problem', hint: 'Describe the issue you encountered. Screenshots welcome via community links.', type: 'bug' },
    idea: { title: 'Suggest a Feature', hint: 'What would make FocusPath even more magical for you?', type: 'feature' },
    founder: { title: 'Contact the Founder', hint: 'Send a message directly to Jainam. He reads every one.', type: 'founder' },
  }[modal]

  async function submit() {
    if (!message.trim()) { toast.error('Please write a message'); return }
    setSending(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: config.type, message, name, contact })
      })
      toast.success('Received by the FocusPath Intelligence Network')
      setMessage(''); setName(''); setContact('')
      setModal(null)
    } catch {
      toast.error('Transmission failed. Try again.')
    } finally { setSending(false) }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => setModal(null)}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
        className="glass-strong neon-border rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{config.title}</h3>
            <p className="text-sm text-white/50 mt-1">{config.hint}</p>
          </div>
          <button onClick={() => setModal(null)} className="p-1 rounded hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-3">
          <Input placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} className="bg-white/5 border-white/10" />
          <Input placeholder="Email or handle (optional)" value={contact} onChange={e => setContact(e.target.value)} className="bg-white/5 border-white/10" />
          <Textarea placeholder="Your message..." rows={5} value={message} onChange={e => setMessage(e.target.value)} className="bg-white/5 border-white/10 resize-none" />
          <Button onClick={submit} disabled={sending} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90">
            {sending ? 'Transmitting...' : 'Send Transmission'} <Send className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* =========================================================
   NAV
   ========================================================= */
function Nav({ setChatOpen }) {
  const items = [
    { label: 'Features', id: 'features' },
    { label: 'Careers', id: 'careers' },
    { label: 'Problem Center', id: 'problem-center' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'APK', id: 'apk' },
    { label: 'Founder', id: 'founder' },
    { label: 'Contact', id: 'contact' },
  ]
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-32px)] max-w-5xl">
      <div className="glass rounded-full pl-4 pr-2 py-2 flex items-center justify-between neon-border">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow" />
          <span className="font-display font-bold text-white tracking-tight">FocusPath</span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {items.map(i => (
            <a key={i.id} href={`#${i.id}`} className="px-3 py-1.5 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
              {i.label}
            </a>
          ))}
        </div>
        <Button onClick={() => setChatOpen(true)} size="sm" className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 border-0 hover:opacity-90">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Talk to FOCUS
        </Button>
      </div>
    </nav>
  )
}

/* =========================================================
   PHONE MOCKUP
   ========================================================= */
function PhoneMockup() {
  const [drag, setDrag] = useState({ x: -12, y: 6 })
  const [dragging, setDragging] = useState(false)
  const startRef = useRef(null)
  const idleRef = useRef(null)

  useEffect(() => {
    // Auto-orbit when idle
    if (dragging) return
    let t = 0
    const id = setInterval(() => {
      t += 0.02
      setDrag(d => ({ x: -12 + Math.sin(t) * 8, y: 6 + Math.cos(t * 0.7) * 4 }))
    }, 40)
    idleRef.current = id
    return () => clearInterval(id)
  }, [dragging])

  const onDown = (e) => {
    const p = e.touches ? e.touches[0] : e
    startRef.current = { x: p.clientX, y: p.clientY, dx: drag.x, dy: drag.y }
    setDragging(true)
  }
  const onMove = (e) => {
    if (!startRef.current) return
    const p = e.touches ? e.touches[0] : e
    const dx = p.clientX - startRef.current.x
    const dy = p.clientY - startRef.current.y
    setDrag({ x: startRef.current.dx + dx * 0.3, y: Math.max(-25, Math.min(25, startRef.current.dy - dy * 0.3)) })
  }
  const onUp = () => { startRef.current = null; setDragging(false) }

  useEffect(() => {
    if (!dragging) return
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, drag])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{ perspective: 1200 }}
      className="relative animate-float select-none"
    >
      {/* Glow behind */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-cyan-500/40 to-purple-600/40 rounded-full" />
      {/* Drag hint */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300/70 tracking-widest whitespace-nowrap z-20 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> DRAG TO ROTATE
      </div>
      <div
        onMouseDown={onDown}
        onTouchStart={onDown}
        className={`relative w-64 h-[520px] rounded-[42px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-2 neon-glow ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ transform: `rotateY(${drag.x}deg) rotateX(${drag.y}deg)`, transition: dragging ? 'none' : 'transform 0.4s ease-out', transformStyle: 'preserve-3d' }}
      >
        <div className="w-full h-full rounded-[36px] bg-black relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          {/* Screen */}
          <div className="absolute inset-0 bg-space p-4 pt-10 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-mono text-white/50">9:41</div>
              <div className="flex gap-1"><div className="w-1 h-1 rounded-full bg-white/60" /><div className="w-1 h-1 rounded-full bg-white/60" /><div className="w-1 h-1 rounded-full bg-cyan-400" /></div>
            </div>
            <div className="text-center mb-4">
              <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Good morning</div>
              <div className="text-white font-display text-lg font-semibold mt-1">Aarav</div>
            </div>
            <div className="glass rounded-2xl p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <div className="text-[10px] font-mono text-white/70">FOCUS says</div>
              </div>
              <div className="text-xs text-white/90 leading-relaxed">You're 78% ready for your JEE mock. Let's target physics next.</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="glass rounded-xl p-2.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400 mb-1" />
                <div className="text-[8px] font-mono text-white/50">STREAK</div>
                <div className="text-white font-display text-sm">14 days</div>
              </div>
              <div className="glass rounded-xl p-2.5">
                <Target className="w-3.5 h-3.5 text-purple-400 mb-1" />
                <div className="text-[8px] font-mono text-white/50">GOAL</div>
                <div className="text-white font-display text-sm">72%</div>
              </div>
            </div>
            <div className="glass rounded-2xl p-3 flex-1">
              <div className="text-[9px] font-mono text-white/50 mb-2">TODAY'S PATH</div>
              {['Physics — Rotational Motion', 'Chemistry — Mole Concept', 'Deep Focus • 45 min'].map((t, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-t border-white/5 first:border-0">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-purple-400' : 'bg-white/30'}`} />
                  <div className="text-[10px] text-white/80">{t}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center">
              <div className="w-10 h-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* =========================================================
   MAIN CONTENT
   ========================================================= */
const APK_URL = 'https://www.mediafire.com/file/gsvrn7y4fo110iv/focuspath-v1_0_7.apk/file'

function Hero({ setChatOpen }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/30 blob" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-purple-600/30 blob" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Badge className="glass border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest mb-6"><Sparkles className="w-3 h-3 mr-1" /> AI-POWERED STUDENT MENTOR</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Meet the <span className="neon-text">AI Mentor</span> Built for the <span className="neon-text">Next Generation.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed"
          >
            FocusPath helps students understand themselves, discover meaningful careers, and stay on track toward their goals — with FOCUS, your AI companion.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={() => { window.open(APK_URL, '_blank'); fetch('/api/downloads', { method: 'POST' }); toast.success('Downloading FocusPath v1.0.7') }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 border-0 rounded-full neon-glow text-white h-12 px-6"
            >
              <Download className="w-4 h-4 mr-2" /> Download APK
            </Button>
            <Button size="lg" variant="outline" onClick={() => setChatOpen(true)} className="glass border-white/20 text-white hover:bg-white/10 rounded-full h-12 px-6">
              <Sparkles className="w-4 h-4 mr-2" /> Talk to FOCUS
            </Button>
            <Button size="lg" variant="ghost" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/80 hover:bg-white/5 rounded-full h-12 px-6">
              <Play className="w-4 h-4 mr-2" /> Watch Demo
            </Button>
            <Button size="lg" variant="ghost" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/80 hover:bg-white/5 rounded-full h-12 px-6">
              <MessageCircleQuestion className="w-4 h-4 mr-2" /> Share Feedback
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex items-center gap-6 text-xs font-mono text-white/40 uppercase tracking-widest">
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live AI</div>
            <div>v1.0.7</div>
            <div>Built in India</div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const [stats, setStats] = useState({ studentsGuided: 3184, careersSuggested: 6521, goalsCompleted: 12408, hoursSaved: 28741 })
  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [])
  const items = [
    { icon: Users, label: 'Students Guided', value: stats.studentsGuided, color: 'from-cyan-400 to-blue-500' },
    { icon: Compass, label: 'Career Paths Suggested', value: stats.careersSuggested, color: 'from-purple-400 to-pink-500' },
    { icon: Target, label: 'Goals Completed', value: stats.goalsCompleted, color: 'from-emerald-400 to-teal-500' },
    { icon: Clock, label: 'Hours Saved', value: stats.hoursSaved, color: 'from-amber-400 to-orange-500' },
  ]
  return (
    <section className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <motion.div key={it.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="glass neon-border rounded-2xl p-5 relative holo">
            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${it.color} flex items-center justify-center mb-3`}>
              <it.icon className="w-4 h-4 text-white" />
            </div>
            <Counter value={it.value} className="font-display text-2xl md:text-3xl font-bold neon-text" />
            <div className="text-xs font-mono text-white/50 uppercase tracking-widest mt-1">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Counter({ value, className }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf; const start = performance.now(); const dur = 1600
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.floor(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <div className={className}>{display.toLocaleString()}</div>
}

const FEATURES = [
  { icon: Compass, title: 'AI Career Guidance', desc: 'FOCUS decodes your interests, subjects, and personality to reveal careers that truly fit — not the ones everyone else picks.', color: 'from-cyan-400 to-blue-500' },
  { icon: Brain, title: 'Strength & Weakness Analysis', desc: 'A neural map of what you\'re naturally brilliant at, and where a little push transforms you.', color: 'from-purple-400 to-pink-500' },
  { icon: Rocket, title: 'Personalized Learning Paths', desc: 'Your syllabus, reordered by AI around your rhythm, pace, and target exam. No two paths look alike.', color: 'from-emerald-400 to-teal-500' },
  { icon: Target, title: 'Goal Tracking', desc: 'Micro-goals, streaks, checkpoints. See yourself getting closer to the person you\'re becoming.', color: 'from-amber-400 to-orange-500' },
  { icon: LineChart, title: 'Student Growth Dashboard', desc: 'Every insight, every win, every gap — visualized like mission control for your future.', color: 'from-rose-400 to-red-500' },
  { icon: TrendingUp, title: 'Future Career Insights', desc: 'Live data on emerging fields, salaries, skills. Ride the next wave before it becomes obvious.', color: 'from-indigo-400 to-violet-500' },
]

function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <SectionHeader eyebrow="CAPABILITIES" title={<>Six systems, <span className="neon-text">one mentor.</span></>} subtitle="FocusPath isn't a productivity app. It's the neural architecture behind every student's clearest decisions." />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
        {FEATURES.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="group relative glass neon-border rounded-2xl p-6 hover:-translate-y-1 transition-transform holo">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 neon-glow`}>
              <f.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display text-xl font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Badge className="glass border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest">{eyebrow}</Badge>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 leading-tight">{title}</h2>
        {subtitle && <p className="mt-4 text-white/60 text-lg">{subtitle}</p>}
      </motion.div>
    </div>
  )
}

/* Career map */
const CAREERS = [
  { name: 'AI Engineer', x: 20, y: 30, tag: 'HIGH DEMAND' },
  { name: 'Doctor', x: 50, y: 15, tag: 'CLASSIC' },
  { name: 'Product Designer', x: 78, y: 28, tag: 'CREATIVE' },
  { name: 'Robotics', x: 15, y: 65, tag: 'EMERGING' },
  { name: 'Data Scientist', x: 40, y: 55, tag: 'FAST-GROW' },
  { name: 'Content Creator', x: 68, y: 62, tag: 'NEW-AGE' },
  { name: 'Space Engineer', x: 30, y: 82, tag: 'FRONTIER' },
  { name: 'Biotech', x: 60, y: 82, tag: 'FUTURE' },
]

function CareerMap({ setChatOpen }) {
  const [active, setActive] = useState(null)
  return (
    <section id="careers" className="relative py-24 px-6">
      <SectionHeader eyebrow="CAREER GALAXY" title={<>Explore the <span className="neon-text">universe of futures.</span></>} subtitle="Hover a star to reveal what it takes to get there. Then ask FOCUS to draw your path." />
      <div className="max-w-5xl mx-auto mt-12 relative">
        <div className="relative aspect-[16/10] glass neon-border rounded-3xl overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="stars absolute inset-0 opacity-70" />
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {CAREERS.map((c, i) => CAREERS.slice(i + 1).filter((_, j) => (i + j) % 3 === 0).map((c2, j) => (
              <line key={`${i}-${j}`} x1={c.x} y1={c.y} x2={c2.x} y2={c2.y} stroke="rgba(0,212,255,0.15)" strokeWidth="0.15" />
            )))}
          </svg>
          {CAREERS.map((c, i) => (
            <button
              key={c.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setChatOpen(true)}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow" />
                <div className="absolute inset-0 rounded-full pulse-ring" />
                <div className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap transition-all ${active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <div className="glass px-3 py-1.5 rounded-lg text-xs">
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="font-mono text-[9px] text-cyan-400 tracking-widest">{c.tag}</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
          <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-full text-[10px] font-mono text-white/60 tracking-widest">
            ▸ CLICK ANY STAR TO ASK FOCUS
          </div>
        </div>
      </div>
    </section>
  )
}

/* Problem center */
function ProblemCenter() {
  const [category, setCategory] = useState('career')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [sending, setSending] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  async function submit() {
    if (!message.trim()) { toast.error('Please share what\'s on your mind'); return }
    setSending(true)
    try {
      await fetch('/api/problems', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ category, message, name, contact }) })
      setConfirmed(true)
      setMessage(''); setName(''); setContact('')
      setTimeout(() => setConfirmed(false), 5000)
    } catch { toast.error('Transmission failed') } finally { setSending(false) }
  }

  const categories = [
    { id: 'career', label: 'Career Confusion', icon: Compass },
    { id: 'academic', label: 'Academic Struggle', icon: BookOpen },
    { id: 'focus', label: 'Productivity / Focus', icon: Zap },
    { id: 'future', label: 'Future Questions', icon: Rocket },
  ]

  return (
    <section id="problem-center" className="relative py-24 px-6">
      <SectionHeader eyebrow="PROBLEM CENTER" title={<>Tell us what's <span className="neon-text">holding you back.</span></>} subtitle="Every submission is read. Every voice shapes what FOCUS learns next." />
      <div className="max-w-3xl mx-auto mt-12 glass-strong neon-border rounded-3xl p-6 md:p-8 holo">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCategory(c.id)}
              className={`p-3 rounded-xl border transition-all ${category === c.id ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 neon-glow' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
              <c.icon className={`w-5 h-5 mx-auto mb-1 ${category === c.id ? 'text-cyan-300' : 'text-white/60'}`} />
              <div className={`text-[10px] font-mono uppercase tracking-widest ${category === c.id ? 'text-white' : 'text-white/50'}`}>{c.label}</div>
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <Input placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} className="bg-white/5 border-white/10" />
          <Input placeholder="Email or handle (optional)" value={contact} onChange={e => setContact(e.target.value)} className="bg-white/5 border-white/10" />
        </div>
        <Textarea placeholder="Share what's on your mind. Career, studies, focus, future — anything." rows={5} value={message} onChange={e => setMessage(e.target.value)} className="bg-white/5 border-white/10 resize-none mb-4" />
        <Button onClick={submit} disabled={sending} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 h-12 rounded-xl">
          {sending ? 'Transmitting to FocusPath...' : 'Send to FocusPath Intelligence'} <Send className="w-4 h-4 ml-2" />
        </Button>
        <AnimatePresence>
          {confirmed && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm text-center">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Your message has been received by the FocusPath Intelligence Network.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

/* APK Center */
function ApkCenter() {
  const [downloads, setDownloads] = useState(1247)
  useEffect(() => { fetch('/api/stats').then(r => r.json()).then(d => setDownloads(d.downloads)).catch(() => {}) }, [])

  const versions = [
    { v: '1.0.7', date: 'Current', notes: 'AI mentor stability, career map v2, faster boot.' },
    { v: '1.0.5', date: 'Last month', notes: 'Introduced FOCUS voice interactions.' },
    { v: '1.0.0', date: 'Launch', notes: 'First public release. The journey begins.' },
  ]
  const steps = [
    'Tap the Download APK button below',
    'Open the file from your Downloads',
    'Allow installation from unknown sources if prompted',
    'Launch FocusPath and meet FOCUS',
  ]

  async function download() {
    window.open(APK_URL, '_blank')
    const r = await fetch('/api/downloads', { method: 'POST' })
    const d = await r.json()
    setDownloads(d.count || downloads + 1)
    toast.success('FocusPath v1.0.7 downloading')
  }

  return (
    <section id="apk" className="relative py-24 px-6">
      <SectionHeader eyebrow="APK CENTER" title={<>Get FocusPath on <span className="neon-text">your device.</span></>} subtitle="Direct APK. No app store. No middleman. Just the future, delivered." />
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 glass-strong neon-border rounded-3xl p-6 md:p-8 holo relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-400/30 font-mono text-[10px]">LATEST</Badge>
              <h3 className="font-display text-3xl font-bold mt-3">FocusPath v1.0.7</h3>
              <p className="text-white/60 text-sm mt-1">Android APK • ~18 MB</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow flex items-center justify-center animate-float">
              <Rocket className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="glass rounded-xl p-3">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Downloads</div>
              <div className="font-display text-xl font-bold neon-text mt-1">{downloads.toLocaleString()}</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Rating</div>
              <div className="font-display text-xl font-bold text-white mt-1 flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Android</div>
              <div className="font-display text-xl font-bold text-white mt-1">8.0+</div>
            </div>
          </div>
          <Button onClick={download} size="lg" className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white text-base neon-glow">
            <Download className="w-5 h-5 mr-2" /> Download FocusPath APK
          </Button>
          <div className="mt-6">
            <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest mb-3">Installation Steps</div>
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/80">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-[10px] flex items-center justify-center font-mono text-white flex-shrink-0 mt-0.5">{i+1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="glass neon-border rounded-3xl p-6">
          <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest mb-4">Version History</div>
          <div className="space-y-4">
            {versions.map(v => (
              <div key={v.v} className="border-l-2 border-cyan-400/30 pl-3">
                <div className="flex items-center gap-2">
                  <div className="font-display font-semibold text-white">v{v.v}</div>
                  <div className="text-[10px] font-mono text-white/40">{v.date}</div>
                </div>
                <div className="text-xs text-white/60 mt-1">{v.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Founder */
function Founder({ setModal }) {
  const timeline = [
    { year: '2020', title: 'Started Coding', desc: 'Wrote his first line of code at 11 — a simple calculator that changed everything.' },
    { year: '2023', title: 'Built FocusPath', desc: 'While preparing for competitive exams, sketched the earliest version of an AI mentor for students.' },
    { year: '2024', title: 'Built a Student Community', desc: 'Rallied thousands of students who wanted more than tutorials — they wanted clarity.' },
    { year: '2025+', title: 'Impact Millions', desc: 'Bringing FocusPath to every student who has ever asked, "what am I capable of?"' },
  ]
  return (
    <section id="founder" className="relative py-24 px-6">
      <SectionHeader eyebrow="THE FOUNDER" title={<>Built by a student, <span className="neon-text">for students.</span></>} subtitle="Meet Jainam. 16 years old. India. Preparing for the exams that define his generation — while building the mentor he wished he had." />
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-2 relative">
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-cyan-400 opacity-40 blur-3xl animate-pulse" />
            <div className="absolute inset-6 rounded-full border border-cyan-400/40 pulse-ring" />
            <div className="absolute inset-10 rounded-full glass-strong holo neon-glow flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-7xl font-bold neon-text">J</div>
                <div className="text-xs font-mono text-white/50 tracking-widest mt-2">JAINAM • FOUNDER</div>
                <div className="text-[10px] font-mono text-cyan-400 tracking-widest mt-1">AGE 16 • INDIA</div>
              </div>
            </div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-cyan-400/20" />
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="text-white/80 text-lg leading-relaxed">
            "I built FocusPath because <span className="text-cyan-300">I was the student it's built for.</span> Between coaching classes, mock tests, and a hundred voices telling me what to do, I couldn't hear what I actually wanted.
          </p>
          <p className="text-white/60 mt-4 leading-relaxed">
            So I started writing code. Then I built something. Then I gave it away to my friends. Then they asked their friends. FocusPath is what happened when I stopped waiting for someone to build the mentor students deserve."
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => setModal('founder')} className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 border-0 rounded-full">
              <Mail className="w-4 h-4 mr-2" /> Message Jainam
            </Button>
          </div>

          <div className="mt-10 space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-cyan-400 before:via-purple-500 before:to-transparent">
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="pl-8 relative">
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow" />
                <div className="font-mono text-[10px] text-cyan-400 tracking-widest">{t.year}</div>
                <div className="font-display font-semibold text-white text-lg">{t.title}</div>
                <div className="text-sm text-white/60">{t.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* =========================================================
   REVIEWS WALL — real submissions, live
   ========================================================= */
function ReviewsWall() {
  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/reviews')
      const d = await r.json()
      setReviews(d.reviews || [])
      setTotal(d.total || 0)
      setAverage(d.average || 0)
    } catch {} finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  async function submit() {
    if (!message.trim()) { toast.error('Please share your thoughts'); return }
    setSending(true)
    try {
      const r = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Anonymous', role, rating, message })
      })
      const d = await r.json()
      if (d.ok) {
        toast.success('Review posted ✨')
        setMessage(''); setName(''); setRole(''); setRating(5)
        setReviews(prev => [d.review, ...prev])
        setTotal(t => t + 1)
        setAverage(a => {
          const newTotal = total + 1
          return Math.round(((a * total) + d.review.rating) / newTotal * 10) / 10
        })
      } else {
        toast.error(d.error || 'Failed to post')
      }
    } catch { toast.error('Transmission failed') } finally { setSending(false) }
  }

  function timeAgo(iso) {
    const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
    if (s < 60) return 'just now'
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    if (s < 2592000) return `${Math.floor(s/86400)}d ago`
    return new Date(iso).toLocaleDateString()
  }
  const initials = (n) => (n || 'A').trim().split(/\s+/).map(w => w[0]).join('').slice(0,2).toUpperCase()

  return (
    <section id="reviews" className="relative py-24 px-6">
      <SectionHeader
        eyebrow="STUDENT VOICES"
        title={<>Reviews from <span className="neon-text">real students.</span></>}
        subtitle="Every review below was posted by a student. Yours appears the moment you send it."
      />

      <div className="max-w-3xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-sm">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={`w-4 h-4 ${i <= Math.round(average) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
            ))}
          </div>
          <span className="font-display font-semibold text-white">{(average || 0).toFixed(1)}</span>
          <span className="text-white/40 font-mono text-xs">avg</span>
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm text-white/70">
          <span className="font-display font-semibold text-white">{total.toLocaleString()}</span> {total === 1 ? 'review' : 'reviews'}
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm text-emerald-300 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live wall
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-5 gap-4">
        <div className="md:col-span-2 glass-strong neon-border rounded-2xl p-6 holo self-start md:sticky md:top-24">
          <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mb-2">Leave a review</div>
          <h3 className="font-display text-xl font-semibold text-white mb-4">How was FocusPath for you?</h3>

          <div className="mb-4">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Rating</div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                <button
                  key={i}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(i)}
                  className="p-1 transition-transform hover:scale-110"
                  aria-label={`${i} star`}
                >
                  <Star className={`w-7 h-7 transition-colors ${i <= (hover || rating) ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <Input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="bg-white/5 border-white/10" />
            <Input placeholder="Class / role (opt)" value={role} onChange={e => setRole(e.target.value)} className="bg-white/5 border-white/10" />
          </div>
          <Textarea
            placeholder="Tell us what worked, what didn't, or what surprised you..."
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="bg-white/5 border-white/10 resize-none mb-2"
            maxLength={500}
          />
          <div className="text-[10px] font-mono text-white/30 mb-3 text-right">{message.length}/500</div>
          <Button
            onClick={submit}
            disabled={sending}
            className="w-full h-11 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-xl"
          >
            {sending ? 'Posting...' : 'Post my review'} <Send className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-[10px] font-mono text-white/30 mt-3 text-center">Your review appears instantly on this wall.</p>
        </div>

        <div className="md:col-span-3 space-y-3 min-h-[400px]">
          {loading && (
            <div className="glass rounded-2xl p-6 text-center text-white/50 text-sm">Loading student voices...</div>
          )}
          {!loading && reviews.length === 0 && (
            <div className="glass-strong neon-border rounded-2xl p-8 text-center holo">
              <Sparkles className="w-8 h-8 mx-auto text-cyan-400 mb-3" />
              <div className="font-display text-lg font-semibold text-white mb-1">Be the first voice</div>
              <div className="text-sm text-white/60">No reviews yet. Post yours and start the wall.</div>
            </div>
          )}
          <AnimatePresence initial={false}>
            {reviews.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="glass neon-border rounded-2xl p-5 holo relative"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-sm font-display font-bold text-white flex-shrink-0 neon-glow">
                    {initials(r.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div>
                        <div className="font-display font-semibold text-white text-sm">{r.name}</div>
                        {r.role && <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">{r.role}</div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-white/15'}`} />
                          ))}
                        </div>
                        <div className="text-[10px] font-mono text-white/40">{timeAgo(r.createdAt)}</div>
                      </div>
                    </div>
                    <p className="text-sm text-white/80 mt-2 leading-relaxed whitespace-pre-wrap">{r.message}</p>
                    {r.focusReply && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-3 ml-1 relative"
                      >
                        <div className="absolute -left-1 top-2 w-3 h-3 rotate-45 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-l border-t border-cyan-400/25" />
                        <div className="glass rounded-xl px-3 py-2.5 border border-cyan-400/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                              <Bot className="w-2.5 h-2.5 text-white" />
                            </div>
                            <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">FOCUS replied</span>
                          </div>
                          <p className="text-xs text-white/75 leading-relaxed">{r.focusReply}</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* Community */
function Community() {
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const socials = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'from-pink-500 to-purple-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'from-blue-500 to-cyan-500' },
    { name: 'Discord', icon: MessageSquare, url: 'https://discord.com', color: 'from-indigo-500 to-purple-500' },
    { name: 'WhatsApp', icon: MessageCircleQuestion, url: 'https://whatsapp.com', color: 'from-emerald-500 to-teal-500' },
  ]
  async function subscribe() {
    if (!email.includes('@')) { toast.error('Enter a valid email'); return }
    setSubscribing(true)
    try {
      await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      toast.success('Welcome to the FocusPath frequency')
      setEmail('')
    } catch { toast.error('Failed to subscribe') } finally { setSubscribing(false) }
  }
  return (
    <section id="community" className="relative py-24 px-6">
      <SectionHeader eyebrow="COMMUNITY" title={<>Join the <span className="neon-text">FocusPath frequency.</span></>} subtitle="Students, dreamers, and future-builders. Tune in wherever you already are." />
      <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-3">
          {socials.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
              className="glass neon-border rounded-2xl p-5 hover:-translate-y-1 transition-all holo group">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 neon-glow`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-display font-semibold text-white">{s.name}</div>
              <div className="text-xs text-white/50 mt-1 flex items-center gap-1">Follow <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></div>
            </a>
          ))}
        </div>
        <div className="glass-strong neon-border rounded-2xl p-6 holo relative flex flex-col justify-center">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4 neon-glow">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-white">The Weekly Signal</h3>
          <p className="text-sm text-white/60 mt-1 mb-4">One email a week. Career insights, study science, and updates from FOCUS. No noise.</p>
          <div className="flex gap-2">
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@future.com" className="bg-white/5 border-white/10" />
            <Button onClick={subscribe} disabled={subscribing} className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 border-0">
              {subscribing ? '...' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Demo section (simple) */
function Demo({ setChatOpen }) {
  return (
    <section id="demo" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto glass-strong neon-border rounded-3xl p-10 md:p-16 text-center holo relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/20 blob" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/20 blob" style={{ animationDelay: '3s' }} />
        <Badge className="glass border-cyan-400/30 text-cyan-300 font-mono text-[10px] tracking-widest relative z-10"><Waves className="w-3 h-3 mr-1" /> LIVE DEMO</Badge>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 relative z-10">See FOCUS <span className="neon-text">in action.</span></h2>
        <p className="mt-4 text-white/60 relative z-10 max-w-xl mx-auto">The best demo is a conversation. Ask FOCUS anything — a career question, a study problem, or just say hello.</p>
        <Button onClick={() => setChatOpen(true)} size="lg" className="mt-8 h-14 px-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 neon-glow relative z-10">
          <Sparkles className="w-5 h-5 mr-2" /> Start a conversation with FOCUS
        </Button>
      </div>
    </section>
  )
}

/* =========================================================
   CONTACT SECTION
   ========================================================= */
function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  async function submit() {
    if (!name.trim()) { toast.error('Please enter your name'); return }
    if (!email.includes('@')) { toast.error('Please enter a valid email'); return }
    if (!message.trim()) { toast.error('Please write your message'); return }
    setSending(true)
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      const d = await r.json()
      if (d.ok) {
        toast.success(d.message || 'Message received.')
        setName(''); setEmail(''); setMessage('')
      } else {
        toast.error(d.error || 'Failed to send')
      }
    } catch { toast.error('Transmission failed. Try again.') } finally { setSending(false) }
  }

  const socials = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: 'from-pink-500 to-purple-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'from-blue-500 to-cyan-500' },
    { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'from-slate-400 to-slate-600' },
  ]

  return (
    <section id="contact" className="relative py-24 px-6">
      <SectionHeader
        eyebrow="CONTACT"
        title={<>Reach the <span className="neon-text">FocusPath team.</span></>}
        subtitle="Questions, partnerships, or just a hello — Jainam reads every message himself."
      />

      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-5 gap-4">
        {/* Info card */}
        <div className="md:col-span-2 glass-strong neon-border rounded-2xl p-6 md:p-7 holo relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-500/20 blob" />
          <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mb-2">Direct line</div>
          <h3 className="font-display text-2xl font-semibold text-white">The Founder</h3>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-display text-lg font-bold text-white neon-glow flex-shrink-0">J</div>
            <div>
              <div className="font-display font-semibold text-white">Jainam</div>
              <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest">Founder • FocusPath</div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <a href="mailto:focus@focuspath.ai" className="glass rounded-xl px-3 py-2.5 flex items-center gap-3 hover:bg-white/10 transition-colors">
              <Mail className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Email</div>
                <div className="text-white truncate">focus@focuspath.ai</div>
              </div>
            </a>
            <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Response time</div>
                <div className="text-white">We aim to respond within 48 hours</div>
              </div>
            </div>
            <div className="glass rounded-xl px-3 py-2.5 flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div>
                <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Based in</div>
                <div className="text-white">India • Serving students worldwide</div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Find us on</div>
            <div className="flex gap-2">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} p-[1px] neon-glow hover:scale-105 transition-transform`}>
                  <div className="w-full h-full rounded-[11px] bg-black/70 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3 glass-strong neon-border rounded-2xl p-6 md:p-8 holo">
          <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest mb-2">Send a message</div>
          <h3 className="font-display text-2xl font-semibold text-white mb-5">Write to the FocusPath team</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Name</label>
              <Input aria-label="Your name" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="bg-white/5 border-white/10 mt-1" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email</label>
              <Input aria-label="Your email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="bg-white/5 border-white/10 mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Message</label>
            <Textarea aria-label="Your message" rows={6} value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help? Share your question, idea, or feedback in as much detail as you like." className="bg-white/5 border-white/10 resize-none mt-1" maxLength={2000} />
            <div className="text-[10px] font-mono text-white/30 text-right mt-1">{message.length}/2000</div>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <p className="text-[11px] text-white/50 max-w-sm">
              By sending, you agree to our <a href="/privacy" className="text-cyan-300 hover:text-white underline underline-offset-2">Privacy Policy</a> and <a href="/terms" className="text-cyan-300 hover:text-white underline underline-offset-2">Terms</a>.
            </p>
            <Button onClick={submit} disabled={sending} className="h-11 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-xl">
              {sending ? 'Sending...' : 'Send message'} <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Footer */
function Footer() {
  const socials = [
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'GitHub', icon: Github, url: 'https://github.com' },
    { name: 'Discord', icon: MessageSquare, url: 'https://discord.com' },
  ]
  return (
    <footer className="relative py-16 px-6 border-t border-white/5 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 neon-glow" />
              <div>
                <div className="font-display font-bold text-white text-lg">FocusPath</div>
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Guiding Every Student</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              An AI-powered student mentor built with care from India for students everywhere. Discover your strengths, choose your path, build your future.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}
                  className="w-9 h-9 rounded-lg glass hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
                  <s.icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Product</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="text-white/70 hover:text-cyan-300 transition-colors">Features</a></li>
              <li><a href="/#careers" className="text-white/70 hover:text-cyan-300 transition-colors">Career Map</a></li>
              <li><a href="/#reviews" className="text-white/70 hover:text-cyan-300 transition-colors">Student Voices</a></li>
              <li><a href="/#apk" className="text-white/70 hover:text-cyan-300 transition-colors">Download APK</a></li>
              <li><a href="/#founder" className="text-white/70 hover:text-cyan-300 transition-colors">Founder</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Legal & Support</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-white/70 hover:text-cyan-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white/70 hover:text-cyan-300 transition-colors">Terms of Service</a></li>
              <li><a href="/#contact" className="text-white/70 hover:text-cyan-300 transition-colors">Contact Us</a></li>
              <li><a href="mailto:focus@focuspath.ai" className="text-white/70 hover:text-cyan-300 transition-colors">focus@focuspath.ai</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-white/40">
          <div>&copy; 2026 FocusPath. All Rights Reserved.</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> System operational</span>
            <span className="hidden md:inline">Made with ❤ in India</span>
            <span>Version 1.0.7</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* Legal modal (static) */
function LegalModal({ modal, setModal }) {
  if (!['privacy', 'terms', 'data'].includes(modal)) return null
  const content = {
    privacy: {
      title: 'Privacy Policy',
      body: 'FocusPath collects only what is necessary to guide you: your messages to FOCUS, your goals, and your engagement. We never sell student data. Ever. All data is encrypted at rest and in transit.',
    },
    terms: {
      title: 'Terms of Service',
      body: 'By using FocusPath, you agree to use it responsibly. FOCUS provides guidance, not professional advice. Always consult trusted mentors, teachers, and family for major life decisions.',
    },
    data: {
      title: 'Data Declaration',
      body: 'What we store: chat history (to improve FOCUS), problem submissions (to prioritize features), and download counters. What we do not store: passwords in plaintext, biometric data, or anything you can’t ask us to delete.',
    },
  }[modal]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setModal(null)}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}
        className="glass-strong neon-border rounded-2xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display text-xl font-semibold text-white">{content.title}</h3>
          <button onClick={() => setModal(null)} className="p-1 rounded hover:bg-white/5"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">{content.body}</p>
      </motion.div>
    </motion.div>
  )
}

/* Mobile FAB (simpler) */
function MobileFAB({ setChatOpen }) {
  return (
    <button onClick={() => setChatOpen(true)}
      className="fixed bottom-6 left-6 md:hidden z-40 h-12 px-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 neon-glow flex items-center gap-2 text-white text-sm font-medium">
      <Sparkles className="w-4 h-4" /> FOCUS
    </button>
  )
}

/* =========================================================
   APP ROOT
   ========================================================= */
function App() {
  const [booting, setBooting] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [modal, setModal] = useState(null)

  useEffect(() => {
    // Fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }, [])

  return (
    <div className="relative min-h-screen bg-space text-white overflow-x-hidden">
      {/* Ambient layers */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="stars absolute inset-0 opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <AnimatePresence>
        {booting && <BootScreen onDone={() => setBooting(false)} />}
      </AnimatePresence>

      {!booting && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Nav setChatOpen={setChatOpen} />
          <FloatingActions setChatOpen={setChatOpen} setModal={setModal} />
          <MobileFAB setChatOpen={setChatOpen} />

          <main className="relative z-10">
            <Hero setChatOpen={setChatOpen} />
            <Stats />
            <Features />
            <CareerMap setChatOpen={setChatOpen} />
            <Demo setChatOpen={setChatOpen} />
            <ProblemCenter />
            <ReviewsWall />
            <ApkCenter />
            <Founder setModal={setModal} />
            <Community />
            <ContactSection />
            <Footer />
          </main>

          <FocusAvatar open={chatOpen} setOpen={setChatOpen} />
          <FocusChatPanel open={chatOpen} setOpen={setChatOpen} />

          <AnimatePresence>
            {['bug', 'idea', 'founder'].includes(modal) && <Modal modal={modal} setModal={setModal} />}
            {['privacy', 'terms', 'data'].includes(modal) && <LegalModal modal={modal} setModal={setModal} />}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

export default App
