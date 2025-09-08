import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

export default function ConfigurableForm({
  title,
  subtitle,
  fieldConfigurations,
  onFormSubmit,
  defaultValues = {},
  submitButtonLabel = "Submit",
  submitButtonClassName = "",
  className = "",
  formClassName,
  children,
  footer
}) {
  const [showPasswords, setShowPasswords] = useState({})
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues,
     mode: "onBlur",      
  reValidateMode: "onChange" 
   })
  
  const formValues = watch()
  
  const handleFormSubmission = async (formData) => {
    try {
      await onFormSubmit(formData)
      reset()
      setShowPasswords({})
    } catch (error) {
      console.error('Form submission failed:', error)
    }
  }

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }))
  }
  
  const renderFormField = (fieldConfig) => {
    const { 
      name, 
      label, 
      type = "text",
      required = false,
      validation = {},
      placeholder,
      options,
      className: fieldClassName ,
      icon: IconComponent
    } = fieldConfig
    
    const hasError = Boolean(errors[name])
    const isPasswordField = type === 'password'
    const showPassword = showPasswords[name] || false
    
    const inputClassName = cn(
      "h-9 md:h-11 pr-10 pl-3 bg-muted border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors",
      hasError && "border-red-300 focus:border-red-400 focus:ring-red-100"
    )
    
    const renderInput = () => {
      if (type === 'select') {
        return (
          <div className="relative">
            <Select 
              onValueChange={(value) => setValue(name, value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}...`} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {IconComponent && (
              <IconComponent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            )}
          </div>
        )
      }
      
      if (type === 'radio') {
        return (
          <RadioGroup
            onValueChange={(value) => setValue(name, value)}
            defaultValue={formValues[name]}
            disabled={isSubmitting}
            className="grid grid-cols-2 gap-4 mt-2"
          >
            {options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <RadioGroupItem 
                  value={option.value} 
                  id={`${name}-${option.value}`}
                  className={hasError ? "border-red-300" : ""}
                />
                <Label 
                  htmlFor={`${name}-${option.value}`}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      }

      return (
        <div className="relative">
          <Input
            type={isPasswordField && showPassword ? "text" : type}
            placeholder={placeholder}
            disabled={isSubmitting}
            className={inputClassName}
            {...register(name, {
              required: required ? `${label} is required` : false,
              ...validation,
              validate: fieldConfig.customValidation ? 
                (value) => fieldConfig.customValidation(value, formValues) : 
                undefined
            })}
          />
          
          {isPasswordField ? (
            <button
              type="button"
              onClick={() => togglePasswordVisibility(name)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : IconComponent ? (
            <IconComponent className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          ) : null}
        </div>
      )
    }

    return (
      <div key={name} className={cn("space-y-1 md:space-y-2", fieldClassName)}>
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        
        {renderInput()}
        
        {hasError && (
          <div className="flex items-center gap-2 text-xs text-red-600 ">
            <span>{errors[name]?.message}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mx-4 md:p-8 max-w-md w-full", className)}>
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 md:mb-2 mb-1">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmission)} className={cn("space-y-4 md:space-y-5  w-full", formClassName)}>
        {fieldConfigurations.map(renderFormField)}
        
        {children && (
          <div className="pt-1">
            {children}
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm",
            "disabled:opacity-50 disabled:cursor-not-allowed mt-4",
            submitButtonClassName
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            submitButtonLabel
          )}
        </Button>
      </form>

      {footer && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {footer}
        </div>
      )}
    </div>
  )
}