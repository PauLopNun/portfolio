// Files in /public, prefixed with the base path the site is served from (GitHub Pages: /portfolio/)
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

export const profile = {
  name: "Pau López Núñez",
  role: "Backend developer in Valencia",
  email: "paulopeznunez@gmail.com",
  github: "https://github.com/PauLopNun",
  linkedin: "https://www.linkedin.com/in/paulopnun/",
}

export type Job = {
  period: string
  role: string
  company: string
  place: string
  summary: string
  points: string[]
  stack: string[]
}

export const jobs: Job[] = [
  {
    period: "Sep 2026 – now",
    role: "Junior Software Engineer",
    company: "Adding Technology",
    place: "Valencia, hybrid",
    summary:
      "Tax management platform for an insurance client, in the middle of moving from a legacy stack to a modern one.",
    points: [
      "Migrate legacy features (Struts, JSP and PL/SQL logic) to REST APIs in Spring Boot with Angular front ends, on top of Oracle.",
      "Build tax models end to end: file uploads and validation, queries, maintenance screens and detail views.",
      "Write layered PL/SQL under corporate standards and fix incidents in WebSphere Liberty and the database layer.",
    ],
    stack: ["Java", "Spring Boot", "Angular", "Oracle PL/SQL", "WebSphere Liberty", "Plastic SCM"],
  },
  {
    period: "Mar – May 2026",
    role: "Backend Developer, internship",
    company: "GFT Technologies",
    place: "Valencia, on-site",
    summary:
      "Junior training programme building a distributed supply chain simulator with several teams.",
    points: [
      "Co-designed the system architecture and built the Transport microservice with hexagonal architecture and DDD.",
      "Asynchronous communication through RabbitMQ events, contract tests and Testcontainers integration tests.",
      "AWS workshop (S3, Lambda, DynamoDB, Step Functions, EventBridge) and container deployment to ECR and ECS.",
    ],
    stack: ["Java 21", "Spring Boot", "RabbitMQ", "PostgreSQL", "AWS", "GitHub Actions"],
  },
  {
    period: "May – Jun 2025",
    role: "Full Stack Developer, internship",
    company: "Feria Valencia",
    place: "Remote",
    summary: "Built RenderMail, an automated system to design and send email campaigns.",
    points: [
      "Responsive email templates with MJML that render consistently across mail clients.",
      "Node.js backend to automate the sending flow, packaged with Docker.",
    ],
    stack: ["Node.js", "MJML", "Docker", "PostgreSQL"],
  },
]

export const education = [
  {
    period: "2026 – 2027",
    title: "Specialization in Cloud Computing",
    place: "IES Juan de Garay",
    note: "In progress. AWS compute, networking, managed databases and CI/CD.",
    href: "https://github.com/PauLopNun/curso-servicios-nube",
    linkLabel: "Course labs",
  },
  {
    period: "2024 – 2026",
    title: "Higher VET Diploma in Multiplatform App Development",
    place: "IES La Sénia",
    note: "Completed, including the Cloud Resources elective. Final project: FlowBoard.",
  },
  {
    period: "2023 – 2024",
    title: "Economics, first year",
    place: "Universitat de València",
    note: "First year of the degree, taught in English.",
  },
]

export type Project = {
  name: string
  context: string
  summary: string
  points: string[]
  stack: string[]
  links: { label: string; href: string }[]
  repo: string
}

export const featured: Project[] = [
  {
    name: "Transport Service",
    repo: "supply-chain-simulator-workshop", // cover = preview of the whole system (more context than the single service)
    context: "My microservice in the GFT supply chain simulator, 2026.",
    summary:
      "Manages the trucks of a distributed supply chain: registers them, assigns them to shipment requests and moves them across the map one simulated day at a time. It only talks to the other four services through RabbitMQ events.",
    points: [
      "Hexagonal architecture and DDD, with the domain free of Spring, JPA and RabbitMQ.",
      "Consumes time, warehouse and shipment events and publishes truck and delivery events on topic exchanges.",
      "Event contracts with Spring Cloud Contract, Testcontainers integration tests and deployment on AWS behind a load balancer.",
    ],
    stack: ["Java 21", "Spring Boot 3", "RabbitMQ", "PostgreSQL", "Liquibase", "AWS"],
    links: [
      { label: "Code", href: "https://github.com/PauLopNun/transport-service" },
      { label: "Whole system (14 stars)", href: "https://github.com/PauLopNun/supply-chain-simulator-workshop" },
    ],
  },
  {
    name: "FlowBoard",
    repo: "FlowBoard",
    context: "Final project of my DAM degree, 2025–2026.",
    summary:
      "A Notion-style workspace for Android with a real-time collaborative document editor, built on a CRDT engine over WebSockets.",
    points: [
      "Block editor with 11 block types, slash commands, Markdown shortcuts and live presence.",
      "Tasks with list, Kanban and calendar views, group chat and shared workspaces.",
      "Ktor backend with 13 PostgreSQL tables, JWT and Google Sign-In, deployed on Render. CI publishes the APK on every push.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Ktor", "WebSockets", "PostgreSQL"],
    links: [{ label: "Code", href: "https://github.com/PauLopNun/FlowBoard" }],
  },
  {
    name: "Telecom Notification Service",
    repo: "telecom-notification-service",
    context: "Personal project to practise Python backends.",
    summary:
      "Receives network and service alerts, stores them and exposes a REST API to query them by client, event type and status.",
    points: [
      "Hexagonal architecture with FastAPI and SQLAlchemy kept out of the domain.",
      "Async repositories, Alembic migrations and a 100% coverage gate with Testcontainers.",
      "Deployed on Render as a blueprint with a managed PostgreSQL database.",
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker"],
    links: [
      { label: "Code", href: "https://github.com/PauLopNun/telecom-notification-service" },
      { label: "Live API docs", href: "https://telecom-notification-service.onrender.com/docs" },
    ],
  },
]

export const moreProjects = [
  {
    name: "Banking API",
    text: "Spring Boot REST API with JWT refresh-token rotation, transactional transfers, rate limiting and Flyway.",
    href: "https://github.com/PauLopNun/banking-api",
  },
  {
    name: "AWS deploy workshop",
    text: "Spring Boot app with a multi-stage Dockerfile and a pipeline that pushes to Amazon ECR and deploys to ECS.",
    href: "https://github.com/PauLopNun/taller-deploy-aws-2026-pulz",
  },
  {
    name: "S3 Tables lab",
    text: "Local lab with LocalStack to work with Amazon S3 Tables (Apache Iceberg) and query them with Athena.",
    href: "https://github.com/PauLopNun/practica-s3tables",
  },
  {
    name: "Markdown to PDF workflow",
    text: "One command to turn Markdown into clean PDFs with Pandoc and Eisvogel templates.",
    href: "https://github.com/PauLopNun/markdown-pdf-workflow",
  },
  {
    name: "RenderMail",
    text: "Responsive email campaign system from my Feria Valencia internship.",
    href: "https://github.com/PauLopNun/RenderMail",
  },
  {
    name: "BombParty",
    text: "Real-time multiplayer word game with Jetpack Compose and a Ktor WebSocket server.",
    href: "https://github.com/PauLopNun/bombparty",
  },
]

export type Tool = { name: string; icon?: string; invert?: boolean }

export const stack: { area: string; tools: Tool[] }[] = [
  {
    area: "Backend",
    tools: [
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "spring" },
      { name: "Hibernate", icon: "hibernate" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "Ktor", icon: "ktor" },
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
    ],
  },
  {
    area: "Data and messaging",
    tools: [
      { name: "Oracle PL/SQL", icon: "oracle" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "RabbitMQ", icon: "rabbitmq" },
      { name: "Kafka", icon: "apachekafka", invert: true },
      { name: "Liquibase", icon: "liquibase" },
    ],
  },
  {
    area: "Cloud and delivery",
    tools: [
      { name: "AWS", icon: "amazonwebservices", invert: true },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "Linux", icon: "linux" },
      { name: "Bash", icon: "bash" },
    ],
  },
  {
    area: "Front end and mobile",
    tools: [
      { name: "Angular", icon: "angular" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Jetpack Compose", icon: "jetpackcompose" },
      { name: "Android Studio", icon: "androidstudio" },
    ],
  },
  {
    area: "Quality and workflow",
    tools: [
      { name: "JUnit 5", icon: "junit" },
      { name: "Testcontainers" },
      { name: "Mockito" },
      { name: "Maven", icon: "maven" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github", invert: true },
      { name: "IntelliJ IDEA", icon: "intellij" },
    ],
  },
]

export const practices = [
  "Hexagonal architecture",
  "Domain-driven design",
  "TDD and BDD",
  "Contract testing",
  "Clean Code and SOLID",
  "Code reviews and CI",
]

export const certificates: { group: string; items: { name: string; issuer: string; date: string; href?: string }[] }[] = [
  {
    group: "Cloud and infrastructure",
    items: [
      { name: "AWS GameDay National Championship, qualified from the regional phase", issuer: "Generalitat Valenciana", date: "Jan 2026" },
      { name: "Introduction to Kubernetes", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/ea0d57c7cf07e5c6a1b6c1a84521659630920b56" },
      { name: "Introduction to Apache Kafka", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/372aa0409115cad8b97352cf3c6ca294681f24e6" },
      { name: "Docker esencial", issuer: "LinkedIn Learning", date: "Dec 2025", href: "https://www.linkedin.com/learning/certificates/a5475ffd7d47d5b0e7f26b6a0fe9b47c7c42e662b7e763f5cf0f9b016fcb81f2" },
    ],
  },
  {
    group: "Java and testing",
    items: [
      { name: "Domina Java", issuer: "LinkedIn Learning", date: "", href: "https://www.linkedin.com/learning/certificates/3f0a371fd1e01a95119164b9161fd6a87b4523b9c083769d4db3cc1e4ad73de3" },
      { name: "Domina Java: test unitarios (JUnit)", issuer: "LinkedIn Learning", date: "Aug 2025", href: "https://www.linkedin.com/learning/certificates/b9f2314e09566341860becb61b763b8f26ef6d12360f26b04c83bb48989f7801" },
      { name: "Spring Boot esencial", issuer: "LinkedIn Learning", date: "", href: "https://www.linkedin.com/learning/certificates/cae2b2be74934641b0af51bd7c854dc6c830f7fc6808f4e16074df6b743a57de" },
      { name: "Spring Boot: integración de módulos", issuer: "LinkedIn Learning", date: "Jan 2026", href: "https://www.linkedin.com/learning/certificates/320b82379f88da31de0ed5d40a2bb01e933cea8081c95e1c818cd75c4567ccfa" },
    ],
  },
  {
    group: "AI-assisted development",
    items: [
      { name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/qzn7jaj8av76" },
      { name: "Model Context Protocol", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/4ovzww7emfpt" },
      { name: "Claude Code in Action", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/rcdgxoecp9as" },
      { name: "Software Development with Claude Code", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/3e013061bf2577a78bd794c8a7e2981e21d2ad23" },
    ],
  },
  {
    group: "Other",
    items: [
      { name: "Unity Junior Programmer", issuer: "Unity", date: "Apr 2026", href: "https://www.credly.com/badges/386504b3-0be1-4fda-b676-d2652e352b63/public_url" },
      { name: "Hacktoberfest contributor", issuer: "2024 and 2025", date: "" },
    ],
  },
]
