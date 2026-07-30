import './globals.css'
import { Toaster } from 'sonner'

export const metadata = {
  title: 'FocusPath — Guiding Every Student Toward Their Future',
  description: 'FocusPath is an AI-powered student mentor that helps you discover your strengths, choose the right career path, and stay focused on your goals. Built by students, for students.',
  keywords: 'AI mentor, student guidance, career discovery, FocusPath, FOCUS AI, learning paths, student productivity',
  openGraph: {
    title: 'FocusPath — The AI Mentor for the Next Generation',
    description: 'Discover your strengths. Choose your path. Build your future — with FOCUS, your AI mentor.',
    type: 'website',
  },
  icons: {
    icon: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cdefs%3E%3CradialGradient id=%22g%22%3E%3Cstop offset=%220%25%22 stop-color=%22%2300d4ff%22/%3E%3Cstop offset=%22100%25%22 stop-color=%22%23a855f7%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22url(%23g)%22/%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2215%22 fill=%22white%22/%3E%3C/svg%3E'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white overflow-x-hidden">
        {children}
        <Toaster position="top-right" theme="dark" toastOptions={{ style: { background: 'rgba(10,10,20,0.9)', border: '1px solid rgba(0,212,255,0.3)', color: 'white', backdropFilter: 'blur(20px)' } }} />
      </body>
    </html>
  )
}
