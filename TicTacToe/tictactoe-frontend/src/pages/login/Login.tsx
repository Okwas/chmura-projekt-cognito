import { useRef, useState } from "react"
import { useAppStore } from "../../stores/app-store"
import { useGameStore } from "../../stores/game-store"
import { useUserStore } from "@/stores/user-store"
import { authenticate } from "@/api/cognito"

export default function Login() {
  const { joinGame, joinGameLoading } = useAppStore()
  const { user, setUser } = useUserStore()
  const { setStage } = useAppStore()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<string>("")

  function onLoginClick() {
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    login(
      email,
      password,
      (user) => {
        setUser(user)
      },
      (error) => {
        setError(error)
      }
    )
  }

  function login(
    email: string,
    password: string,
    onSuccess?: (user: User) => void,
    onError?: (error: string) => void
  ) {
    authenticate(email, password)
      .then((session) => {
        onSuccess &&
          onSuccess({
            email: email,
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken(),
          })
        console.log("success")
        console.log(session)
      })
      .catch((error) => {
        console.log("error")
        console.log(error)
        onError && onError(error.message)
      })
  }

  return (
    <div>
      <div>
        <p>Login </p>
        <input
          type="email"
          placeholder="email"
          defaultValue={"email@test.com"}
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="password"
          defaultValue={"test"}
          ref={passwordRef}
        />
        <button onClick={() => onLoginClick()}>Login</button>
        <p>{error}</p>
        <button onClick={() => setStage("register")}>Go to register</button>
      </div>
      <div className="flex flex-col gap-4">
        <button
          disabled={!user}
          onClick={() => {
            joinGame({ username: user!.email }, user!)
          }}
        >
          Play
        </button>
        {joinGameLoading && <div>Loading...</div>}
      </div>
    </div>
  )
}
