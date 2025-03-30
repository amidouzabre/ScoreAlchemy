"use client"
import { Button } from '@/components/ui/button'
//import { LogIn } from 'lucide-react';
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';
//import { Loader } from '@/components/ui/loader';
//import { signIn } from "next-auth/react";


export const LoginButton = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogin = () => {
        startTransition(() => {
            //signIn();
            router.push('/auth/login');
        })  
        // Rediriger vers la page de connexion
        
    };

    return (
        <>
        <Button onClick={handleLogin} variant="outline" className='sm' disabled={isPending}>
            {isPending ? "Connecting..." : "Connect"}
        </Button>
        </>
    );
};
