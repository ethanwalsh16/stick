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
    <header className="flex flex-col gap-4 border-b border-zinc-700 py-6 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/home" className="italic text-2xl font-medium uppercase tracking-widest text-zinc-900">
        Stick
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-4 text-md text-zinc-600">
        <Link href="/new" className="transition-colors hover:text-zinc-950 ">
          New
        </Link>
        <Link href="/account" className="transition-colors hover:text-zinc-950">
          Account
        </Link>
        <button
          onClick={handleSignOut}
          className="hover:cursor-pointer transition-colors hover:text-zinc-950"
        >
          Sign out
        </button>
      </nav>
    </header>
  )
}
