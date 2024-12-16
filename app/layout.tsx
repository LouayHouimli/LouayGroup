import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value ? cookieStore.get("sidebar:state")?.value === "true" : true;
  const session = await auth()
  

  return (
    <html suppressHydrationWarning>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {session ? (<SidebarProvider hidden defaultOpen={defaultOpen}>
          <AppSidebar user={session?.user} />
          <SidebarTrigger/>
          <main className="flex justify-center items-center  mx-auto min-h-screen">
           
            <div className="w-full flex justify-center items-center">

           
            {children}

            </div>
          </main>
        </SidebarProvider>) : (

<main className="flex justify-center items-center  mx-auto min-h-screen">
           
<div className="w-full flex justify-center items-center">


{children}

</div>
</main>
        )

        }
        </ThemeProvider>

      </body>
    </html>
  );
}