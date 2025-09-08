import React from "react"
import { useState } from "react"
import { User, Mail, Phone, Lock } from "lucide-react"
import ConfigurableForm from "@/components/forms/ConfigurableForm"
import AuthLayout from "@/components/layout/AuthLayout"
import { Link, useNavigate } from "react-router"

const registerFields = [
 {
   name: "name",
   label: "Full Name",
   type: "text",
   required: true,
   placeholder: "Enter your full name",
   icon: User,
   className: "md:col-span-2",
   validation: {
     pattern: {
       value: /^[A-Za-z\s]+$/,
       message: "Name can only contain alphabets and spaces"
     },
     minLength: {
       value: 2,
       message: "Name must be at least 2 characters"
     }
   }
 },
 {
   name: "username",
   label: "Username",
   type: "text",
   required: true,
   placeholder: "Choose a username",
   icon: User,
   className: "md:col-span-1",
   validation: {
     pattern: {
       value: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@#$%^&*()_+=\[\]{}|;:,.<>?-])[A-Za-z0-9@#$%^&*()_+=\[\]{}|;:,.<>?-]+$/,
       message: "Username must contain a combination of letters, numbers, and special characters"
     },
     minLength: {
       value: 3,
       message: "Username must be at least 3 characters"
     }
   }
 },
 {
   name: "email",
   label: "Email Address",
   type: "email",
   required: true,
   placeholder: "Enter your email address",
   icon: Mail,
   className: "md:col-span-1",
   validation: {
     pattern: {
       value: /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/,
       message: "Please enter a valid email address"
     }
   }
 },
 {
   name: "phone",
   label: "Phone Number",
   type: "tel",
   required: true,
   placeholder: "+91 98765 43210",
   icon: Phone,
   className: "md:col-span-2",
   validation: {
     pattern: {
       value: /^\+91[\s-]?[6-9]\d{9}$/,
       message: "Please enter a valid Indian phone number with +91 country code (e.g., +91 98765 43210)"
     }
   }
 },
 {
   name: "password",
   label: "Password",
   type: "password",
   required: true,
   placeholder: "Create a password",
   icon: Lock,
   className: "md:col-span-1",
   validation: {
     minLength: { 
       value: 6, 
       message: "Password must be at least 6 characters" 
     },
     pattern: {
       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()_+=\[\]{}|;:,.<>?-])[A-Za-z0-9@#$%^&*()_+=\[\]{}|;:,.<>?-]+$/,
       message: "Password must contain uppercase letter, lowercase letter, number, and special character"
     }
   },
   customValidation: (value, formValues) => {
     if (value === formValues.username) {
       return "Password cannot be the same as username"
     }
     return true
   }
 },
 {
   name: "confirmPassword",
   label: "Confirm Password",
   type: "password",
   required: true,
   placeholder: "Confirm your password",
   icon: Lock,
   className: "md:col-span-1",
   validation: {
     required: "Password confirmation is required"
   },
   customValidation: (value, formValues) => {
     if (value !== formValues.password) {
       return "Passwords do not match"
     }
     return true
   }
 }
]

const RegisterPage = () => {
    const navigate = useNavigate();
 const handleSubmit = async (formData) => {
   await new Promise((resolve) => setTimeout(resolve, 2000))
   console.log("Registration successful", formData)
   navigate('/login');
 }

 return (
   <AuthLayout>
     <ConfigurableForm
       title="Create Account"
       subtitle="Join us by creating a new account"
       fieldConfigurations={registerFields}
       onFormSubmit={handleSubmit}
       submitButtonLabel="Create Account"
       className="max-w-2xl"
       formClassName="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0"
       submitButtonClassName="md:col-span-2 w-full !mt-2"
       footer={
         <div className="text-center space-y-2">
           <p className="text-xs text-gray-400">
             Already have an account? 
             <Link to={'/login'} className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
               Sign in here
             </Link>
           </p>
           <p className="text-xs text-gray-500">
             By creating an account, you agree to our{" "}
             <span className="text-blue-600 hover:underline cursor-pointer">
               Terms of Service
             </span>{" "}
             and{" "}
             <span className="text-blue-600 hover:underline cursor-pointer">
               Privacy Policy
             </span>
           </p>
         </div>
       }
     />
   </AuthLayout>
 )
}

export default RegisterPage