// Every user-facing sentence, in both languages. Links, tool names and certificate titles live in data.ts.

export type Lang = "en" | "es"

export type Job = { period: string; place: string; role: string; company: string; summary: string; points: string[]; stack: string[] }
export type Project = { context: string; summary: string; points: string[]; links: string[] }

export type Content = {
  htmlTitle: string
  htmlDescription: string
  nav: { id: string; label: string }[]
  skip: string
  hire: string
  hero: {
    status: string
    hi: string
    role: string
    pitch: [string, string, string] // before, highlighted, after
    place: string
    email: string
    projects: string
  }
  sections: { experience: [string, string]; projects: [string, string]; stack: [string, string]; education: [string, string]; contact: [string, string] }
  current: string
  linkedin: string
  jobs: Job[]
  projects: Project[]
  moreTitle: string
  more: string[]
  stackAreas: string[]
  practicesTitle: string
  practices: string[]
  education: { period: string; title: string; place: string; note: string; linkLabel?: string }[]
  certsTitle: string
  certGroups: string[]
  contact: { title: string; text: string; copy: string; copied: string }
  footer: string
  top: string
  theme: { light: string; dark: string }
  motion: string
}

const en: Content = {
  htmlTitle: "Pau López Núñez | Backend Developer",
  htmlDescription: "Pau López Núñez, backend developer in Valencia. Java, Spring Boot, event-driven services and AWS.",
  nav: [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "stack", label: "Stack" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ],
  skip: "Skip to content",
  hire: "Hire me",
  hero: {
    status: "Open to new opportunities",
    hi: "Hi, I'm",
    role: "Backend developer",
    pitch: ["I build ", "Java and Spring Boot", " services, connect them with events and ship them to the cloud."],
    place: "València, Spain",
    email: "Email me",
    projects: "See projects",
  },
  sections: {
    experience: ["Experience", "Where I've shipped"],
    projects: ["Projects", "Things I've built"],
    stack: ["Stack", "Tools I reach for"],
    education: ["Education", "Always learning"],
    contact: ["Contact", "Let's build something solid."],
  },
  current: "current",
  linkedin: "Full profile on LinkedIn",
  jobs: [
    {
      period: "Sep 2026 – now",
      place: "Valencia, hybrid",
      role: "Junior Software Engineer",
      company: "Adding Technology",
      summary: "Tax management platform for an insurance client, moving from a legacy stack to a modern one.",
      points: [
        "Migrate legacy features (Struts, JSP and PL/SQL logic) to Spring Boot REST APIs with Angular front ends, on Oracle.",
        "Build tax models end to end: file uploads and validation, queries, maintenance screens and detail views.",
        "Write layered PL/SQL under corporate standards and fix incidents in WebSphere Liberty and the database layer.",
      ],
      stack: ["Java", "Spring Boot", "Angular", "Oracle PL/SQL", "WebSphere Liberty"],
    },
    {
      period: "Mar – May 2026",
      place: "Valencia, on-site",
      role: "Backend Developer, internship",
      company: "GFT Technologies",
      summary: "Junior training programme building a distributed supply chain simulator with several teams.",
      points: [
        "Co-designed the architecture and built the Transport microservice with hexagonal architecture and DDD.",
        "Asynchronous communication through RabbitMQ events, contract tests and Testcontainers integration tests.",
        "AWS workshop (S3, Lambda, DynamoDB, Step Functions, EventBridge) and container deployment to ECR and ECS.",
      ],
      stack: ["Java 21", "Spring Boot", "RabbitMQ", "PostgreSQL", "AWS", "GitHub Actions"],
    },
    {
      period: "May – Jun 2025",
      place: "Remote",
      role: "Full Stack Developer, internship",
      company: "Feria Valencia",
      summary: "Built RenderMail, an automated system to design and send email campaigns.",
      points: [
        "Responsive email templates with MJML that render consistently across mail clients.",
        "Node.js backend that automates the sending flow, packaged with Docker.",
      ],
      stack: ["Node.js", "MJML", "Docker", "PostgreSQL"],
    },
  ],
  projects: [
    {
      context: "My microservice in the GFT supply chain simulator, 2026.",
      summary:
        "Manages the trucks of a distributed supply chain: registers them, assigns them to shipments and moves them across the map. It only talks to the other four services through RabbitMQ events.",
      points: [
        "Hexagonal architecture and DDD, domain free of Spring, JPA and RabbitMQ.",
        "Event contracts with Spring Cloud Contract, Testcontainers tests, deployed on AWS.",
      ],
      links: ["Code", "Whole system (14 stars)"],
    },
    {
      context: "Final project of my DAM degree, 2025–2026.",
      summary: "A Notion-style workspace for Android with a real-time collaborative editor, built on a CRDT engine over WebSockets.",
      points: [
        "Block editor, tasks (list, Kanban, calendar), group chat and shared workspaces.",
        "Ktor backend, 13 PostgreSQL tables, JWT and Google Sign-In, CI that publishes the APK.",
      ],
      links: ["Code"],
    },
    {
      context: "Personal project to practise Python backends.",
      summary: "Receives network and service alerts, stores them and exposes a REST API to query them by client, event type and status.",
      points: [
        "Hexagonal architecture with FastAPI and SQLAlchemy kept out of the domain.",
        "Async repositories, Alembic migrations, 100% coverage gate, deployed on Render.",
      ],
      links: ["Code", "Live API docs"],
    },
  ],
  moreTitle: "More on GitHub",
  more: [
    "Spring Boot REST API with JWT refresh-token rotation, transactional transfers, rate limiting and Flyway.",
    "Spring Boot app with a multi-stage Dockerfile and a pipeline that pushes to ECR and deploys to ECS.",
    "Local lab with LocalStack to work with Amazon S3 Tables (Apache Iceberg) and query them with Athena.",
    "One command to turn Markdown into clean PDFs with Pandoc and Eisvogel templates.",
    "Responsive email campaign system from my Feria Valencia internship.",
    "Real-time multiplayer word game with Jetpack Compose and a Ktor WebSocket server.",
  ],
  stackAreas: ["Backend", "Data and messaging", "Cloud and delivery", "Front end and mobile", "Quality and workflow"],
  practicesTitle: "How I work",
  practices: ["Hexagonal architecture", "Domain-driven design", "TDD and BDD", "Contract testing", "Clean Code and SOLID", "Code reviews and CI"],
  education: [
    {
      period: "2026 – 2027",
      title: "Specialization in Cloud Computing",
      place: "IES Juan de Garay",
      note: "In progress. AWS compute, networking, managed databases and CI/CD.",
      linkLabel: "Course labs",
    },
    {
      period: "2024 – 2026",
      title: "Higher VET Diploma in Multiplatform App Development",
      place: "IES La Sénia",
      note: "Completed, with the Cloud Resources elective. Final project: FlowBoard.",
    },
    {
      period: "2023 – 2024",
      title: "Economics, first year",
      place: "Universitat de València",
      note: "First year of the degree, taught in English.",
    },
  ],
  certsTitle: "Certificates",
  certGroups: ["Cloud and infrastructure", "Java and testing", "AI-assisted development", "Other"],
  contact: {
    title: "Let's build something solid.",
    text: "I'm open to junior backend roles and interesting projects. The fastest way is an email.",
    copy: "Copy",
    copied: "Copied",
  },
  footer: "Designed and built by Pau López Núñez · React, Tailwind CSS and Framer Motion.",
  top: "Back to top ↑",
  theme: { light: "Switch to light mode", dark: "Switch to dark mode" },
  motion: "Animations",
}

const es: Content = {
  htmlTitle: "Pau López Núñez | Desarrollador Backend",
  htmlDescription: "Pau López Núñez, desarrollador backend en Valencia. Java, Spring Boot, servicios basados en eventos y AWS.",
  nav: [
    { id: "experience", label: "Experiencia" },
    { id: "projects", label: "Proyectos" },
    { id: "stack", label: "Stack" },
    { id: "education", label: "Formación" },
    { id: "contact", label: "Contacto" },
  ],
  skip: "Saltar al contenido",
  hire: "Contrátame",
  hero: {
    status: "Abierto a nuevas oportunidades",
    hi: "Hola, soy",
    role: "Desarrollador backend",
    pitch: ["Construyo servicios con ", "Java y Spring Boot", ", los conecto mediante eventos y los despliego en la nube."],
    place: "València, España",
    email: "Escríbeme",
    projects: "Ver proyectos",
  },
  sections: {
    experience: ["Experiencia", "Dónde he trabajado"],
    projects: ["Proyectos", "Cosas que he construido"],
    stack: ["Stack", "Herramientas que uso"],
    education: ["Formación", "Siempre aprendiendo"],
    contact: ["Contacto", "Construyamos algo sólido."],
  },
  current: "actual",
  linkedin: "Perfil completo en LinkedIn",
  jobs: [
    {
      period: "Sep 2026 – actualidad",
      place: "Valencia, híbrido",
      role: "Ingeniero de software junior",
      company: "Adding Technology",
      summary: "Plataforma de gestión de impuestos para un cliente del sector seguros, en plena migración de un stack legacy a uno moderno.",
      points: [
        "Migro funcionalidades legacy (Struts, JSP y lógica PL/SQL) a APIs REST con Spring Boot y front end en Angular, sobre Oracle.",
        "Construyo modelos fiscales de punta a punta: subida y validación de ficheros, consultas, pantallas de mantenimiento y detalle.",
        "Escribo PL/SQL por capas siguiendo estándares corporativos y resuelvo incidencias en WebSphere Liberty y la base de datos.",
      ],
      stack: ["Java", "Spring Boot", "Angular", "Oracle PL/SQL", "WebSphere Liberty"],
    },
    {
      period: "Mar – May 2026",
      place: "Valencia, presencial",
      role: "Desarrollador backend, prácticas",
      company: "GFT Technologies",
      summary: "Programa de formación junior: simulador distribuido de cadena de suministro, desarrollado entre varios equipos.",
      points: [
        "Co-diseñé la arquitectura y construí el microservicio Transport con arquitectura hexagonal y DDD.",
        "Comunicación asíncrona con eventos en RabbitMQ, tests de contrato y de integración con Testcontainers.",
        "Taller de AWS (S3, Lambda, DynamoDB, Step Functions, EventBridge) y despliegue de contenedores en ECR y ECS.",
      ],
      stack: ["Java 21", "Spring Boot", "RabbitMQ", "PostgreSQL", "AWS", "GitHub Actions"],
    },
    {
      period: "May – Jun 2025",
      place: "Remoto",
      role: "Desarrollador full stack, prácticas",
      company: "Feria Valencia",
      summary: "Desarrollé RenderMail, un sistema automatizado para diseñar y enviar campañas de email.",
      points: [
        "Plantillas de email responsive con MJML que se ven igual en todos los clientes de correo.",
        "Backend en Node.js que automatiza el envío, empaquetado con Docker.",
      ],
      stack: ["Node.js", "MJML", "Docker", "PostgreSQL"],
    },
  ],
  projects: [
    {
      context: "Mi microservicio del simulador de cadena de suministro de GFT, 2026.",
      summary:
        "Gestiona los camiones de una cadena de suministro distribuida: los registra, los asigna a envíos y los mueve por el mapa. Solo habla con los otros cuatro servicios mediante eventos de RabbitMQ.",
      points: [
        "Arquitectura hexagonal y DDD, con el dominio libre de Spring, JPA y RabbitMQ.",
        "Contratos de eventos con Spring Cloud Contract, tests con Testcontainers, desplegado en AWS.",
      ],
      links: ["Código", "Sistema completo (14 estrellas)"],
    },
    {
      context: "Proyecto final del ciclo DAM, 2025–2026.",
      summary: "Espacio de trabajo estilo Notion para Android con editor colaborativo en tiempo real, basado en un motor CRDT sobre WebSockets.",
      points: [
        "Editor de bloques, tareas (lista, Kanban, calendario), chat de grupo y espacios compartidos.",
        "Backend en Ktor, 13 tablas en PostgreSQL, JWT y Google Sign-In, CI que publica el APK.",
      ],
      links: ["Código"],
    },
    {
      context: "Proyecto personal para practicar backends en Python.",
      summary: "Recibe alertas de red y servicio, las almacena y expone una API REST para consultarlas por cliente, tipo de evento y estado.",
      points: [
        "Arquitectura hexagonal con FastAPI y SQLAlchemy fuera del dominio.",
        "Repositorios async, migraciones con Alembic, cobertura del 100% exigida, desplegado en Render.",
      ],
      links: ["Código", "Docs de la API en vivo"],
    },
  ],
  moreTitle: "Más en GitHub",
  more: [
    "API REST con Spring Boot: JWT con rotación de refresh tokens, transferencias transaccionales, rate limiting y Flyway.",
    "App Spring Boot con Dockerfile multi-stage y un pipeline que publica en ECR y despliega en ECS.",
    "Laboratorio local con LocalStack para trabajar con Amazon S3 Tables (Apache Iceberg) y consultarlas con Athena.",
    "Un solo comando para convertir Markdown en PDFs limpios con Pandoc y plantillas Eisvogel.",
    "Sistema de campañas de email responsive de mis prácticas en Feria Valencia.",
    "Juego de palabras multijugador en tiempo real con Jetpack Compose y un servidor WebSocket en Ktor.",
  ],
  stackAreas: ["Backend", "Datos y mensajería", "Cloud y entrega", "Front end y móvil", "Calidad y flujo de trabajo"],
  practicesTitle: "Cómo trabajo",
  practices: ["Arquitectura hexagonal", "Domain-driven design", "TDD y BDD", "Contract testing", "Clean Code y SOLID", "Code reviews y CI"],
  education: [
    {
      period: "2026 – 2027",
      title: "Curso de especialización en Computación en la Nube",
      place: "IES Juan de Garay",
      note: "En curso. Cómputo en AWS, redes, bases de datos gestionadas y CI/CD.",
      linkLabel: "Prácticas del curso",
    },
    {
      period: "2024 – 2026",
      title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
      place: "IES La Sénia",
      note: "Terminado, con la optativa de Recursos en la Nube. Proyecto final: FlowBoard.",
    },
    {
      period: "2023 – 2024",
      title: "Economía, primer curso",
      place: "Universitat de València",
      note: "Primer curso del grado, impartido en inglés.",
    },
  ],
  certsTitle: "Certificados",
  certGroups: ["Cloud e infraestructura", "Java y testing", "Desarrollo asistido por IA", "Otros"],
  contact: {
    title: "Construyamos algo sólido.",
    text: "Estoy abierto a puestos junior de backend y a proyectos interesantes. Lo más rápido es un email.",
    copy: "Copiar",
    copied: "Copiado",
  },
  footer: "Diseñado y desarrollado por Pau López Núñez · React, Tailwind CSS y Framer Motion.",
  top: "Volver arriba ↑",
  theme: { light: "Cambiar a modo claro", dark: "Cambiar a modo oscuro" },
  motion: "Animaciones",
}

export const content: Record<Lang, Content> = { en, es }
