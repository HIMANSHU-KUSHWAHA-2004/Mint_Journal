import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { login as authLogin} from '../../features/authSlice'
import {Button,Input,Logo} from '../index'
import { useDispatch } from 'react-redux'
import authservice_obj from '../../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authservice_obj.login(data)
            if (session) {
                const userData = await authservice_obj.currentUser()
                if (userData) dispatch(authLogin({ userData }));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='px-5 py-14 sm:py-20'>
        <div className='mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/10 sm:p-10'>
        <div className="mb-7 flex justify-center">
                    <Logo />
        </div>
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-amber-600">Welcome back</p>
        <h2 className="mt-2 text-center font-serif text-4xl font-bold leading-tight text-slate-900">Sign in to your account</h2>
        <p className="mt-3 text-center text-sm leading-6 text-slate-500">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-bold text-amber-700 transition hover:text-amber-800 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="mt-6 rounded-xl bg-rose-50 p-3 text-center text-sm text-rose-700">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in →</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
