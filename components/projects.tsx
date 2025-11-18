"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, FolderKanban, Mail, StickyNote, Bike, FileCode, Gamepad2, Music } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "BombParty",
    description: "Juego multijugador de palabras en tiempo real. Versión Android del popular juego con Jetpack Compose, WebSockets y backend en Ktor.",
    tags: ["Kotlin", "Jetpack Compose", "Ktor", "WebSockets"],
    icon: Gamepad2,
    link: "https://github.com/PauLopNun/bombparty",
    gradient: "from-yellow-500 to-orange-600",
    featured: true,
  },
  {
    title: "MP3 Cover Editor",
    description: "Editor de metadatos ID3 y carátulas para archivos MP3. Interfaz moderna Material Design 3 y gestión eficiente de archivos de audio.",
    tags: ["Kotlin", "Jetpack Compose", "Material 3", "Audio Tagger"],
    icon: Music,
    link: "https://github.com/PauLopNun/MP3-Cover-Editor",
    gradient: "from-pink-500 to-rose-500",
    featured: true,
  },
  {
    title: "FlowBoard",
    description: "Gestión de tareas y eventos en equipo. Un tablero Kanban moderno para gestión de proyectos con Clean Architecture y Material Design 3.",
    tags: ["Kotlin", "Jetpack Compose", "Clean Architecture", "Material 3"],
    icon: FolderKanban,
    link: "https://github.com/PauLopNun/FlowBoard",
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    title: "RenderMail",
    description: "Sistema de gestión de emails con despliegue en la nube. Newsletter responsive con MJML y arquitectura backend moderna.",
    tags: ["JavaScript", "MJML", "Cloud", "REST API"],
    icon: Mail,
    link: "https://github.com/PauLopNun/RenderMail",
    gradient: "from-orange-500 to-red-500",
    featured: false,
  },
  {
    title: "Geskot",
    description: "Disponibilidad de Valenbisi en tiempo real. App nativa en Kotlin con integración de APIs y diseño visual intuitivo.",
    tags: ["Kotlin", "API Integration", "Android", "Real-time"],
    icon: Bike,
    link: "https://github.com/PauLopNun/Geskot",
    gradient: "from-purple-500 to-pink-500",
    featured: false,
  },
  {
    title: "Markdown PDF Workflow",
    description: "Convierte Markdown a PDF profesionales con un solo comando. Scripts automatizados y plantillas listas para usar.",
    tags: ["Shell", "PowerShell", "Automation", "Pandoc"],
    icon: FileCode,
    link: "https://github.com/PauLopNun/markdown-pdf-workflow",
    gradient: "from-gray-500 to-slate-500",
    featured: false,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Proyectos Destacados</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Una selección de mis trabajos más recientes en desarrollo móvil, backend y automatización.
          </p>
        </motion.div>

        {/* Improved project cards with better visual design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={project.featured ? "md:col-span-1" : ""}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 group overflow-hidden bg-card/50 backdrop-blur relative">
                {/* Added animated gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                
                {/* Added gradient header */}
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <project.icon className="h-6 w-6 text-white" />
                    </div>
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="hover:bg-secondary">
                        <Github className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2 leading-relaxed text-pretty">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button asChild variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      Ver Proyecto <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Added GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">¿Quieres ver más de mi trabajo?</p>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="https://github.com/PauLopNun" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              Ver todos mis proyectos en GitHub
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
