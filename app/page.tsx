"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  MessageCircle,
  Plus,
  Send,
  Stethoscope,
  History,
  User,
  Settings,
  LogIn,
  UserPlus,
  Paperclip,
  Bot,
  AlertCircle,
} from "lucide-react"

// Simuler des discussions récentes
const recentChats = [
  { id: 1, title: "Consultation otite", date: "Aujourd'hui" },
  { id: 2, title: "Problème d'audition", date: "Hier" },
  { id: 3, title: "Sinusite chronique", date: "2 jours" },
  { id: 4, title: "Vertiges et acouphènes", date: "3 jours" },
]

// Données du profil médecin (simulées)
const doctorProfile = {
  firstName: "Dr. Aminata",
  lastName: "DIOP",
  email: "aminata.diop@orl-senegal.com",
  avatar: "/placeholder.svg?height=100&width=100",
}

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Erreur de chat:", error)
    },
  })

  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simuler l'état de connexion
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSelectedImages((prev) => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedImages.length > 0) {
      console.log("Images à envoyer:", selectedImages)
    }
    handleSubmit(e)
    setSelectedImages([])
  }

  const startNewChat = () => {
    // Réinitialiser la conversation
    window.location.reload()
  }

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-green-600" />
            <h1 className="font-bold text-lg">ORL Sénégal</h1>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <Button className="w-full mb-4 bg-green-600 hover:bg-green-700" onClick={startNewChat}>
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Nouvelle Discussion</span>
            <span className="sm:hidden">Nouveau</span>
          </Button>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Discussions Récentes</span>
                <span className="sm:hidden">Récentes</span>
              </h3>
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton className="w-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <div className="flex-1 text-left min-w-0">
                        <div className="text-sm font-medium truncate">{chat.title}</div>
                        <div className="text-xs text-gray-500 hidden sm:block">{chat.date}</div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/profile")}>
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Profil Médecin</span>
                <span className="sm:hidden">Profil</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/settings")}>
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Paramètres</span>
                <span className="sm:hidden">Config</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="border-b p-2 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <SidebarTrigger />
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">Assistant IA - Maladies ORL</h2>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Diagnostic et suivi médical au Sénégal
                </p>
              </div>
            </div>

            {/* Boutons de connexion ou profil utilisateur */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={doctorProfile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {doctorProfile.firstName.charAt(0)}
                      {doctorProfile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">
                    {doctorProfile.firstName} {doctorProfile.lastName}
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => router.push("/login")}
                  >
                    <LogIn className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Connexion</span>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                    onClick={() => router.push("/register")}
                  >
                    <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                    <span className="hidden sm:inline">S'inscrire</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <div className="flex items-center justify-center mb-4">
                  <Stethoscope className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mr-2" />
                  <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-medium mb-2">Bienvenue sur la plateforme ORL</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base px-4 mb-4">
                  Décrivez vos symptômes ou téléchargez des images médicales pour obtenir une analyse préliminaire de
                  votre condition ORL.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  <Badge variant="secondary" className="text-xs">
                    Otites
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sinusites
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Troubles auditifs
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Vertiges
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Angines
                  </Badge>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <Card className="max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 bg-red-50 border-red-200">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm sm:text-base">
                      Erreur de connexion à l'assistant IA. Veuillez réessayer.
                    </span>
                  </div>
                </Card>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[85%] sm:max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  )}
                  <Card
                    className={`p-3 sm:p-4 ${
                      message.role === "user" ? "bg-green-600 text-white" : "bg-white border shadow-sm"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm sm:text-base">{message.content}</div>
                  </Card>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[85%] sm:max-w-[80%]">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <Card className="p-3 sm:p-4 bg-white border shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      <span className="text-sm sm:text-base">L'assistant ORL analyse votre demande...</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-2 sm:p-4">
            {selectedImages.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded border"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={onSubmit} className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Décrivez vos symptômes ORL... (ex: douleur d'oreille, nez bouché, mal de gorge)"
                  className="min-h-[40px] max-h-[120px] resize-none pr-10 text-sm sm:text-base"
                  disabled={isLoading}
                  rows={1}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-1 right-1 h-6 w-6 p-0 hover:bg-gray-100"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  title="Ajouter des images médicales"
                >
                  <Paperclip className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>

              <Button
                type="submit"
                size="icon"
                className="bg-green-600 hover:bg-green-700 h-[40px] w-10 sm:h-[44px] sm:w-11"
                disabled={isLoading || (!input.trim() && selectedImages.length === 0)}
                title="Envoyer le message"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-2 text-center px-2">
              ⚠️ Cette plateforme fournit des informations préliminaires. Consultez toujours un professionnel de santé
              pour un diagnostic définitif.
            </p>
          </div>
        </div>
      </SidebarInset>
    </>
  )
}
