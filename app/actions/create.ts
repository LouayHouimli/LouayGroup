"use server"

import { signOut } from "@/auth"

export const createProject = async (formData : FormData) => {


    console.log(formData)

}

export const signOutUSer = async () =>{
    await signOut({redirectTo : "/login"})
}