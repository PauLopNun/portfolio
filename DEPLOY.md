# 📦 Guía de Deployment a GitHub Pages

## ✅ Cambios Realizados

He configurado tu proyecto para desplegarse automáticamente en GitHub Pages. Los cambios incluyen:

1. **next.config.mjs**: Agregado `output: 'export'` para generar archivos estáticos
2. **.github/workflows/deploy.yml**: Workflow de GitHub Actions para deployment automático
3. **public/.nojekyll**: Archivo para evitar procesamiento de Jekyll
4. **README.md**: Documentación completa del proyecto

## 🚀 Pasos para Activar GitHub Pages

### 1. Sube tu código a GitHub

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 2. Configura GitHub Pages en tu repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En la sección **Build and deployment**:
   - **Source**: Selecciona **GitHub Actions**

¡Eso es todo! No necesitas configurar nada más.

### 3. Verifica el deployment

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow llamado "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (tarda 2-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   ```
   https://tu-usuario.github.io/portfolio-website-creation
   ```

## 🔧 Importante: Actualiza las URLs

Después del primer deployment, actualiza estas URLs en tu README.md:

1. Reemplaza `tu-usuario` con tu nombre de usuario de GitHub
2. Si tu repositorio tiene un nombre diferente, actualiza `portfolio-website-creation`

## 🔄 Deployments Automáticos

Cada vez que hagas push a la rama `main`, tu sitio se actualizará automáticamente:

```bash
# Haz cambios en tu código
git add .
git commit -m "Update portfolio"
git push origin main

# El workflow se ejecutará automáticamente
# En 2-3 minutos verás los cambios reflejados en tu sitio
```

## 🐛 Solución de Problemas

### El workflow falla

1. Ve a Actions → Click en el workflow fallido
2. Revisa los logs para ver el error
3. Errores comunes:
   - **Build errors**: Problemas de TypeScript o linting
   - **Permissions**: Asegúrate de que GitHub Actions tenga permisos de Pages

### El sitio no se ve bien

Si ves que los estilos no cargan o hay errores 404:

1. Verifica que el build local funcione: `pnpm build`
2. Revisa la configuración de basePath si tu repo no se llama "portfolio-website-creation"

### Los permisos de Pages no están configurados

1. Ve a Settings → Actions → General
2. En "Workflow permissions", asegúrate de que esté seleccionado:
   - "Read and write permissions"

## 📝 Comandos Útiles

```bash
# Desarrollo local
pnpm dev

# Build local (para probar antes de subir)
pnpm build

# Ver el sitio generado localmente
# Los archivos estarán en /out
# Puedes usar un servidor estático como:
npx serve out

# Verificar si hay errores de lint
pnpm lint
```

## 🎉 ¡Listo!

Tu portfolio ahora se desplegará automáticamente cada vez que hagas push a main. Solo necesitas:

1. Subir el código a GitHub
2. Configurar GitHub Pages (una sola vez)
3. ¡Disfrutar de tu portfolio online!

---

Si tienes algún problema, revisa los logs en la pestaña Actions de tu repositorio.
