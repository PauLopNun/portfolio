"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GraduationCap, Trophy, Code, Briefcase, ExternalLink } from 'lucide-react'
import Link from "next/link"

const timeline = [
  {
    year: "2025 – Present",
    title: "Backend Developer Intern",
    institution: "Java & Spring Boot Internship",
    description: "Building backend systems with Java 21 and Spring Boot: REST APIs, JWT security, JPA/Hibernate persistence, Flyway migrations and integration tests with JUnit 5 and Testcontainers. Team workflow with GitHub Flow and code reviews.",
    icon: Briefcase,
    type: "experience"
  },
  {
    year: "May 2025 – Jun 2025",
    title: "Full Stack Developer",
    institution: "Feria Valencia · Internship Contract",
    description: "Remote web development using MJML, Docker and modern tooling. Implemented responsive newsletter systems and cloud deployments.",
    icon: Briefcase,
    type: "experience"
  },
  {
    year: "2024 – Present",
    title: "Higher Technical Degree in Cross-platform App Development",
    institution: "Vocational Training (DAM)",
    description: "Backend development with Java and Spring Boot, mobile development with Kotlin and Jetpack Compose, clean architectures, DDD and software engineering best practices.",
    icon: GraduationCap,
    type: "education"
  },
  {
    year: "2023 – 2024",
    title: "Open Source Projects",
    institution: "GitHub",
    description: "Built FlowBoard (Kotlin + Ktor + WebSockets) and Supply Chain Simulator (Java microservices + RabbitMQ). Over 1,100 contributions in the last year across distributed systems, APIs and mobile apps.",
    icon: Code,
    type: "experience"
  }
]

const certifications = [
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "May 2026",
    logo: "https://cdn.simpleicons.org/anthropic/000000",
    darkInvert: true,
    href: "https://verify.skilljar.com/c/rcdgxoecp9as",
  },
  {
    name: "Unity Junior Programmer",
    issuer: "Unity",
    date: "Apr 2026",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg",
    darkInvert: true,
    href: "https://www.credly.com/badges/386504b3-0be1-4fda-b676-d2652e352b63/linked_in_profile",
  },
  {
    name: "Software Dev Fundamentals",
    issuer: "Microsoft",
    date: "Jan 2026",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
    darkInvert: false,
    href: "https://www.linkedin.com/learning/certificates/618c2880d6b4c688a92c1864350d1c4d0b0b397dd8da3006c94dea45811a8900",
  },
  {
    name: "Spring Boot: Module Integration",
    issuer: "LinkedIn Learning",
    date: "Jan 2026",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
    darkInvert: false,
    href: "https://www.linkedin.com/learning/certificates/320b82379f88da31de0ed5d40a2bb01e933cea8081c95e1c818cd75c4567ccfa",
  },
  {
    name: "Mastering Java: Unit Tests (JUnit)",
    issuer: "LinkedIn Learning",
    date: "Aug 2025",
    logo: "https://cdn.simpleicons.org/junit5/25A162",
    darkInvert: false,
    href: "https://www.linkedin.com/learning/certificates/a5475ffd7d47d5b0e7f26b6a0fe9b47c7c42e662b7e763f5cf0f9b016fcb81f2",
  },
  {
    name: "Docker Essentials",
    issuer: "LinkedIn Learning",
    date: "Dec 2025",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    darkInvert: false,
    href: "https://www.linkedin.com/learning/certificates/b9f2314e09566341860becb61b763b8f26ef6d12360f26b04c83bb48989f7801",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Experience & Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Hands-on backend development through internships, real-world projects and continuous learning.
          </p>
        </motion.div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 bg-card/50 backdrop-blur">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                    {item.year}
                  </span>
                  {item.type === "education" && <GraduationCap className="w-4 h-4 text-muted-foreground" />}
                  {item.type === "certification" && <Trophy className="w-4 h-4 text-muted-foreground" />}
                  {item.type === "experience" && <Code className="w-4 h-4 text-muted-foreground" />}
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm font-medium text-muted-foreground mb-2">{item.institution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Certifications</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={cert.href} target="_blank" rel="noopener noreferrer">
                  <Card className="p-4 flex items-center gap-3 bg-card/50 backdrop-blur border-primary/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-primary/30 cursor-pointer group">
                    <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-secondary">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className={`w-5 h-5 object-contain ${cert.darkInvert ? "dark:invert" : ""}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight truncate group-hover:text-primary transition-colors">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer} · {cert.date}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="https://www.linkedin.com/in/paulopnun/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View all certifications on LinkedIn
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
