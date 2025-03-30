"use client"
import React from 'react'
import { withAuth } from "@/utils/withAuth"
 
function Profile() {
  return (
    <div>Profile</div>
  )
}

export default withAuth(Profile)

