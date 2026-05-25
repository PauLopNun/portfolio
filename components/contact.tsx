"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, MapPin, Languages, GraduationCap } from 'lucide-react'
import Link from "next/link"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "paulopeznunez@gmail.com",
    href: "mailto:paulopeznunez@gmail.com",
    color: "text-red-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/paulopnun",
    href: "https://www.linkedin.com/in/paulopnun/",
    color: "text-blue-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@PauLopNun",
    href: "https://github.com/PauLopNun",
    color: "text-gray-500",
  },
]

const highlights = [
  {
    icon: MapPin,
    label: "Location",
    value: "Valencia, Spain",
    description: "Available remote & on-site",
  },
  {
    icon: Languages,
    label: "Languages",
    value: "Spanish (Native) · English (C1)",
    description: "Professional communication",
  },
  {
    icon: GraduationCap,
    label: "Education · DAM",
    value: "Higher Vocational Training",
    description: "Java, Spring Boot, Kotlin & clean architectures",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Let&apos;s Build Together</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Open to <span className="text-foreground font-medium">junior backend roles</span>, internships and collaborative projects around <span className="text-foreground font-medium">Java, Spring Boot and distributed systems</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={method.href} target="_blank" rel="noopener noreferrer">
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30 group cursor-pointer bg-card/50 backdrop-blur flex flex-col items-center text-center">
                  <method.icon className={`h-8 w-8 ${method.color} mb-3 group-hover:scale-110 transition-transform`} />
                  <h3 className="font-semibold mb-1">{method.label}</h3>
                  <p className="text-sm text-muted-foreground break-all">{method.value}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="p-6 text-center bg-card/50 backdrop-blur border-primary/10 h-full flex flex-col items-center justify-center">
                <highlight.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{highlight.label}</h3>
                <p className="text-sm font-medium mb-1">{highlight.value}</p>
                <p className="text-xs text-muted-foreground">{highlight.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-balance">Have a project in mind?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-pretty">
              Available for junior backend roles, internships and collaborations on Java, Spring Boot, Kotlin and distributed systems projects.
            </p>
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20">
              <Link href="mailto:paulopeznunez@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send me a message
              </Link>
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
