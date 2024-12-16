import React from 'react'
import { ProfileForm } from '@/components/form'
import { checkUser } from '@/hooks/check-user'
 function DashboardPage () {
  checkUser()
  return (
    <div><ProfileForm/></div>
  )
}

export default DashboardPage