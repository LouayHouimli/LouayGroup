import { ProfileForm } from "@/components/form"
 import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
export default async function Home() {
  const session= await auth()
  
  console.log(session)
  return (
  <div>
  
  {!session && <form
      action={async () => {
        "use server"
        await signIn("github",{redirectTo : "/dashboard"})
        
       
      }}
    >
      <Button type="submit">Signin with GitHub</Button>
    </form>}
    {session && <form
      action={async () => {
        "use server"
        await signOut({redirectTo : "/"})
       
      }}
    >
      <Button type="submit">SignOut</Button>
    </form>}
  </div>
)
}