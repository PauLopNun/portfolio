"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const SkillIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case "Java":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
          alt="Java"
          className={className}
        />
      )
    case "Spring Boot":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
          alt="Spring Boot"
          className={className}
        />
      )
    case "Spring Security / JWT":
      return (
        <img
          src="https://cdn.simpleicons.org/springsecurity/6DB33F"
          alt="Spring Security"
          className={className}
        />
      )
    case "Kotlin / Ktor":
      return (
        <div className="flex gap-1 justify-center">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"
            alt="Kotlin"
            className={className}
          />
          <img
            src="https://cdn.simpleicons.org/ktor/F44A59"
            alt="Ktor"
            className={className}
          />
        </div>
      )
    case "PostgreSQL":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
          alt="PostgreSQL"
          className={className}
        />
      )
    case "JPA / Hibernate":
      return (
        <img
          src="https://cdn.simpleicons.org/hibernate/59666C"
          alt="Hibernate"
          className={className}
        />
      )
    case "RabbitMQ":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg"
          alt="RabbitMQ"
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
    case "AWS":
      return (
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
          alt="AWS"
          className={`${className} dark:invert`}
        />
      )
    case "Flyway / Liquibase":
      return (
        <div className="flex gap-1 justify-center">
          <img
            src="https://cdn.simpleicons.org/flyway/CC0200"
            alt="Flyway"
            className={className}
          />
          <img
            src="https://cdn.simpleicons.org/liquibase/2962FF"
            alt="Liquibase"
            className={className}
          />
        </div>
      )
    case "JUnit 5 / Testcontainers":
      return (
        <img
          src="https://cdn.simpleicons.org/junit5/25A162"
          alt="JUnit 5"
          className={className}
        />
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
    default:
      return <div className="w-6 h-6 rounded-full bg-current" />
  }
}

const skills = [
  { name: "Java", category: "Backend", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  { name: "Spring Boot", category: "Backend", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  { name: "Spring Security / JWT", category: "Security", color: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { name: "Kotlin / Ktor", category: "Mobile/Backend", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { name: "PostgreSQL", category: "Database", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { name: "JPA / Hibernate", category: "ORM", color: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { name: "RabbitMQ", category: "Messaging", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { name: "Docker", category: "DevOps", color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { name: "AWS", category: "Cloud", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  { name: "Flyway / Liquibase", category: "Migrations", color: "text-red-600", bg: "bg-red-600/10", border: "border-red-600/20" },
  { name: "JUnit 5 / Testcontainers", category: "Testing", color: "text-green-600", bg: "bg-green-600/10", border: "border-green-600/20" },
  { name: "Git / GitHub", category: "Tools", color: "text-gray-500", bg: "bg-gray-500/10", border: "border-gray-500/20" },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Technical Stack</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Backend-first stack powered by <span className="text-foreground font-medium">Java & Spring Boot</span>: REST APIs, persistence, security, messaging, cloud infrastructure and Kotlin for mobile and backend.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className={`h-full p-4 bg-card/50 backdrop-blur border flex flex-col items-center justify-center text-center gap-3 group transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 ${skill.border}`}>
                <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <SkillIcon name={skill.name} className={`w-12 h-12 ${skill.color}`} />
                </div>
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
