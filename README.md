# Portfolio Website

A responsive portfolio website with automated testing and CI/CD pipeline.

🔗 **Live Demo:** [https://your-site.netlify.app](https://your-site.netlify.app)

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── src/                    # Source files
│   ├── styles.css          # Stylesheet
│   └── script.js           # JavaScript
├── assets/                 # Static assets
│   └── me.jpeg             # Images
├── tests/                  # Test files
│   └── portfolio.spec.js   # Playwright tests (25 tests)
├── k8s/                    # Kubernetes configs
│   └── deployment.yaml     # K8s deployment
├── ci/                     # CI/CD files
│   ├── Dockerfile          # Docker configuration
│   ├── docker-compose.yml  # Docker Compose
│   └── Jenkinsfile         # Jenkins pipeline
├── playwright.config.js    # Test configuration
├── netlify.toml            # Netlify config
└── package.json            # Dependencies
```

---

## 📚 Resources

- **Playwright Config:** https://playwright.dev/docs/test-configuration
- **Writing Tests:** https://playwright.dev/docs/writing-tests

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Testing:** Playwright (25 automated tests)
- **CI/CD:** Jenkins → Kubernetes → Netlify
- **Containerization:** Docker
- **Orchestration:** Kubernetes

---

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/ANASSBOUGRAINE212/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run tests
npm test

# Serve locally
npx serve .
```

### Docker
```bash
# Build and run
docker-compose -f ci/docker-compose.yml up -d

# Access at http://localhost:8080
```

### Kubernetes
```bash
# Deploy
kubectl apply -f k8s/

# Access at http://localhost:30080
```

---

## 🧪 Testing

This project includes **25 automated end-to-end tests** using Playwright:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

### Test Coverage:
- ✅ Page load and structure
- ✅ Navigation functionality
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Typing animation
- ✅ Social media links
- ✅ Contact information
- ✅ Accessibility features
- ✅ Keyboard navigation

---

## 🐳 Docker

### Run Locally with Docker

```bash
# Build image
docker build -f ci/Dockerfile -t portfolio:latest .

# Run container
docker run -d -p 8081:80 --name portfolio-app portfolio:latest

# Access at http://localhost:8081
```

### Cleanup Docker

```bash
# Stop and remove container
docker stop portfolio-app
docker rm portfolio-app

# Remove image
docker rmi portfolio:latest
```

---

## ☸️ Kubernetes

### Deploy to Kubernetes

```bash
# Build Docker image first
docker build -f ci/Dockerfile -t portfolio:latest .

# Load image into Minikube
minikube image load portfolio:latest

# Deploy
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get svc

# Get URL
minikube service portfolio-service --url
```

### Cleanup Kubernetes

```bash
# Delete deployment and service
kubectl delete -f k8s/

# Delete old test jobs
kubectl delete job --all

# Remove image from Minikube
minikube image rm portfolio:latest
```

---

## 🔄 CI/CD Pipeline

### Automated Deployment Flow:

```
Git Push
   ↓
Jenkins Triggers
   ↓
Kubernetes Job (Build & Test)
   ├── Install dependencies
   ├── Run Playwright tests
   └── Validate build
   ↓
Deploy to Netlify
   ↓
Live Production Site ✨
```

---

## 🌐 Deployment

### Netlify 

Automatically deployed via Jenkins pipeline on every push to main branch.

**Manual Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

