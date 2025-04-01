"use client";

import { ThemeToggle } from '@/src/theme/ThemeToggle';
import React, {useState, useEffect} from 'react';
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback, } from '@/components/ui/avatar';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LoginButton } from './auth/LoginButton';
import Link from 'next/link';
import { getCurrentUser } from '@/utils/api'


const Header = () => {
    const { data: session } = useSession();
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    //const [user, setUser] = useState("")

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (session?.user?.access) {
                try {
                    const currentUser = await getCurrentUser(session.user.access);
                    //setUser(currentUser);
                    setAvatar(`http://localhost:8000/${currentUser.avatar}` || '');
                    setUsername(currentUser.username || '');
                } catch (error) {
                    console.error("Error fetching current user:", error);
                }
            }
        };
        fetchCurrentUser();
    }, [session])  

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
                            <Avatar className='cursor-pointer'>
                            <AvatarImage src={avatar} alt="User Avatar" />
                                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem  className='cursor-pointer'>
                                <Link href='/profile'>
                                    Profile    
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onSelect={() => signOut()}>
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