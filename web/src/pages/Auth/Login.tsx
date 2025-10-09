import { BrandLogoSvg, GoogleSvg, FacebookSvg } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import heroImage from '@/assets/hero.png';
import { Link } from "react-router";
import { useState } from 'react';
import authApi from '@/lib/auth';
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAppDispatch } from '@/app/hooks';
import {
    isLoggedIn
} from '../../features/userSlice';
import toast, { Toaster } from 'react-hot-toast';
import { handleApiError, showAuthSuccess } from '@/lib/errorHandler';


const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(8, { message: "Password has to be at least 8 characters long." }).max(72, { message: "Password cannot be longer than 72 characters." }),
})

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useAppDispatch();
    const navigate = useNavigate()



    const handleSubmit = async (data: typeof formData) => {
        try {
            const validatedData = signInSchema.parse(data)

            const response = await authApi.login(validatedData);
            dispatch(isLoggedIn(response.email));
            showAuthSuccess.login();
            navigate('/dashboard');
        } catch (err) {
            if (err instanceof z.ZodError) {
                const messages = err.issues.map(e => e.message);
                messages.forEach(m => toast.error(m));
            } else {
                handleApiError(err);
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="bg-background-light dark:bg-background-dark font-display">
            <Toaster />
            <div className="flex min-h-screen">
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className='mb-8'>
                            <div className='flex items-center gap-3 mb-2'>
                                <BrandLogoSvg className='text-primary size-10' />
                                <h1 className='text-4xl font-medium text-foreground-light dark:text-foreground-dark'>Finance Tracker</h1>
                            </div>
                            <p className='mt-2 text-sm text-muted-light dark:text-muted-dark'>Welcome! Log in or create an account to manage your budget.</p>
                        </div>
                        <form className="space-y-3" onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit(formData)
                        }}>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Email or Username
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    required
                                    onChange={handleChange}
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Password
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                            <div className='mt-6'>
                                <Link to="/dashboard" className='mt-6 text-primary hover:text-primary/80 text-sm font-medium'>Forgot your password?</Link>
                            </div>
                            <div className='mt-6'>
                                <Button type="submit" className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold">
                                    Log in
                                </Button>
                            </div>
                        </form>
                        <div className='my-6 justify-items-center'>
                            <p className='my-4 text-sm text-muted-light dark:text-muted-dark'>Or continue with</p>
                        </div>
                        <div className='my-6 flex justify-items-stretch gap-x-4'>
                            <div className='w-1/2'>
                                <Button title='Sign in with Google' className="w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                    <GoogleSvg className='opacity-50 size-5 fill-inherit' />
                                </Button>
                            </div>
                            <div className='w-1/2'>
                                <Button title='Sign in with Facebook' className="w-full inline-flex justify-center rounded-lg border border-border-light dark:border-border-dark bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                    <FacebookSvg className='size-5 opacity-50 fill-inherit' />
                                </Button>
                            </div>
                        </div>
                        <div className='block'>
                            <Link to="/register" className='mt-6 text-primary hover:text-primary/80 text-sm font-medium'>
                                <Button title='Create Account' className="w-full flex justify-center rounded-lg bg-primary/20 dark:bg-primary/30 py-2 px-4 text-sm font-semibold text-primary shadow-sm hover:bg-primary/30 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" style={{ color: '#13a4ec' }}>
                                    Create an account
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>

                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        alt="A person smiling while looking at their finances on a laptop"
                        className="absolute inset-0 h-full w-full object-cover"
                        src={heroImage}
                    />
                </div>
            </div>
        </div>
    );
}
