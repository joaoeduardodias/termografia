interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export async function signIn({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> {
  console.log(email, password)

  const result = await fetch('http://localhost:3000/api/fake-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  if (result.ok) {
    const data = await result.json()
    console.log('Token', data.token)
    return data.token
  } else {
    const error = await result.json()
    console.error('Error:', error.message)
    return error
  }
}
