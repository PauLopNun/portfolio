// Files in /public, prefixed with the base path the site is served from (/ on paulopez.dev)
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

export const profile = {
  name: "Pau López Núñez",
  role: "Backend developer in Valencia",
  email: "paulopeznunez@gmail.com",
  github: "https://github.com/PauLopNun",
  linkedin: "https://www.linkedin.com/in/paulopnun/",
}

export const projectLinks: { repo: string; links: string[] }[] = [
  // repo = the GitHub repo whose social preview is the cover; the first link is the primary button
  { repo: "supply-chain-simulator-workshop", links: ["https://github.com/PauLopNun/transport-service", "https://github.com/PauLopNun/supply-chain-simulator-workshop"] },
  { repo: "FlowBoard", links: ["https://github.com/PauLopNun/FlowBoard"] },
  { repo: "telecom-notification-service", links: ["https://github.com/PauLopNun/telecom-notification-service", "https://telecom-notification-service.onrender.com/docs"] },
]

export const projectNames = ["Transport Service", "FlowBoard", "Telecom Notification Service"]
export const projectStacks = [
  ["Java 21", "Spring Boot 3", "RabbitMQ", "PostgreSQL", "AWS"],
  ["Kotlin", "Jetpack Compose", "Ktor", "WebSockets", "PostgreSQL"],
  ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "Docker"],
]

export const moreProjects = [
  { name: "Banking API", href: "https://github.com/PauLopNun/banking-api" },
  { name: "AWS deploy workshop", href: "https://github.com/PauLopNun/taller-deploy-aws-2026-pulz" },
  { name: "S3 Tables lab", href: "https://github.com/PauLopNun/practica-s3tables" },
  { name: "Markdown to PDF workflow", href: "https://github.com/PauLopNun/markdown-pdf-workflow" },
  { name: "RenderMail", href: "https://github.com/PauLopNun/RenderMail" },
  { name: "BombParty", href: "https://github.com/PauLopNun/bombparty" },
]

export const educationLinks: (string | undefined)[] = ["https://github.com/PauLopNun/curso-servicios-nube", undefined, undefined]

export type Tool = { name: string; icon?: string; invert?: boolean }

export const stack: { tools: Tool[] }[] = [
  {
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
    tools: [
      { name: "Angular", icon: "angular" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Jetpack Compose", icon: "jetpackcompose" },
      { name: "Android Studio", icon: "androidstudio" },
    ],
  },
  {
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

export const certificates: { items: { name: string; issuer: string; date: string; href?: string }[] }[] = [
  {
    items: [
      { name: "AWS GameDay National Championship, qualified from the regional phase", issuer: "Generalitat Valenciana", date: "Jan 2026" },
      { name: "Introduction to Kubernetes", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/ea0d57c7cf07e5c6a1b6c1a84521659630920b56" },
      { name: "Introduction to Apache Kafka", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/372aa0409115cad8b97352cf3c6ca294681f24e6" },
      { name: "Docker esencial", issuer: "LinkedIn Learning", date: "Dec 2025", href: "https://www.linkedin.com/learning/certificates/a5475ffd7d47d5b0e7f26b6a0fe9b47c7c42e662b7e763f5cf0f9b016fcb81f2" },
    ],
  },
  {
    items: [
      { name: "Domina Java", issuer: "LinkedIn Learning", date: "", href: "https://www.linkedin.com/learning/certificates/3f0a371fd1e01a95119164b9161fd6a87b4523b9c083769d4db3cc1e4ad73de3" },
      { name: "Domina Java: test unitarios (JUnit)", issuer: "LinkedIn Learning", date: "Aug 2025", href: "https://www.linkedin.com/learning/certificates/b9f2314e09566341860becb61b763b8f26ef6d12360f26b04c83bb48989f7801" },
      { name: "Spring Boot esencial", issuer: "LinkedIn Learning", date: "", href: "https://www.linkedin.com/learning/certificates/cae2b2be74934641b0af51bd7c854dc6c830f7fc6808f4e16074df6b743a57de" },
      { name: "Spring Boot: integración de módulos", issuer: "LinkedIn Learning", date: "Jan 2026", href: "https://www.linkedin.com/learning/certificates/320b82379f88da31de0ed5d40a2bb01e933cea8081c95e1c818cd75c4567ccfa" },
    ],
  },
  {
    items: [
      { name: "Model Context Protocol: Advanced Topics", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/qzn7jaj8av76" },
      { name: "Model Context Protocol", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/4ovzww7emfpt" },
      { name: "Claude Code in Action", issuer: "Anthropic", date: "May 2026", href: "https://verify.skilljar.com/c/rcdgxoecp9as" },
      { name: "Software Development with Claude Code", issuer: "DataCamp", date: "Jun 2026", href: "https://www.datacamp.com/completed/statement-of-accomplishment/course/3e013061bf2577a78bd794c8a7e2981e21d2ad23" },
    ],
  },
  {
    items: [
      { name: "Unity Junior Programmer", issuer: "Unity", date: "Apr 2026", href: "https://www.credly.com/badges/386504b3-0be1-4fda-b676-d2652e352b63/public_url" },
      { name: "Hacktoberfest contributor", issuer: "2024 and 2025", date: "" },
    ],
  },
]
