import { BrandLogoSvg, NotificationSvg } from "@/assets/icons";
import { NavLink, useLocation } from "react-router-dom";
import avatarImage from "@/assets/avatar.png";
import { useAppSelector } from "@/app/hooks";

export default function Topbar() {
  const location = useLocation();
  const { name } = useAppSelector(u => u.user);

  return (
    <header className="p-4 mb-2 bg-white">
      <div className='flex justify-between items-center gap-3 mb-2'>
        <div className="flex items-center gap-x-2">
          <BrandLogoSvg className='fill-primary size-8' />
          <h1 className='text-2xl font-bold text-foreground-light dark:text-foreground-dark'>Finance Tracker</h1>
        </div>
        <nav className="flex gap-x-32 items-center">
          <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? "rounded focus:outline-none transition-colors disabled:opacity-50 bg-blue-600 hover:bg-blue-700 w-32 flex justify-center rounded-lg bg-primary/20 dark:bg-primary/30 py-2 px-4 text-l font-medium text-primary shadow-sm hover:bg-primary/30 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "focus:outline-none transition-colors disabled:opacity-50 hover:bg-blue-300 w-32 flex justify-center rounded-lg py-2 px-4 text-l font-medium text-muted-light hover:text-primary shadow-sm hover:bg-primary/15 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>Dashboard</NavLink>
          <NavLink to="/transactions" className={location.pathname === '/transactions' ? " focus:outline-none transition-colors disabled:opacity-50 bg-blue-600 hover:bg-blue-700 w-32 flex justify-center rounded-lg bg-primary/20 dark:bg-primary/30 py-2 px-4 text-l font-medium text-primary shadow-sm hover:bg-primary/30 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "focus:outline-none transition-colors disabled:opacity-50 hover:bg-blue-300 w-32 flex justify-center rounded-lg py-2 px-4 text-l font-medium text-muted-light hover:text-primary shadow-sm hover:bg-primary/15 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>Transactions</NavLink>
          <NavLink to="/settings" className={location.pathname === '/settings' ? " focus:outline-none transition-colors disabled:opacity-50 bg-blue-600 hover:bg-blue-700 w-32 flex justify-center rounded-lg bg-primary/20 dark:bg-primary/30 py-2 px-4 text-l font-medium text-primary shadow-sm hover:bg-primary/30 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "focus:outline-none transition-colors disabled:opacity-50 hover:bg-blue-300 w-32 flex justify-center rounded-lg py-2 px-4 text-l font-medium text-muted-light hover:text-primary shadow-sm hover:bg-primary/15 dark:hover:bg-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"}>Settings</NavLink>
        </nav>
        <div className="flex gap-x-6 items-center">
          <div className="relative">
            <NotificationSvg className='text-primary size-6 fill-muted-light hover:fill-primary transition-colors' />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-background-dark/30"></span>
          </div>
          <img src={avatarImage} alt="avatar image" className="size-10"></img>
          <div className="flex-row">
            <h2 className="font-bold text-foreground-light">{name}</h2>
            <p className="text-muted-light">Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
