import { redirect } from "next/navigation"
import { auth } from "@/auth"


export const checkUser = async () =>{
    const session = await auth()

    if (!session){
        redirect('/')
    }
}
