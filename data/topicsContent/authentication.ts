export const authentication = `## 🔐 Autenticação e Segurança

### JWT (JSON Web Token)

#### O que é JWT?
JWT é um padrão aberto (RFC 7519) que define uma maneira compacta e autocontida de transmitir informações entre partes como um objeto JSON.

#### Estrutura do JWT:

\`\`\`
xxxxx.yyyyy.zzzzz
  │     │     │
Header Payload Signature
\`\`\`

**Exemplo real**:
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
\`\`\`

#### Partes do Token:

##### 1. Header (Cabeçalho)
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`
- **alg**: Algoritmo de criptografia (HS256, RS256, etc)
- **typ**: Tipo do token (JWT)

##### 2. Payload (Dados)
\`\`\`json
{
  "sub": "123", // ID do usuário
  "name": "Felipe Maccari",
  "email": "felipe@cantina.com",
  "role": "admin",
  "iat": 1516239022, // Issued at (emitido em)
  "exp": 1516242622  // Expiration (expira em)
}
\`\`\`

##### 3. Signature (Assinatura)
\`\`\`javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
\`\`\`

### Como Funciona o JWT?

#### Fluxo Completo de Autenticação:

\`\`\`
1. Cliente: Login com email/senha
   POST /auth/login
   { "email": "user@cantina.com", "password": "senha123" }
   
   ↓

2. Servidor: Valida credenciais
   - Busca usuário no banco
   - Compara hash da senha
   - Se válido, gera JWT
   
   ↓

3. Servidor: Retorna JWT
   {
     "access_token": "eyJhbGci...",
     "expires_in": 3600
   }
   
   ↓

4. Cliente: Armazena token
   - localStorage
   - sessionStorage
   - Cookie httpOnly
   
   ↓

5. Cliente: Usa token em requisições futuras
   GET /produtos
   Authorization: Bearer eyJhbGci...
   
   ↓

6. Servidor: Valida token
   - Verifica assinatura
   - Checa expiração
   - Extrai dados do usuário
   
   ↓

7. Servidor: Retorna dados
   { "produtos": [...] }
\`\`\`

### Função Principal do JWT:
**Cliente envia em requisições futuras para comprovar identidade, sem reenviar credenciais**

### Implementação no NestJS:

#### 1. Instalar Dependências
\`\`\`bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
npm install bcrypt
npm install -D @types/bcrypt
\`\`\`

#### 2. Configurar JWT Module
\`\`\`typescript
// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { 
        expiresIn: '24h' // Token expira em 24 horas
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
\`\`\`

#### 3. Auth Service (Lógica de Autenticação)
\`\`\`typescript
// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // 1. Buscar usuário
    const user = await this.prisma.usuario.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 2. Validar senha
    const isPasswordValid = await bcrypt.compare(password, user.senhaHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 3. Gerar JWT
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role
      }
    };
  }

  async register(nome: string, email: string, password: string) {
    // 1. Hash da senha
    const senhaHash = await bcrypt.hash(password, 10);

    // 2. Criar usuário
    const user = await this.prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        role: 'user'
      }
    });

    // 3. Retornar token
    return this.login(email, password);
  }
}
\`\`\`

#### 4. JWT Strategy (Validação do Token)
\`\`\`typescript
// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // O que retornar aqui fica disponível em req.user
    return { 
      userId: payload.sub, 
      email: payload.email,
      role: payload.role 
    };
  }
}
\`\`\`

#### 5. Auth Controller (Endpoints)
\`\`\`typescript
// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  async register(@Body() registerDto: { 
    nome: string; 
    email: string; 
    password: string 
  }) {
    return this.authService.register(
      registerDto.nome,
      registerDto.email,
      registerDto.password
    );
  }
}
\`\`\`

#### 6. JWT Auth Guard (Proteção de Rotas)
\`\`\`typescript
// jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// Usando em controllers
@Controller('produtos')
export class ProdutosController {
  @Get()
  @UseGuards(JwtAuthGuard) // Rota protegida
  async findAll(@Request() req) {
    console.log(req.user); // Dados do token
    return this.produtosService.findAll();
  }
}
\`\`\`

### Vantagens do JWT:

#### ✅ Stateless (Sem Estado no Servidor)
- Servidor não armazena sessões
- Escalável horizontalmente
- Menor uso de memória

\`\`\`
Tradicional (Session):          JWT (Stateless):
Servidor guarda sessão      →   Token contém tudo
Redis/Memcache necessário   →   Não precisa armazenamento
Difícil escalar             →   Fácil escalar
\`\`\`

#### ✅ Seguro e Criptografado
- Assinado digitalmente
- Não pode ser alterado sem detectar
- Expira automaticamente

#### ✅ Padrão da Indústria
- RFC 7519
- Bibliotecas em todas linguagens
- Amplamente testado e auditado

#### ✅ Portabilidade
- Funciona entre diferentes domínios
- Mobile, Web, Desktop
- Microserviços se comunicam facilmente

### Segurança: Boas Práticas

#### ⚠️ Armazenamento do Token (Cliente)

**Opções**:

1. **localStorage** ❌
   - Vulnerável a XSS (Cross-Site Scripting)
   - Qualquer script pode ler

2. **sessionStorage** ⚠️
   - Melhor que localStorage
   - Ainda vulnerável a XSS
   - Perdido ao fechar aba

3. **Cookie httpOnly** ✅ (Recomendado)
   - Inacessível via JavaScript
   - Protegido contra XSS
   - Configurar sameSite e secure

\`\`\`typescript
// Configurar cookie httpOnly
@Post('login')
async login(@Body() loginDto, @Res() response) {
  const result = await this.authService.login(loginDto.email, loginDto.password);
  
  response.cookie('access_token', result.access_token, {
    httpOnly: true,  // Não acessível via JS
    secure: true,    // Apenas HTTPS
    sameSite: 'strict', // Proteção CSRF
    maxAge: 24 * 60 * 60 * 1000 // 24h
  });
  
  return response.json({ user: result.user });
}
\`\`\`

#### 🔒 Outras Práticas Importantes:

1. **Secret Forte**
\`\`\`bash
# Gerar secret aleatório
JWT_SECRET=$(openssl rand -base64 64)
\`\`\`

2. **Tempo de Expiração Curto**
\`\`\`typescript
signOptions: { expiresIn: '15m' } // 15 minutos
\`\`\`

3. **Refresh Token**
\`\`\`typescript
// Token principal: 15 min
// Refresh token: 7 dias (armazenado seguro)
\`\`\`

4. **HTTPS Obrigatório** em produção

5. **Rate Limiting**
\`\`\`typescript
@UseGuards(ThrottlerGuard)
@Post('login')
// Limita tentativas de login
\`\`\`

### Fluxo com Refresh Token:

\`\`\`
1. Login → Access Token (15min) + Refresh Token (7 dias)
2. Requisições usam Access Token
3. Access Token expira
4. Cliente usa Refresh Token para obter novo Access Token
5. Continua usando novo Access Token
6. Refresh Token expira → Novo login necessário
\`\`\`

### Exemplo Frontend (React):

\`\`\`typescript
// Login
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
};

// Fazer requisição autenticada
const fetchProdutos = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/produtos', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
  
  return response.json();
};
\`\`\`

### Verificar Token (Debugging):

Acesse [jwt.io](https://jwt.io) e cole seu token para ver o conteúdo decodificado.

### Resumo:

| Conceito | Descrição |
|----------|-----------|
| JWT | Token autocontido com dados do usuário |
| Stateless | Servidor não guarda estado |
| Assinado | Garante que não foi alterado |
| Expirável | Segurança temporal |
| Bearer Token | Enviado em header Authorization |
| httpOnly Cookie | Forma mais segura de armazenar |
`;
