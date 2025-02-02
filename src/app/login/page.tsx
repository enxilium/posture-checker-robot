import { AuthForms } from "@/components/AuthForms"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 rounded-lg border bg-card">
        <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
        <AuthForms />
      </div>
    </main>
  )
}
