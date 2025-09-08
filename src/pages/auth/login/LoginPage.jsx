import React from "react"
import { User, Lock } from "lucide-react"
import ConfigurableForm from "@/components/forms/ConfigurableForm"
import AuthLayout from "@/components/layout/AuthLayout"
import { Link, useNavigate } from "react-router"

const loginFields = [
 {
   name: "username",
   label: "Username",
   type: "text",
   required: true,
   placeholder: "Enter your username",
   icon: User,
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
   name: "password",
   label: "Password",
   type: "password",
   required: true,
   placeholder: "Enter your password",
   icon: Lock,
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
 }
]

const LoginPage = () => {
 const navigate = useNavigate()

 const handleSubmit = async (formData) => {
   await new Promise((resolve) => setTimeout(resolve, 2000))
   console.log("Login successful", formData)
   navigate('/register');
 }

 return (
   <AuthLayout 
     backgroundTitle="Sign in"
   >
     <ConfigurableForm
       title="Sign In"
       subtitle="Get started by signing in to your account"
       fieldConfigurations={loginFields}
       onFormSubmit={handleSubmit}
       submitButtonLabel="Sign In"
       footer={
         <div className="text-center space-y-2">
           <p className="text-xs text-gray-400">
             Don't have an account? 
             <Link to={'/register'} className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
               Register now
             </Link>
           </p>
         </div>
       }
     >
       <div className="flex items-center justify-between">
         <div className="flex items-center">
           <input
             id="remember"
             name="remember"
             type="checkbox"
             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
           />
           <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
             Remember me
           </label>
         </div>
         
       </div>
     </ConfigurableForm>
   </AuthLayout>
 )
}

export default LoginPage