"use client";

import { ThemeToggle } from '@/src/theme/ThemeToggle';
import React from 'react';
import { LoginButton } from './auth/LoginButton';
import { LogoutButton } from './auth/LogoutButton';
import {  useSession } from "next-auth/react";
//import { Button } from '@/components/ui/button';


const Header = () => {
    const { data: session } = useSession();
    console.log({session});
    return (
        <header className='borde-b border-b-accent fixed top-0 bg-background w-full'>
            <div className='container flex items-center py-2 max-w-lg m-auto gap-1'>
                <h2 className='text-2xl font-bold mr-auto'>ScoreAlchemy</h2>
                {session?.user ? (
                <>
                    <p className='text-sky-600'>{session?.user?.username}</p>
                    <LogoutButton />
                </>
                )
                    : (
                    <LoginButton />
                    )
                }
                <ThemeToggle/>
            </div>
        </header>
    );
}

export default Header;
