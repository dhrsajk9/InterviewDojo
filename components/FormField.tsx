import React from 'react'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage} from './ui/form'
import { Input } from './ui/input' 
import { Controller} from "react-hook-form"
import { FieldValues, Path, Control} from "react-hook-form"

interface FormFieldProps<T extends FieldValues> { //Accepts a generic T parameter which extends one of the field values and then we can define other parameters
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file' 
}

const FormField = ({control, name, label, placeholder, type="text"}: FormFieldProps<T>) => (
    <Controller 
    control={control} 
    name = {name}
    render={({field}) => (
      <FormItem>
          <FormLabel className='label'>{label}</FormLabel>
          <FormControl>
            <Input className="input" placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
      </FormItem>
    )}
  />
)

export default FormField