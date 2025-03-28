"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Ici, vous implémenteriez la logique pour envoyer un email de réinitialisation
      // Pour l'exemple, nous simulons juste un succès après un délai
      setTimeout(() => {
        setIsSubmitted(true)
        setIsLoading(false)
      }, 1500)
    } catch (error) {
        console.log(error)
      setError("Une erreur s'est produite. Veuillez réessayer.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-center">
            Entrez votre email pour réinitialiser votre mot de passe
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-700">
                Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-800">
            Retour à la connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}