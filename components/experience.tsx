"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { GraduationCap, Trophy, Code, Calendar, Briefcase } from 'lucide-react'

const timeline = [
  {
    year: "May. 2025 - Jun. 2025",
    title: "Desarrollador Full Stack",
    institution: "Feria Valencia · Contrato de prácticas",
    description: "Desarrollo web en remoto utilizando MJML, Docker y tecnologías modernas. Implementación de soluciones eficientes y trabajo en equipo.",
    icon: Briefcase,
    type: "experience"
  },
  {
    year: "2024 - Presente",
    title: "Desarrollo de Aplicaciones Multiplataforma",
    institution: "Formación Profesional Superior",
    description: "Especialización en desarrollo móvil con Kotlin, Swift y Flutter. Aprendizaje de arquitecturas limpias y buenas prácticas.",
    icon: GraduationCap,
    type: "education"
  },
  {
    year: "2023 - 2024",
    title: "Proyectos Open Source",
    institution: "GitHub",
    description: "Desarrollo activo de proyectos como FlowBoard y RenderMail. Contribuciones a la comunidad y aprendizaje continuo.",
    icon: Code,
    type: "experience"
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Mi Trayectoria</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Un recorrido por mi formación académica y hitos importantes en mi camino como desarrollador.
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
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary transition-colors">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Content */}
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
      </div>
    </section>
  )
}
