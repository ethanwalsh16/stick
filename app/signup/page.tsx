'use client'

import { useState } from 'react'
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

		const { error } = await supabase.auth.signUp({
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

		<button onClick={handleSignUp} disabled={loading}>
        	{loading ? 'Creating account...' : 'Sign up'}
      	</button>

      	<p>
        	Already have an account? <a href="/login">Log in</a>
      	</p>

		</div>
	)
}