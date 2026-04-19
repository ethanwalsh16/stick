'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const supabase = createClient()

	const handleSignInWithPassword = async () => {
		setLoading(true)
		setError(null)

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setError(error.message)
			setLoading(false)
			return
		}

		router.push('/home')
	}

	return (
		<div>
			<h1>Create Account</h1>
		

		<input
			type="email"
			placeholder="Email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
		/>
		<input
			type="password"
			placeholder="Password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
		/>

		{error && <p>{error}</p>}

		<button onClick={handleSignInWithPassword} disabled={loading}>
			{loading ? 'Logging in...' : 'Sign up'}
		</button>

		<p>
			Already have an account? <a href="/login">Log in</a>
		</p>

		</div>
	)
}