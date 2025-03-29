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
      setError("Lien de réinitialisation invalide ou expiré.")
    }
  }, [uid, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      setIsLoading(false)
      return
    }
    
    // Validate password length
    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.")
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
        setError("Le lien de réinitialisation est invalide ou a expiré.")
      } else if (errorData?.new_password) {
        setError(`Mot de passe : ${errorData?.new_password[0]}`)
      } else if (errorData?.uid) {
        setError(`UID : ${errorData?.uid[0]}`)  
    } else if(errorData?.non_field_errors) {
        setError(`Erreur : ${errorData?.non_field_errors[0]}`)
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Réinitialiser votre mot de passe</CardTitle>
          <CardDescription className="text-center">
            Entrez votre nouveau mot de passe ci-dessous
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.
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
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
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
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
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
                {isLoading ? "Réinitialisation en cours..." : "Réinitialiser le mot de passe"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Retourner à la{" "}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
              page de connexion
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}