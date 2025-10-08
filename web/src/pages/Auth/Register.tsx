import { BrandLogoSvg, GoogleSvg, FacebookSvg } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import heroImage from '@/assets/hero.png';
import { Link } from "react-router";


export default function Register() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display">
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
                        <form className="space-y-3">
                            <label htmlFor="name" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Full Name
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Email
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Password
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                Confirm Password
                            </label>
                            <div className="space-y-2">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className='w-full border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                                />
                            </div>
                        </form>
                        <div className='mt-6'>
                            <Button type="submit" className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold">
                                Sign Up
                            </Button>
                        </div>
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

                        <div className='mt-6 flex justify-center'>
                            <Link to="/login" className='mt-6 text-primary hover:text-primary/80 text-sm font-medium'>Already have an account?</Link>
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
