"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isGithubLoading, setIsGithubLoading] = useState(false)  // Separate loading state for GitHub
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)  // Separate loading state for Google
  const [success, setSuccess] = useState(false)
  const [successG, setSuccessG] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { handleSubmit, formState, setError } = useForm()
  const { isSubmitting } = formState

  const handleGithubLogin = async (data: any) => {
    setIsGithubLoading(true)
    setErrorMessage(null)
    try {
      const result = await signIn('github', { redirectTo: "/dashboard" })
      if (result?.error) {
        console.error("GitHub login failed:", result.error)
        setErrorMessage('Login failed. Try again.')
      } else {
        console.log("Successfully logged in with GitHub")
        setSuccess(true)
      }
    } catch (error) {
      console.error("Unexpected error during GitHub login:", error)
      setErrorMessage('Unexpected error occurred. Try again.')
    } finally {
      setIsGithubLoading(false)
    }
  }

  const handleGoogleLogin = async (data: any) => {
    setIsGoogleLoading(true)
    setErrorMessage(null)
    try {
      const result = await signIn('google', { redirectTo: "/dashboard" })
      if (result?.error) {
        console.error("Google login failed:", result.error)
        setErrorMessage('Login failed. Try again.')
      } else {
        console.log("Successfully logged in with Google")
        setSuccessG(true)
      }
    } catch (error) {
      console.error("Unexpected error during Google login:", error)
      setErrorMessage('Unexpected error occurred. Try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleGithubLogin)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {/* GitHub Login Button */}
                <Button
                  variant="outline"
                  disabled={isSubmitting || isGithubLoading || success} // Disable when GitHub login is loading
                  className="w-full"
                  type="submit"
                >
                  {isGithubLoading || success ? (
                    <svg
                      className="animate-spin h-5 w-5 text-primary mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4V1L8 5l4 4V6h4v5l4-4-4-4z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <GithubIcon />
                  )}
                  {isGithubLoading || success ? "Logging in..." : "Login with Github"}
                </Button>

                {/* Google Login Button */}
                <Button
                  variant="outline"
                  disabled={isSubmitting || isGoogleLoading || successG} // Disable when Google login is loading
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  {isGoogleLoading || successG ? (
                    <svg
                      className="animate-spin h-5 w-5 text-primary mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 mr-2"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {isGoogleLoading || successG ? "Logging in..." : "Login with Google"}
                </Button>
              </div>
            </div>
          </form>

          {/* Error message display */}
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">
              <p>{errorMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
