"use client";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  helperText?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "tel" | "number" | "date" | "time" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  options: { value: string; label: string; disabled?: boolean }[];
}

interface CheckboxFieldProps extends BaseFieldProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, required, className, helperText, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Input
          ref={ref}
          className={cn(
            "health-card border-0",
            error && "border-destructive focus:ring-destructive"
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, required, className, helperText, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Textarea
          ref={ref}
          className={cn(
            "health-card border-0",
            error && "border-destructive focus:ring-destructive"
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

export const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  ({ label, error, required, className, helperText, options, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className="text-sm font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <Select {...props}>
          <SelectTrigger 
            ref={ref}
            className={cn(
              "health-card border-0",
              error && "border-destructive focus:ring-destructive"
            )}
          >
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export const CheckboxField = forwardRef<HTMLButtonElement, CheckboxFieldProps>(
  ({ label, error, required, className, helperText, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center space-x-2">
          <Checkbox ref={ref} {...props} />
          {label && (
            <Label className="text-sm font-medium">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

CheckboxField.displayName = "CheckboxField";

// Form Section Component
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

// Form Actions Component
interface FormActionsProps {
  onSave?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  saveText?: string;
  cancelText?: string;
  deleteText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FormActions({
  onSave,
  onCancel,
  onDelete,
  saveText = "Save",
  cancelText = "Cancel",
  deleteText = "Delete",
  loading = false,
  disabled = false,
  className
}: FormActionsProps) {
  return (
    <div className={cn("flex items-center justify-between pt-6 border-t", className)}>
      <div className="flex space-x-2">
        {onCancel && (
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="health-btn-secondary"
          >
            {cancelText}
          </Button>
        )}
        {onDelete && (
          <Button 
            variant="outline" 
            onClick={onDelete}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            {deleteText}
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {onSave && (
          <Button 
            onClick={onSave}
            disabled={disabled || loading}
            className="health-btn-primary"
          >
            {loading ? "Saving..." : saveText}
          </Button>
        )}
      </div>
    </div>
  );
} 