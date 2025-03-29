"use client";

import { ThemeToggle } from '@/src/theme/ThemeToggle';
import React from 'react';
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback, } from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LoginButton } from './auth/LoginButton';
import Link from 'next/link';
//import { Button } from '@/components/ui/button';

const Header = () => {
    const { data: session } = useSession();
    console.log({session});
    return (
        <header className='borde-b border-b-accent fixed top-0 bg-background w-full'>
            <div className='container flex items-center py-2 max-w-lg m-auto gap-1'>
                <h2 className='text-2xl font-bold mr-auto'>
                    <Link href='/'>
                        ScoreAlchemy
                    </Link>
                </h2>
                {session?.user ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={session.user.avatar} alt="User Avatar" />
                                <AvatarFallback>{session.user.username.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <p className='text-sky-600'>{session.user.username}</p>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => signOut()}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
                )
                    : (
                    <LoginButton/>
                    )
                }
                <ThemeToggle/>
            </div>
        </header>
    );
}

export default Header;