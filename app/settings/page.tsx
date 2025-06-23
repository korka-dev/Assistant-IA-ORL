"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Bell, Palette, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()

  const handleLogout = () => {
    console.log("Déconnexion")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Bouton retour en position absolue */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 flex items-center gap-2 text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au chat
      </Button>

      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Notifications par email</Label>
                  <p className="text-sm text-gray-600">Recevoir les alertes par email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Notifications push</Label>
                  <p className="text-sm text-gray-600">Notifications en temps réel</p>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">Notifications SMS</Label>
                  <p className="text-sm text-gray-600">Alertes par SMS pour les urgences</p>
                </div>
                <Switch id="sms-notifications" />
              </div>
            </div>
          </Card>

          {/* Apparence */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Apparence</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select defaultValue="light">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="wo">Wolof</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Sécurité */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Sécurité</h2>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Authentification à deux facteurs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Sessions actives
              </Button>
            </div>
          </Card>

          {/* Données */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold">Données</h2>
            </div>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Exporter mes données
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Supprimer mon compte
              </Button>
            </div>
          </Card>

          {/* Déconnexion */}
          <Card className="p-6 shadow-lg">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
