---
id: plan-001
title: Integração de Autenticação com Clerk no TailAdmin Next.js
createdAt: 2025-06-10
author: Nofyz
status: draft
---

## 🧩 Escopo
Implementar autenticação de usuários no template TailAdmin (Next.js v15.2.3, React 19.0.0, Tailwind CSS v4) utilizando Clerk, sem afetar o layout ou funcionalidades existentes.

## ✅ Requisitos Funcionais
- Configurar conta Clerk e obter chaves (publishable e secret).
- Instalar e configurar o SDK `@clerk/nextjs` na versão compatível (`^4.0.0`).
- Criar `src/middleware.ts` (ou `middleware.ts` na raiz) exportando `clerkMiddleware()` e configurando `matcher` para rotas públicas e privadas.
- Modificar `src/app/layout.tsx` para importar e envolver com `<ClerkProvider>` ao redor do layout principal (mantendo ThemeProvider e SidebarProvider).
- Modificar `src/layout/AppHeader.tsx` para importar `{ SignInButton, SignUpButton, SignedIn, SignedOut, UserButton }` de `@clerk/nextjs` e substituir o `<UserDropdown />` pelo bloco de autenticação do Clerk.
- Acessar dados de sessão e usuário via `currentUser()` (Server Components) e `useUser()` (cliente).
- Substituir os formulários de autenticação existentes em `src/app/(full-width-pages)/(auth)/signin/page.tsx` e `src/app/(full-width-pages)/(auth)/signup/page.tsx` pelos componentes `<SignIn />` e `<SignUp />` do Clerk.
- Substituir o conteúdo da página de perfil em `src/app/(admin)/(others-pages)/profile/page.tsx` pelo componente `<UserProfile />` do Clerk para gerenciamento de perfil.
- Manter compatibilidade com SSR e SSG das páginas existentes.

## ⚙️ Requisitos Não-Funcionais
- Performance: autenticação transparente, <100ms de overhead.
- Segurança: rotas protegidas apenas para usuários autenticados; tokens armazenados com segurança.
- Escalabilidade: suportar múltiplos usuários simultâneos sem degradação.
- Alinhar dependências com o projeto (Next.js 15.2.3, React 19.0.0, Tailwind CSS v4, TypeScript ^5, ESLint ^9).

## 📚 Diretrizes & Pacotes
- Next.js: 15.2.3
- React: 19.0.0
- Tailwind CSS: 4.0.0
- TypeScript: ^5.0
- ESLint: ^9.0
- Pacotes adicionais:
  - `@clerk/nextjs` ^4.0.0 (MIT)
- Seguir padrões de código e estilos do template TailAdmin.

## 🔐 Modelo de Ameaças
- Brute force em endpoints de login.
- Vazamento de tokens de sessão.
- Uso de sessões expiradas ou invalidadas.
- XSS/CSRF em fluxos de autenticação.

## 🔢 Plano de Execução

1. Abrir o projeto TailAdmin (Next.js) existente.
2. Executar `npm install` para garantir dependências atuais.
3. Executar `npm install @clerk/nextjs` para adicionar o SDK.
4. Criar `src/middleware.ts` (ou `middleware.ts` na raiz) exportando `clerkMiddleware()` e configurando `matcher` para rotas públicas e privadas.
5. Configurar variáveis de ambiente em `.env.local`: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` e `CLERK_SECRET_KEY` obtidas no painel Clerk.
6. Modificar `src/app/layout.tsx`:
   - Importar `{ ClerkProvider }` de `@clerk/nextjs`.
   - Envolver o conteúdo de `<html>` com `<ClerkProvider>` mantendo o ThemeProvider e SidebarProvider.
7. Modificar `src/layout/AppHeader.tsx`:
   - Importar `{ SignInButton, SignUpButton, SignedIn, SignedOut, UserButton }` de `@clerk/nextjs`.
   - Substituir o `<UserDropdown />` existente por:
     ```tsx
     <div className="flex items-center gap-4">
       <SignedOut>
         <SignInButton />
         <SignUpButton />
       </SignedOut>
       <SignedIn>
         <UserButton />
       </SignedIn>
     </div>
     ```
8. Modificar as páginas de autenticação:
   - Em `src/app/(full-width-pages)/(auth)/signin/page.tsx`, remover `<SignInForm />` e adicionar `<SignIn />` do Clerk.
   - Em `src/app/(full-width-pages)/(auth)/signup/page.tsx`, remover `<SignUpForm />` e adicionar `<SignUp />` do Clerk.
   - Ajustar `src/app/(full-width-pages)/(auth)/layout.tsx` para centralizar os componentes do Clerk, se necessário.
9. Testar o fluxo de SignUp e SignIn via `npm run dev`, acessando as rotas `/signin` e `/signup`.
10. Proteger páginas específicas (ex: `/dashboard`, `/profile`) com o middleware e configurar redirecionamentos automáticos para `/sign-in`.
11. Modificar a página de perfil (`src/app/(admin)/(others-pages)/profile/page.tsx`):
    - Substituir os componentes existentes (`UserMetaCard`, `UserInfoCard`, `UserAddressCard`) pelo componente `<UserProfile />` do Clerk.
    - Centralizar o componente `<UserProfile />` na página para uma melhor visualização.
12. Exibir informações do usuário no painel (nome, email, avatar) usando o hook `useUser()` (cliente) e `currentUser()` em Server Components.
13. Validar performance (<100ms de overhead) e segurança (rotas protegidas, tokens seguros) localmente.
14. Documentar alterações, remover componentes de autenticação e perfil legados (`SignInForm`, `SignUpForm`, `UserDropdown`, `UserMetaCard`, `UserInfoCard`, `UserAddressCard`, etc.) e preparar para deploy.
