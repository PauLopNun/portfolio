"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const SkillIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Kotlin":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" 
          alt="Kotlin" 
          className={className} 
        />
      )
    case "Flutter / Dart":
      return (
        <div className="flex gap-1 justify-center">
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" 
            alt="Flutter" 
            className={className} 
          />
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" 
            alt="Dart" 
            className={`${className} dark:invert`} 
          />
        </div>
      )
    case "Java":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
          alt="Java" 
          className={className} 
        />
      )
    case "Jetpack Compose":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jetpackcompose/jetpackcompose-original.svg" 
          alt="Jetpack Compose" 
          className={className} 
        />
      )
    case "SQL / SQLite":
      return (
        <div className="flex gap-1 justify-center">
          <img 
            src="https://cdn.simpleicons.org/sqlite/003B57" 
            alt="SQLite" 
            className={className} 
          />
        </div>
      )
    case "Firebase / AWS":
      return (
        <div className="flex gap-1 justify-center">
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" 
            alt="Firebase" 
            className={`${className} dark:invert`} 
          />
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" 
            alt="AWS" 
            className={`${className} dark:invert`} 
          />
        </div>
      )
    case "Git / GitHub":
      return (
        <div className="flex gap-1 justify-center">
          <img 
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" 
            alt="Git" 
            className={className} 
          />
          <img 
            src="https://cdn.simpleicons.org/github/181717" 
            alt="GitHub" 
            className={`${className} dark:invert`} 
          />
        </div>
      )
    case "Python":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
          alt="Python" 
          className={className} 
        />
      )
    case "Docker":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
          alt="Docker" 
          className={className} 
        />
      )
    case "Bash / Shell":
      return (
        <img 
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" 
          alt="Bash" 
          className={`${className} dark:invert`} 
        />
      )
    default:
      return <div className="w-6 h-6 rounded-full bg-current" />
  }
}

const skills = [
  { name: "Kotlin", category: "Mobile", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { name: "Flutter / Dart", category: "Mobile", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { name: "Java", category: "Mobile", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  { name: "Jetpack Compose", category: "UI", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  { name: "SQL / SQLite", category: "Database", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { name: "Firebase / AWS", category: "Backend", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { name: "Git / GitHub", category: "Tools", color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" },
  { name: "Python", category: "Backend", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { name: "Docker", category: "DevOps", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { name: "Bash / Shell", category: "Tools", color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500/20" },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Habilidades Técnicas</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Mi stack tecnológico actual, enfocado en desarrollo móvil moderno y soluciones multiplataforma.
          </p>
        </motion.div>

        {/* Improved skills grid with better visual hierarchy */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className={`h-full p-4 hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur border hover:border-primary/50 flex flex-col items-center justify-center text-center gap-3 group ${skill.border}`}>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  className={`w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <SkillIcon name={skill.name} className={`w-12 h-12 ${skill.color}`} />
                </motion.div>
                <div>
                  <span className="font-semibold block mb-1">{skill.name}</span>
                  <Badge variant="secondary" className="text-[10px] px-2 h-5">{skill.category}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
