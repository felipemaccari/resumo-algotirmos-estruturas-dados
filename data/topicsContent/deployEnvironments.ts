export const deployEnvironments = `## 🚀 Ambientes e Deploy

### Ambientes de Desenvolvimento

#### 1. Desenvolvimento (Development)
**Local**: Máquina do desenvolvedor

\`\`\`
Características:
✓ Banco de dados local
✓ Hot reload ativo
✓ Debug habilitado
✓ Logs detalhados
✓ Variáveis de ambiente de dev
✓ Sem restrições de CORS
\`\`\`

**Comandos**:
\`\`\`bash
npm run start:dev
# ou
docker-compose up
\`\`\`

**Exemplo .env.development**:
\`\`\`bash
NODE_ENV=development
DATABASE_URL=postgresql://cantina:senha@localhost:5432/cantina_dev
JWT_SECRET=secret_desenvolvimento
PORT=3000
LOG_LEVEL=debug
\`\`\`

#### 2. Homologação (Staging)
**Cloud**: Ambiente de testes similar à produção

\`\`\`
Características:
✓ Servidor dedicado
✓ Banco de dados separado
✓ Configurações similares à produção
✓ Testes de integração
✓ Validação de features
✓ Ambiente para QA testar
\`\`\`

**Objetivo**: Testar em cenário controlado similar ao real antes de deploy em produção

**Exemplo .env.staging**:
\`\`\`bash
NODE_ENV=staging
DATABASE_URL=postgresql://user:pass@staging-db.com:5432/cantina_staging
JWT_SECRET=secret_homologacao_seguro
PORT=3000
LOG_LEVEL=info
CORS_ORIGIN=https://staging.cantina.com
\`\`\`

#### 3. Produção (Production)
**Cloud**: Ambiente final para clientes/usuários

\`\`\`
Características:
✓ Alta disponibilidade
✓ Backups automáticos
✓ Monitoramento 24/7
✓ SSL/HTTPS obrigatório
✓ Logs de erro apenas
✓ Performance otimizada
✓ Segurança máxima
\`\`\`

**Exemplo .env.production**:
\`\`\`bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@prod-db.com:5432/cantina_prod
JWT_SECRET=secret_super_seguro_aleatorio_longo
PORT=80
LOG_LEVEL=error
CORS_ORIGIN=https://cantina.com
RATE_LIMIT=100
\`\`\`

### Fluxo de Deploy:

\`\`\`
Desenvolvimento → Homologação → Produção
     (local)      →  (staging)  →   (prod)
       ↓                ↓              ↓
    Testes         Testes QA      Usuários
   Unitários       Integração      Finais
\`\`\`

### CI/CD (Integração/Entrega Contínua)

#### O que é CI/CD?

**CI (Continuous Integration)**: Integração Contínua
- Desenvolvedores integram código frequentemente
- Builds automáticos
- Testes automáticos
- Detecção rápida de problemas

**CD (Continuous Delivery/Deployment)**: Entrega/Deploy Contínuo
- Deploy automatizado
- Releases frequentes
- Rollback fácil se necessário

#### Objetivo Principal:
**Automatizar build, testes e deploy para maior agilidade e segurança**

### Pipeline CI/CD Típico:

\`\`\`
1. Developer faz commit/push
   ↓
2. CI detecta mudança
   ↓
3. Build da aplicação
   ↓
4. Executar testes
   ├─ Testes unitários
   ├─ Testes de integração
   └─ Testes E2E
   ↓
5. Análise de código
   ├─ Linting
   ├─ Code coverage
   └─ Security scan
   ↓
6. Deploy em Homologação
   ↓
7. Testes automáticos em Staging
   ↓
8. Aprovação manual (opcional)
   ↓
9. Deploy em Produção
   ↓
10. Monitoramento e alertas
\`\`\`

### Exemplo GitHub Actions (CI/CD):

\`\`\`yaml
# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test
    
    - name: Run tests with coverage
      run: npm run test:cov
    
  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t cantina-backend .
    
    - name: Push to Docker Registry
      run: |
        docker tag cantina-backend registry.com/cantina:$\{{ github.sha }}
        docker push registry.com/cantina:$\{{ github.sha }}
  
  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to Staging
      run: |
        ssh staging-server "docker pull registry.com/cantina:$\{{ github.sha }}"
        ssh staging-server "docker-compose up -d"
  
  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - name: Deploy to Production
      run: |
        ssh prod-server "docker pull registry.com/cantina:$\{{ github.sha }}"
        ssh prod-server "docker-compose up -d"
        
    - name: Health check
      run: curl -f https://cantina.com/health || exit 1
\`\`\`

### Benefícios do CI/CD:

#### ✅ Para Desenvolvedores
- Deploy automatizado (sem processo manual)
- Feedback rápido sobre problemas
- Menos bugs em produção
- Mais tempo para desenvolver features

#### ✅ Para o Projeto
- Entregas mais frequentes
- Qualidade consistente
- Rollback rápido em caso de problemas
- Documentação automática do processo

#### ✅ Para o Negócio
- Time-to-market menor
- Mais confiança nas releases
- Redução de custos com bugs
- Satisfação do cliente

### Estratégias de Deploy:

#### 1. Blue-Green Deployment
\`\`\`
[Blue]  Versão antiga rodando
[Green] Nova versão em paralelo
         ↓ testes OK
[Blue]  Desligado
[Green] Recebe 100% do tráfego
\`\`\`

#### 2. Canary Release
\`\`\`
Produção: 95% tráfego → Versão antiga
          5% tráfego  → Nova versão
              ↓ sem problemas
Produção: 100% tráfego → Nova versão
\`\`\`

#### 3. Rolling Deployment
\`\`\`
Servidor 1: Atualizado
Servidor 2: Atualizado
Servidor 3: Atualizado
(um de cada vez)
\`\`\`

### Monitoramento Pós-Deploy:

#### Métricas Importantes:
- **Uptime**: Sistema está no ar?
- **Response Time**: Velocidade das requisições
- **Error Rate**: Taxa de erros
- **CPU/Memory**: Uso de recursos
- **Database**: Performance das queries

#### Ferramentas Comuns:
- **Sentry**: Tracking de erros
- **DataDog**: Monitoramento completo
- **New Relic**: Performance monitoring
- **Grafana**: Dashboards customizados
- **CloudWatch**: AWS monitoring

### Checklist de Deploy:

\`\`\`
□ Todos os testes passando
□ Code review aprovado
□ Migrations testadas
□ Variáveis de ambiente configuradas
□ Backup do banco feito
□ Plano de rollback definido
□ Monitoramento configurado
□ Documentação atualizada
□ Stakeholders notificados
□ Health checks configurados
\`\`\`

### Rollback em Caso de Problema:

\`\`\`bash
# Reverter para versão anterior
docker pull registry.com/cantina:versao-anterior
docker-compose up -d

# Ou com git
git revert <commit-hash>
git push

# CI/CD faz deploy automático da reversão
\`\`\`

### Boas Práticas:

1. **Sempre testar em Staging** antes de Produção
2. **Manter ambientes similares** (dev, staging, prod)
3. **Automatizar tudo** que for possível
4. **Monitorar constantemente** após deploy
5. **Ter plano de rollback** sempre pronto
6. **Deploy em horários de baixo tráfego**
7. **Comunicar equipe** sobre deploys
8. **Documentar mudanças** em changelog

### Variáveis de Ambiente por Ambiente:

\`\`\`typescript
// config.service.ts
export class ConfigService {
  get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }
  
  get isProduction() {
    return process.env.NODE_ENV === 'production';
  }
  
  get databaseUrl() {
    return process.env.DATABASE_URL;
  }
  
  get jwtSecret() {
    if (this.isProduction && !process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET must be set in production');
    }
    return process.env.JWT_SECRET;
  }
}
\`\`\`

### Resumo:

| Ambiente | Propósito | Deploy |
|----------|-----------|--------|
| Development | Desenvolvimento local | Manual |
| Staging | Testes antes da produção | Automático (CI/CD) |
| Production | Usuários finais | Automático (CI/CD) |
`;
