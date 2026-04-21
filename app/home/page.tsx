'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Round = {
  id: string
  course_name: string
  date: string
  score: number
  greens_in_regulation: number
  fairways_hit: number
  fairways_total: number
}

function StatChart({
  data,
  dataKey,
  label,
  color,
  yDomain,
}: {
  data: Round[]
  dataKey: keyof Round
  label: string
  color: string
  yDomain?: [number | 'auto', number | 'auto']
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6">
      <p className="mb-4 text-sm font-medium text-zinc-500">{label}</p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#a1a1aa' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={yDomain ?? ['auto', 'auto']}
            tick={{ fontSize: 11, fill: '#a1a1aa' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '0.75rem',
              border: '1px solid #e4e4e7',
              fontSize: '0.75rem',
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function StatsOverview() {
  const [rounds, setRounds] = useState<Round[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setRounds([])

      const { data } = await supabase
        .from('rounds')
        .select('id, course_name, played_at, score, greens_in_regulation, fairways_hit, fairways_total')
        .eq('user_id', user.id)
        .order('played_at', { ascending: true })

      setRounds(
        (data ?? []).map((r) => ({
          ...r,
          date: new Date(r.played_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        }))
      )
    }
    load()
  }, [])

  if (rounds === null) {
    return <p className="text-sm text-zinc-400">Loading...</p>
  }

  if (rounds.length === 0) {
    return <p className="text-sm text-zinc-400">No data logged yet. Add a round or practice session <Link className="text-zinc-700 underline" href="/track">here</Link>.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatChart data={rounds} dataKey="score" label="Score" color="#18181b" />
      <StatChart
        data={rounds}
        dataKey="greens_in_regulation"
        label="Greens in Regulation"
        color="#16a34a"
        yDomain={[0, 18]}
      />
      <StatChart
        data={rounds}
        dataKey="fairways_hit"
        label="Fairways in Regulation"
        color="#2563eb"
        yDomain={[0, 'auto']}
      />
    </div>
  )
}

export default function Home() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Home
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Welcome to Stick.
        </h1>
        <p className="text-base leading-7 text-zinc-600">
          Track rounds, record practice sessions, and manage focus areas to improve your golf game with habits that stick.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/new">
          <article className="hover:border-zinc-600 hover:bg-zinc-300 rounded-2xl border border-zinc-400 p-6">
            <h2 className="text-lg font-medium">Add a New Focus Area</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Record a new swing thought, move, or part of your game you want to improve.
            </p>
          </article>
        </Link>
        <Link href="/track">
          <article className="hover:border-zinc-600 hover:bg-zinc-300 rounded-2xl border border-zinc-400 p-6">
            <h2 className="text-lg font-medium">Track a session</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Keep track of round scores, golf stats, and practice session details.
            </p>
          </article>
        </Link>
        <Link href="/stats">
          <article className="hover:border-zinc-600 hover:bg-zinc-300 rounded-2xl border border-zinc-400 p-6">
            <h2 className="text-lg font-medium">See stats</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              View your progress over time, stacked up against your goals.
            </p>
          </article>
        </Link>
        <Link href="/account">
          <article className="hover:border-zinc-600 hover:bg-zinc-300 rounded-2xl border border-zinc-400 p-6">
            <h2 className="text-lg font-medium">Account settings</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Modify your user details, profile, home course, and golf stats.
            </p>
          </article>
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">Stats Overview</h2>
        <StatsOverview />
      </div>
    </section>
  )
}
