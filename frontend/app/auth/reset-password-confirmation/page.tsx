"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resetPasswordConfirm, ApiErrorData } from "@/utils/api"

export default function ResetPasswordConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Get uid and token from URL parameters
  const uid = searchParams?.get("uid") || ""
  const token = searchParams?.get("token") || ""
  
  // Validate that we have the required parameters
  useEffect(() => {
    if (!uid || !token) {
      setError("Invalid or expired reset link.")
    }
  }, [uid, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.")
      setIsLoading(false)
      return
    }
    
    // Validate password length
    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.")
      setIsLoading(false)
      return
    }
    
    try {
      await resetPasswordConfirm(
        newPassword,
        confirmPassword,
        token,
        uid
      )
      
      setSuccess(true)
      // Redirect to login after 3 seconds
        router.push("/auth/login")
    } catch (error) {
        console.log(error)
        const errorData = (error as { error: ApiErrorData }).error
        console.log(errorData)
      
      // Handle the JSON parsing error specifically
        if (!errorData) {
        setSuccess(true)
        router.push("/auth/login")
        return
      }

      if(errorData?.token) {
        setError("The reset link is invalid or has expired.")
      } else if (errorData?.new_password) {
        setError(`Password : ${errorData?.new_password[0]}`)
      } else if (errorData?.uid) {
        setError(`UID : ${errorData?.uid[0]}`)  
    } else if(errorData?.non_field_errors) {
        setError(`Erreur : ${errorData?.non_field_errors[0]}`)
      } else {
        setError("An error has occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
          <CardDescription className="text-center">
          Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
              Your password has been successfully reset. You will be redirected to the login page.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={!uid || !token || isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={!uid || !token || isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!uid || !token || isLoading}
              >
                {isLoading ? "Resetting in progress..." : "Reset password"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Return to a{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
              Login page
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}