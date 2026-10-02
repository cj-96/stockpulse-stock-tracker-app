'use client';

import React from 'react'
import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@base-ui/react";
import {useRouter} from "next/navigation";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onBlur"
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <h1 className="form-title">Welcome back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address',
                        },
                    }}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: 'Password is required',
                        minLength: 8,
                    }}
                />

                <Button type="submit" disabled={isSubmitting} className =" yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign in'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    )
}
export default SignIn
