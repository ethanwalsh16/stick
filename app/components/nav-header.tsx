'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

const AUTH_PATHS = ['/login', '/signup']

export function NavHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  if (AUTH_PATHS.includes(pathname)) return null

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="flex flex-col gap-4 border-b border-zinc-200 py-6 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Stick
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/new" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
          New
        </Link>
        <Link href="/account" className="transition-colors hover:text-zinc-950 dark:hover:text-white">
          Account
        </Link>
        <button
          onClick={handleSignOut}
          className="transition-colors hover:text-zinc-950 dark:hover:text-white"
        >
          Sign out
        </button>
      </nav>
    </header>
  )
}
