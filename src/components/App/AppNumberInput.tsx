import React, { useState, useCallback, useEffect, useRef } from 'react';
// @ts-ignore
import { debounce } from 'lodash-es'
import { Label } from '../ui/label';

const AppNumberInput = ({
  label,
  placeholder,
  maxLength,
  minLength,
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
  labelClassName,
  hint,
  prefix,
  suffix,
  invalid,
  debounceTime = 500,
  debounced = false,
  ...rest
}: {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  validation?: RegExp;
  errorMessage?: string;
  autocomplete?: string;
  wrapperClassName?: string;
  hintClassName?: string;
  type?: string;
  value: number;
  onChange: (e: any) => void
  className?: string;
  labelClassName?: string;
  hint?: string,
  color?: string;
  id?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  invalid?: boolean;
  debounced?: boolean
  debounceTime?: number
  min?: number,
  max?: number
}) => {
  // border-secondary
  // hover:border-secondary

  const [focused, setFocused] = useState(false)
  const [val, setValue] = useState<number>(0)

  const inputRef = useRef(null)
  useEffect(() => {
    if (debounced && inputRef.current) {
      // @ts-ignore
      inputRef.current.value = value
    }

  }, [debounced, value])

  const handleChange = (event: any) => {
    const newValue = event?.target?.value || event;
    if (maxLength && newValue > maxLength) return;

    if (minLength && newValue < minLength) return
    onChange(event);
  };

  const increment = () => {
    if (rest.max && rest.max < value + 1)
      return
    handleChange(value + 1)
  }
  const decrement = () => {
    if (rest.min && rest.min > value - 1)
      return
    handleChange(value - 1)
  }

  const handleBlur = () => {
    setFocused(false)
    /* if (validation && !validation.test(value)) {
      alert(errorMessage);
    } */
  }

  // @ts-ignore
  const debouncedChangeHandler = useCallback(debounce(handleChange, debounceTime), [])

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <div className='w-full'>
      <Label htmlFor={rest.id} className={`text-base font-semibold text-text ${labelClassName}`}>{label}</Label>
      <div className={`flex items-center justify-center w-full bg-white mt-1.5 rounded-md overflow-hidden border shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `border-ghost_white dark:border-muted hover:border-${color} !shadow-${color}-100`}  transition-all self-stretch ${focused && `border-${color}-300 shadow-[0px_0px_0px_3px_#F2F4F7]`}`}>
        <div className={`h-10 flex items-center justify-center border-r dark:bg-gray-700 bg-white min-w-[56px] dark:bg-night-200 dark:text-white ${invalid ? `border-r-red-300 !shadow-red-100 hover:border-r-red-300 !text-red-500` : `border-r-muted dark:border-r-muted hover:border-r-${color}-300`} hover:bg-gray-50 transition-colors duration-100 cursor-pointer focus:bg-gray-100 ${(rest.min && rest.min > value - 1) && 'pointer-events-none opacity-50 transition-colors'}`} onClick={(e) => decrement()}>
          <i className='i-tabler-minus'></i>
        </div>
        <div className={`${wrapperClassName || ''} flex-[3] box-border flex justify-center text-center flex-row items-center px-2 gap-2 h-10 outline-none dark:bg-night dark:text-white text-sm text-gray-900 font-normal pointer-events-none`}>
          {prefix || null}
          <input
            type={type === 'password' ? 'password' : 'text'}
            ref={inputRef}
            placeholder={placeholder}
            maxLength={maxLength}
            min={rest.min}
            max={rest.max}
            autoComplete={autocomplete}
            onChange={debounced ? debouncedChangeHandler : handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`outline-none flex-1 w-full text-base dark:text-white bg-transparent text-center ${className}`}
            {...(debounced ? {} : { value })}
            {...rest}
          />
          {suffix || null}
        </div>
        <div className={`h-10 flex items-center border-l justify-center bg-white dark:bg-night-200 dark:text-white min-w-[56px] ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `border-ghost_white dark:border-muted hover:border-${color}-300 !shadow-${color}-100`} hover:bg-gray-50 transition-colors duration-100 cursor-pointer focus:bg-gray-100 ${(rest.max && rest.max < value + 1) && 'pointer-events-none opacity-50 transition-colors'}`} onClick={(e) => increment()}>
          <i className='i-tabler-plus'></i>
        </div>
      </div>
      <div className={`${invalid ? '!text-red-600' : `text-gray-600`} text-sm mt-1 ${hintClassName}`}>
        { hint || errorMessage }
      </div>
    </div>
  );
};

export default AppNumberInput;