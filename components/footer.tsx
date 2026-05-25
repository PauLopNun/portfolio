"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-6xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <Link href="/" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors inline-block">
              PauLopNun<span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Backend Developer · Java & Spring Boot · Kotlin
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="#skills" className="hover:text-primary transition-colors">Stack</Link>
            <Link href="#experience" className="hover:text-primary transition-colors">Experience</Link>
            <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex gap-2">
            <Link
              href="https://github.com/PauLopNun"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/paulopnun/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="mailto:paulopeznunez@gmail.com"
              aria-label="Email"
              className="p-2.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {currentYear} Pau López Núñez. All rights reserved.</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>

      </div>
    </footer>
  )
}
