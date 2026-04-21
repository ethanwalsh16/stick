'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async () => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/home')
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <p className="italic text-2xl font-medium uppercase tracking-widest text-zinc-400">
            Stick
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to Stick.</h1>
          <p className="text-sm text-zinc-500">Sign up to continue</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium uppercase tracking-widest">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-600 px-3 py-2 text-sm outline-none transition-colors bg-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium uppercase tracking-widest">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-600 px-3 py-2 text-sm outline-none transition-colors bg-zinc-50 placeholder:text-zinc-500 focus:border-zinc-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            onClick={handleSignUp}
            disabled={loading || !email || !password}
            className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm bg-linear-to-r from-teal-600 to-teal-700 font-medium hover:cursor-pointer hover:ring-inset hover:ring-2 hover:ring-zinc-700 text-white transition-opacity disabled:opacity-40"
          >
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </div>

        <p className="text-center text-sm text-zinc-900">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-zinc-700 underline-offset-4 hover:underline hover:cursor-pointer">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
