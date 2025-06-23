"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Camera,
  BarChart3,
  Award,
  MapPin,
  Phone,
  Mail,
  Edit,
  Calendar,
  Database,
  Settings,
  Globe,
} from "lucide-react"

// Données du profil médecin (simulées)
const doctorProfile = {
  firstName: "Dr. Aminata",
  lastName: "DIOP",
  email: "aminata.diop@orl-senegal.com",
  phone: "+221 77 123 45 67",
  speciality: "ORL - Chirurgie Cervico-Faciale",
  hospital: "Hôpital Principal de Dakar",
  address: "Dakar, Sénégal",
  experience: "15 ans",
  patients: 1247,
  consultations: 3891,
  rating: 4.8,
  avatar: "/placeholder.svg?height=100&width=100",
}

export default function ProfilePage() {
  const router = useRouter()

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
          <h1 className="text-2xl font-bold">Profil Médecin</h1>
        </div>

        <div className="grid gap-6">
          {/* Informations personnelles */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold">Informations personnelles</h2>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={doctorProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {doctorProfile.firstName.charAt(0)}
                    {doctorProfile.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0" variant="outline">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {doctorProfile.firstName} {doctorProfile.lastName}
                </h3>
                <p className="text-gray-600">{doctorProfile.speciality}</p>
                <Badge variant="secondary" className="mt-2">
                  <Award className="h-3 w-3 mr-1" />
                  {doctorProfile.experience} d'expérience
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{doctorProfile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{doctorProfile.phone}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{doctorProfile.hospital}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span>{doctorProfile.address}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Statistiques */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{doctorProfile.patients}</div>
                <div className="text-sm text-gray-600">Patients suivis</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{doctorProfile.consultations}</div>
                <div className="text-sm text-gray-600">Consultations</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{doctorProfile.rating}/5</div>
                <div className="text-sm text-gray-600">Note moyenne</div>
              </div>
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Planning</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm">Rapports</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Database className="h-6 w-6 mb-2" />
                <span className="text-sm">Patients</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push("/settings")}>
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-sm">Paramètres</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
