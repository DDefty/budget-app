import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { EditSvg, RightArrSvg } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { isLoggedOut } from "@/features/userSlice";

export default function Settings() {
    const { email, name, gender, birth_date } = useAppSelector(u => u.user);
    const dispatch = useAppDispatch();
    return (
        <div className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <div>
                    <h2 className="text-xl font-semibold my-10">Account</h2>
                    <div className="divide-y-2 rounded-lg overflow-hidden my-4 bg-white shadow-sm">
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-muted-light">{email}</p>
                            </div>
                            <div className="ml-auto mr-6">
                                <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Password</h3>
                                <p className="text-muted-light">********</p>
                            </div>
                            <div className="ml-auto mr-6">
                                <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold my-10">Personal Information</h2>
                    <div className="divide-y-2 rounded-lg overflow-hidden my-4 bg-white shadow-sm">
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Name</h3>
                                <p className="text-muted-light">{name}</p>
                            </div>
                            <div className="ml-auto mr-6">
                                <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Gender</h3>
                                <p className="text-muted-light">{gender === 'F' ? 'Female' : gender === 'M' ? 'Male' : '-'}</p>
                            </div>
                            <div className="ml-auto mr-6">
                                <EditSvg className="hover:fill-primary hover:cursor-pointer" />
                            </div>
                        </div>
                        <div className="w-full h-20 bg-white flex items-center " >
                            <div className="ml-4">
                                <h3 className="font-semibold">Date of Birth</h3>
                                <p className="text-muted-light">{birth_date !== undefined ? <>{birth_date.toString().slice(0, 10)}</> : null}</p>
                            </div>
                            <div className="ml-auto mr-6">
                                <EditSvg className="hover:fill-primary hover:cursor-pointer" />
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
                    <Button type="button" className="w-50 h-10 mt-6 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm ..." onClick={() => dispatch(isLoggedOut())}>
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    )
}