import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from '@/components/ui/button'

export function Nav() {
  const { user, isLoading } = useUser()

  return (
    <nav>
      {!isLoading && (
        <>
          {user ? (
            <Button asChild>
              <a href="/api/auth/logout">Log Out</a>
            </Button>
          ) : (
            <Button asChild>
              <a href="/api/auth/login">Log In</a>
            </Button>
          )}
        </>
      )}
    </nav>
  )
}
