'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function NewPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleCreate = async () => {
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be logged in to create a focus area.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('focus_areas')
      .insert({
        user_id: user.id,
        title,
        description,
        is_active: true,
      })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/home')
  }

  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          New
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          What are you working on?
        </h1>
        <p className="text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Define a specific thing you want to improve. Keep it focused — one swing thought, one area of your game.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="e.g. Keep trail elbow tucked on downswing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            placeholder="Any extra context — what your coach said, what you noticed, what you're trying to feel..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={loading || !title}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-900"
        >
          {loading ? 'Creating...' : 'Create focus area'}
        </button>
      </div>
    </section>
  )
}	