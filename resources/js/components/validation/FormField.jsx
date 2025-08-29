import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
        opacity: 1, 
        y: 0, 
        transition: { delay: i * 0.08, duration: 0.4 } 
    })
};

export const FormField = ({ 
    custom, 
    label, 
    required = false, 
    error, 
    children, 
    helper,
    className = '',
    labelClassName = '',
    ...props 
}) => (
    <motion.div 
        variants={itemVariants} 
        custom={custom}
        className={`space-y-2 ${className}`}
        {...props}
    >
        <Label className={`mb-2.5 ${labelClassName}`}>
            {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        {children}
        
        {helper && (
            <p className="text-xs text-gray-500 mt-1">
                {helper}
            </p>
        )}
        
        {error && (
            <p className="text-red-500 text-sm mt-1">
                {error}
            </p>
        )}
    </motion.div>
);

export const FormFieldWithCounter = ({ 
    custom, 
    label, 
    required = false, 
    error, 
    children, 
    helper,
    currentLength = 0,
    minLength = 0,
    maxLength = null,
    ...props 
}) => (
    <FormField 
        custom={custom}
        label={label}
        required={required}
        error={error}
        helper={helper}
        {...props}
    >
        {children}
        <div className="flex justify-between items-center mt-1">
            <span /> 
            <p className={`text-xs ${
                currentLength < minLength ? 'text-red-500' : 'text-gray-500'
            }`}>
                {currentLength} karakter (min. {minLength}
                {maxLength && `, max. ${maxLength}`})
            </p>
        </div>
    </FormField>
);

export default FormField;