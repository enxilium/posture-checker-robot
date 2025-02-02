import { RegisterButton } from './registerButton'

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Your App</h1>
      <RegisterButton />
    </header>
  )
}
