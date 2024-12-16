import { auth } from "@/auth"

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  if (req.auth && req.nextUrl.pathname == "/login" || req.nextUrl.pathname == "/register"){
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})