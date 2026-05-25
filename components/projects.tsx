"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Server, Shield, Truck, FolderKanban, Gamepad2, Mail } from 'lucide-react'
import Link from "next/link"

const projects = [
  {
    title: "Supply Chain Simulator",
    description: "Distributed supply chain simulation built during an enterprise backend workshop. Microservices with RabbitMQ event contracts, DDD, Hexagonal Architecture and team GitHub workflow.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "PostgreSQL", "Docker"],
    icon: Server,
    link: "https://github.com/PauLopNun/supply-chain-simulator-workshop",
    gradient: "from-blue-600 to-indigo-600",
    featured: true,
  },
  {
    title: "Transport Service",
    description: "Microservice for truck registration, delivery lifecycle events and messaging contracts. Hexagonal Architecture, DDD and clean service boundaries.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "DDD", "Hexagonal"],
    icon: Truck,
    link: "https://github.com/PauLopNun/transport-service",
    gradient: "from-orange-500 to-amber-600",
    featured: true,
  },
  {
    title: "FlowBoard",
    description: "Full-stack Android and backend app for collaborative documents, tasks, workspaces and real-time chat. REST APIs, WebSockets, JWT auth, PostgreSQL and Clean Architecture deployed on Render.",
    tags: ["Kotlin", "Ktor", "WebSockets", "PostgreSQL", "Android"],
    icon: FolderKanban,
    link: "https://github.com/PauLopNun/FlowBoard",
    gradient: "from-blue-500 to-cyan-500",
    featured: true,
  },
  {
    title: "Banking API",
    description: "Production-oriented REST API for banking operations. JWT auth, refresh tokens, transfers, rate limiting, Flyway migrations and automated integration tests.",
    tags: ["Java", "Spring Security", "PostgreSQL", "Flyway", "JWT"],
    icon: Shield,
    link: "https://github.com/PauLopNun/BIT",
    gradient: "from-emerald-500 to-green-600",
    featured: true,
  },
  {
    title: "BombParty",
    description: "Real-time multiplayer word game. Android app with Jetpack Compose, Ktor backend and WebSocket communication for live gameplay.",
    tags: ["Kotlin", "Jetpack Compose", "Ktor", "WebSockets"],
    icon: Gamepad2,
    link: "https://github.com/PauLopNun/bombparty",
    gradient: "from-yellow-500 to-orange-600",
    featured: false,
  },
  {
    title: "RenderMail",
    description: "Responsive newsletter system deployed to the cloud. Modern backend architecture with MJML and automated design-to-production workflow.",
    tags: ["JavaScript", "MJML", "Cloud", "REST API"],
    icon: Mail,
    link: "https://github.com/PauLopNun/RenderMail",
    gradient: "from-pink-500 to-rose-500",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Distributed Java/Spring Boot backends, event-driven microservices with RabbitMQ and full-stack development with Kotlin and Ktor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group/card"
            >
              <Card className="h-full flex flex-col border-primary/10 overflow-hidden bg-card/50 backdrop-blur relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 group">

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Want to see more of my work?</p>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="https://github.com/PauLopNun" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View all projects on GitHub
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
