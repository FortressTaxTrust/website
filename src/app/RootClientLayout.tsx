'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from './providers'
import { parseJWT } from '@/utils/parseTokenId'

const ALLOWED_ADMIN_USER_SUB = process.env.NEXT_PUBLIC_ADMIN_COGNITO_ID;

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Determine if we should show the main header and footer
  const showMainLayout = !pathname.startsWith('/admin')

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (pathname.startsWith('/admin')) {
        setIsLoading(true)
        try {
          // The recommended way is `Auth.currentSession()` to ensure the token is valid.
          // const session = await Auth.currentSession();
          // const idToken = session.getIdToken().getJwtToken();

          // Getting the token directly from localStorage. Note: This might be an expired token.
          // Amplify stores tokens under a key like `CognitoIdentityServiceProvider.<client_id>.<username>.idToken`
          const idToken = localStorage.getItem('idToken');
          const decodedToken = idToken ? parseJWT(idToken) : null;

          console.log("Decoded" , decodedToken)
          const username = decodedToken?.["cognito:username"] || decodedToken?.sub;
          console.log("username" ,username)
          console.log("ADMIN_COGNITO_ID" , ALLOWED_ADMIN_USER_SUB)
          if (decodedToken && username === ALLOWED_ADMIN_USER_SUB) {
            setIsAdminAuthorized(true)
          } else {
            router.push('/')
          }
        } catch (error) {
          console.error("Error checking admin access:", error)
          router.push('/')
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsAdminAuthorized(true)
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [pathname, router])

  // If it's an admin path and still loading, show a loading message
  if (pathname.startsWith('/admin') && isLoading) {
    return <Providers><div className="flex justify-center items-center min-h-screen text-lg">Loading</div></Providers>
  }

  // If it's an admin path and not authorized, the redirect would have already happened.
  // This return null acts as a safeguard to prevent rendering unauthorized content.
  if (pathname.startsWith('/admin') && !isAdminAuthorized && !isLoading) {
    return null;
  }

  return (
    <Providers>
        {showMainLayout && <Header />}
        {showMainLayout ? (<main className="flex-grow pt-20">{children}</main>) : (<main>{children}</main>)}
        {showMainLayout && <Footer />}
    </Providers>
  )
}
