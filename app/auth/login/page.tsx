import { AuthForms } from "@/components/AuthForms"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 rounded-lg border bg-card">
        <AuthForms />
      </div>
    </main>
  )
}
