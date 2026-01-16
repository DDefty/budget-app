import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { EditSvg, RightArrSvg } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { isLoggedOut, updateUser } from "@/features/userSlice";
import { handleApiError } from "@/lib/errorHandler";
import { settingsApi } from "@/lib/settings";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import z from "zod";

export default function Settings() {
    const { email, name, gender, birth_date } = useAppSelector(u => u.user);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputPassword, setInputPassword] = useState('');
    const [inputName, setInputName] = useState(name);
    const [inputGender, setInputGender] = useState(gender);
    const [inputDate, setInputDate] = useState(birth_date?.toString().slice(0, 10))
    const [openInput, setOpenInput] = useState('');
    const dispatch = useAppDispatch();

    const handlePressSave = async (field: string, value: string) => {
        try {
            const response = await settingsApi.editSettings(field, value);
            dispatch(updateUser(response));
            setOpenInput('');
            toast.success('Success');
        } catch (err) {
            if (err instanceof z.ZodError) {
                const messages = err.issues.map(e => e.message);
                messages.forEach(m => toast.error(m));
            } else {
                handleApiError(err);
            }
            setOpenInput('');
        }
    }
    return (
        <div className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
            <Toaster />
            <div className="w-full max-w-4xl space-y-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <div>
                    <h2 className="text-xl font-semibold my-10">Account</h2>
                    <div className="divide-y-2 rounded-lg overflow-hidden my-4 bg-white shadow-sm">
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Email</h3>
                                {openInput === 'email' ? <Input type="email" data-testid="settings-email-input" value={inputEmail?.toString() || ''} onChange={(e) => setInputEmail(e.target.value)}></Input> : <p className="text-muted-light">{email}</p>}
                            </div>
                            <div className="ml-auto mr-6 transition-all">
                                {openInput === 'email' ?
                                    <div className="flex">
                                        <Button data-testid="settings-email-save-button" className="w-50 h-10 rounded-lg mr-6 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => handlePressSave('email', inputEmail?.toString() || '')}>Save</Button>
                                        <Button data-testid="settings-email-cancel-button" className="w-50 h-10 rounded-lg bg-background-light hover:bg-background-light/50 text-foreground-light shadow-sm" onClick={() => setOpenInput('')}>Cancel</Button>
                                    </div>
                                    :
                                    <Button data-testid="settings-email-edit-button" onClick={() => setOpenInput('email')}>
                                        <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                                    </Button>}
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Password</h3>
                                {openInput === 'password' ? <Input type="password" data-testid="settings-password-input" value={inputPassword || ''} onChange={(e) => setInputPassword(e.target.value)}></Input> : <p className="text-muted-light">********</p>}
                            </div>
                            <div className="ml-auto mr-6 transition-all">
                                {openInput === 'password' ?
                                    <div className="flex">
                                        <Button data-testid="settings-password-save-button" className="w-50 h-10 rounded-lg mr-6 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => handlePressSave('password', inputPassword?.toString() || '')}>Save</Button>
                                        <Button data-testid="settings-password-cancel-button" className="w-50 h-10 rounded-lg bg-background-light hover:bg-background-light/50 text-foreground-light shadow-sm" onClick={() => setOpenInput('')}>Cancel</Button>
                                    </div>
                                    :
                                    <Button data-testid="settings-password-edit-button" onClick={() => setOpenInput('password')}>
                                        <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                                    </Button>}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold my-10">Personal Information</h2>
                    <div className="divide-y-2 rounded-lg overflow-hidden my-4 bg-white shadow-sm">
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Name</h3>
                                {openInput === 'name' ? <Input data-testid="settings-name-input" value={inputName?.toString() || ''} onChange={(e) => setInputName(e.target.value)}></Input> : <p className="text-muted-light">{name}</p>}
                            </div>
                            <div className="ml-auto mr-6 transition-all">
                                {openInput === 'name' ?
                                    <div className="flex">
                                        <Button data-testid="settings-name-save-button" className="w-50 h-10 rounded-lg mr-6 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => handlePressSave('name', inputName?.toString() || '')}>Save</Button>
                                        <Button data-testid="settings-name-cancel-button" className="w-50 h-10 rounded-lg bg-background-light hover:bg-background-light/50 text-foreground-light shadow-sm" onClick={() => setOpenInput('')}>Cancel</Button>
                                    </div>
                                    :
                                    <Button data-testid="settings-name-edit-button" onClick={() => setOpenInput('name')}>
                                        <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                                    </Button>}
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Gender</h3>
                                {openInput === 'gender' ? <Input data-testid="settings-gender-input" value={inputGender?.toString() || ''} onChange={(e) => setInputGender(e.target.value)}></Input> : <p className="text-muted-light">{gender === 'F' ? 'Female' : gender === 'M' ? 'Male' : '-'}</p>}
                            </div>
                            <div className="ml-auto mr-6">
                                {openInput === 'gender' ?
                                    <div className="flex">
                                        <Button data-testid="settings-gender-save-button" className="w-50 h-10 rounded-lg mr-6 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => handlePressSave('gender', inputGender?.toString() || '')}>Save</Button>
                                        <Button data-testid="settings-gender-cancel-button" className="w-50 h-10 rounded-lg bg-background-light hover:bg-background-light/50 text-foreground-light shadow-sm" onClick={() => setOpenInput('')}>Cancel</Button>
                                    </div>
                                    :
                                    <Button data-testid="settings-gender-edit-button" onClick={() => setOpenInput('gender')}>
                                        <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                                    </Button>}
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Date of Birth</h3>
                                12.02.1999
                            </div>
                            <div className="ml-auto mr-6">
                                {openInput === 'birth_date' ?
                                    <div className="flex">
                                        <Button data-testid="settings-birthdate-save-button" className="w-50 h-10 rounded-lg mr-6 bg-primary hover:bg-primary/90 text-white shadow-sm" onClick={() => handlePressSave('date', inputDate?.toString() || '')}>Save</Button>
                                        <Button data-testid="settings-birthdate-cancel-button" className="w-50 h-10 rounded-lg bg-background-light hover:bg-background-light/50 text-foreground-light shadow-sm" onClick={() => setOpenInput('')}>Cancel</Button>
                                    </div>
                                    :
                                    <Button data-testid="settings-birthdate-edit-button" onClick={() => setOpenInput('birth_date')}>
                                        <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                                    </Button>}
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold my-10">App</h2>
                    <div className="divide-y-2 rounded-lg overflow-hidden my-4 bg-white shadow-sm">
                        <div className="w-full h-20 bg-white hover:bg-background-light hover:cursor-pointer flex justify-between items-center">
                            <h3 className="font-semibold ml-4">Privacy Settings</h3>
                            <RightArrSvg className="size-6 fill-foreground-light mr-6" />
                        </div>
                        <div className="w-full h-20 bg-white hover:bg-background-light hover:cursor-pointer flex justify-between items-center">
                            <h3 className="font-semibold ml-4">Help & Support</h3>
                            <RightArrSvg className="size-6 fill-foreground-light mr-6" />
                        </div>
                        <div className="w-full h-20 bg-white hover:bg-background-light hover:cursor-pointer flex justify-between items-center">
                            <h3 className="font-semibold ml-4">About Finance Tracker</h3>
                            <RightArrSvg className="size-6 fill-foreground-light mr-6" />
                        </div>
                    </div>
                    <Button type="button" data-testid="logout-button" className="w-50 h-10 mt-6 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm ..." onClick={() => dispatch(isLoggedOut())}>
                        Log Out
                    </Button>
                </div>
            </div>
        </div >
    )
}