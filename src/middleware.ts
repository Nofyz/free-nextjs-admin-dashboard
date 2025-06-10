import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Rotas públicas que não precisam de autenticação
  publicRoutes: ["/", "/signin", "/signup"],
  
  // Rotas que serão ignoradas pelo middleware
  ignoredRoutes: ["/api/webhook"]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 