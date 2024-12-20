'use client'

// react, nextjs
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// components
import AuthForm from '@/components/form/AuthForm'
// actions
// fonts
import { silkscreen } from '@/fonts/fonts'
// utils
import swal from "sweetalert2";
import { useAppDispatch } from '@/redux/hook'
import { updateUser } from '@/redux/slices/userSlice/userSlice'
import { AxiosResponse } from 'axios'
import { authApiService } from '@/api/auth/auth'
import { updateAuth } from '@/redux/slices/authSlice/authSlice'
import { setAuthCookies, clearAuthCookies, getCookie } from '@/utils/cookies'
import getUserInfo from '@/api/auth/getUserInfo'
import LoadingText from '@/components/ui/loadingText'

function LoginPage() {
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const onSubmitHandler = async (value: any) => {
        try {
            setIsLoading(true)
            const response: AxiosResponse = await authApiService.Login(value)
            if (response.status === 200) {
                const token = response.data.accessToken
                setAuthCookies()
                dispatch(updateAuth({ token: token }))
                const user = await getUserInfo()
                if (user) {
                    dispatch(updateUser({
                        email: user.email,
                        username: user.username,
                        userId: user.id,
                        profileImage: user.profile_image
                    }))
                }
                router.push('/user-dashboard')
                swal.fire({
                    icon: 'success',
                    title: 'xdding?',
                    html: `Login success!`,
                })
            }
        } catch (error: any) {
            if (error.response) {
                console.log(error)
                clearAuthCookies()
                return swal.fire({
                    icon: 'error',
                    title: 'xdding?',
                    text: `Login failed! - Error ${error.response.data.message}`,
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const authStatus = getCookie('u_auth_status')
        if (authStatus === 'active') {
            router.push('/user-dashboard')
        }
    }, [router])

    if (isLoading) {
        return <LoadingText />
    }

    return (
        <div className={`login-page-container ${silkscreen.className} flex flex-col w-full h-full justify-center justify-items-center p-8 gap-y-4`}>
            <AuthForm pageType='login' onFormSubmit={onSubmitHandler} />
        </div>
    )
}

export default LoginPage