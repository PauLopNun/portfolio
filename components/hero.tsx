"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, MapPin, FileText } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

export function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const { resolvedTheme } = useTheme()

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 py-20">
      {/* Updated background gradient with new color scheme */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 space-y-6 text-center md:text-left"
        >
          {/* Updated badge styling */}
          <Badge variant="secondary" className="px-4 py-1.5 text-sm mb-4 animate-fade-in">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponible para trabajar
          </Badge>
          
          {/* Updated heading with better text balance */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pau López
            </span>
          </h1>
          
          {/* Updated subtitle and removed specific technologies from description as requested */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium text-pretty">
            App Developer
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed text-pretty">
            Soy Pau, estudiante de <span className="text-foreground font-medium">Desarrollo de Aplicaciones Multiplataforma</span> con pasión por crear software inspirador, útil y creativo.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-4">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
              <Link href="#contact">
                Contáctame <Mail className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full hover:bg-secondary">
              <Link href="https://github.com/PauLopNun" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full hover:bg-secondary">
              <Link href="https://www.linkedin.com/in/paulopnun/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground pt-2">
            <MapPin className="h-4 w-4" />
            <span>Valencia, España 🇪🇸</span>
          </div>
        </motion.div>

        {/* Updated profile image with better styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          {/* Added floating animation to profile picture */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-4 border-background shadow-2xl ring-4 ring-primary/10 hover:ring-primary/20 transition-all duration-300"
          >
            <Image
              src={resolvedTheme === "dark" ? "/portfolio/images/profilepic2.png" : "/portfolio/images/profilepic.png"}
              alt="Pau López Núñez - Mobile Developer"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Decorative gradient */}
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-2xl blur-3xl scale-110" />
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
