import React, { useState, useCallback, useEffect, useRef } from 'react';
// @ts-ignore
import { debounce } from 'lodash-es'
import { Input, InputProps } from '../ui/input';

interface InputFileType extends InputProps {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  validation?: RegExp;
  errorMessage?: string;
  autocomplete?: string;
  wrapperClassName?: string;
  hintClassName?: string;
  type?: string;
  onChange: (e: any) => void
  className?: string;
  hint?: string,
  color?: string;
  id?: string;
  prefix?: any;
  suffix?: JSX.Element;
  invalid?: boolean;
  debounced?: boolean
  debounceTime?: number
}

const AppInput = ({
  label,
  placeholder,
  maxLength,
  validation,
  errorMessage,
  autocomplete,
  type = 'text',
  color = 'secondary',
  value,
  onChange,
  className,
  wrapperClassName,
  hintClassName,
  hint,
  prefix,
  suffix,
  invalid,
  debounceTime = 500,
  debounced = false,
  ...rest
}: InputFileType) => {

  const [focused, setFocused] = useState(false)

  const inputRef = useRef(null)
  useEffect(() => {
    if (debounced && inputRef.current) {
      // @ts-ignore
      inputRef.current.value = value
    }
  }, [debounced, value])

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange?.(event);
  };

  const handleBlur = () => {
    setFocused(false)
    if (validation && !validation.test(value as string)) {
      alert(errorMessage);
    }
  }

  // @ts-ignore
  const debouncedChangeHandler = useCallback(debounce(handleChange, debounceTime), [])

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <div>
      <label htmlFor={rest.id} className="text-base font-semibold text-text">{label}</label>
      <div className={`${wrapperClassName || ''} dark:text-white mt-1.5 flex flex-row items-center h-10 transition-all bg-white dark:bg-night-500 border shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `!shadow-${color}/50`} rounded-md flex-none order-1 self-stretch outline-none text-gray-900 font-normal ${focused && `border-${color} focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}`}>
        {
          prefix && <div className="pl-2 flex items-center">
            {prefix}
          </div>
        }
        <Input
          type={type}
          ref={inputRef}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autocomplete}
          onChange={debounced ? debouncedChangeHandler : handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`outline-none flex-1 text-base w-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-transparent focus-visible:ring-offset-0 ${focused && 'outline-none'} ${className}`}
          {...(debounced ? {} : { value })}
          {...rest}
        />
        {
          suffix && <div className="pr-2 flex items-center">
            {suffix}
          </div>
        }
      </div>
      <div className={`${invalid ? '!text-red-600' : `text-gray-600`} text-sm mt-1 ${hintClassName}`}>
        { hint || errorMessage }
      </div>
    </div>
  );
};

export default AppInput;