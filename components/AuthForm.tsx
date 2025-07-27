"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Image from 'next/image'
import Link from "next/link"
import {toast} from "sonner" //New version of toast from shadcn

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    username: z.string().min(2).max(50),
})

const AuthFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({type}: {type: FormType}) => {
  const router = useRouter()
  const formSchema = AuthFormSchema(type)
  // 1. Define the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        toast.success('Account created successfully. Sign in.')
        router.push('/sign-in')
      } else {
        toast.success('Signed in successfully')
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error : ${error}`)
    }
  }

  const isSignIn = type === 'sign-in'

  return (
  <div className="card-border lg:min-w-[566px]">
    <div className="flex flex-col gap-6 card py-14 px-10">
      <div className="flex flex-row gap-2 justify-center">
        <Image src="/logo.svg" alt="logo" height={32} width={38} />
        <h2 className="text-primary-100">InterviewDojo</h2>
      </div>
      
      <h3>Practice Interviews with AI</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
          {!isSignIn && (
            <FormField control={form.control} name="name" label="Name" placeholder="Your Name"/>  
          )}
          <FormField control={form.control} name="email" label="Email" placeholder="Your Email Address" type="email"/>
          <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password"/>
          
          <Button className="btn" type="submit">{isSignIn ? 'Sign in': 'Create an account'}</Button>
        </form>
      </Form>

      <p className="text-center">
        {isSignIn ? 'Do not have an account?' : 'Have an account?'}
        <Link 
          href={isSignIn ? "/sign-up" : "/sign-in"} 
          className="font-bold text-user-primary ml-1"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  </div>
 )
 
}

export default AuthForm