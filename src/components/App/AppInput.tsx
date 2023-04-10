import React, { useState, useCallback, useEffect, useRef } from 'react';
// @ts-ignore
import { debounce } from 'lodash-es'

const AppInput = ({
  label,
  placeholder,
  maxLength,
  validation,
  errorMessage,
  autocomplete,
  type = 'text',
  color = 'indigo',
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
}: {
  label?: string;
  placeholder?: string;
  maxLength?: number;
  validation?: RegExp;
  errorMessage?: string;
  autocomplete?: string;
  wrapperClassName?: string;
  hintClassName?: string;
  type?: string;
  value: string;
  onChange: (e: any) => void
  className?: string;
  hint?: string,
  color?: string;
  id?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  invalid?: boolean;
  debounced?: boolean
  debounceTime?: number
}) => {

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
    onChange(event);
  };

  const handleBlur = () => {
    setFocused(false)
    if (validation && !validation.test(value)) {
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
      <label htmlFor={rest.id} className="mb-1.5 text-sm">{label}</label>
      <div className={`${wrapperClassName || ''} box-border flex flex-row items-center px-2 gap-2 h-10 transition-all bg-white border shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `border-gray-300 hover:border-${color}-300 !shadow-${color}-100`} rounded-md flex-none order-1 self-stretch outline-none text-gray-900 font-normal ${focused && `border-${color}-300 shadow-[0px_0px_0px_4px_#F2F4F7]`}`}>
        {prefix || null}
        <input
          type={type === 'password' ? 'password' : 'text'}
          ref={inputRef}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autocomplete}
          onChange={debounced ? debouncedChangeHandler : handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`outline-none flex-1 w-full ${className}`}
          {...(debounced ? {} : { value })}
          {...rest}
        />
        {suffix || null}
      </div>
      <div className={`${invalid ? '!text-red-600' : `text-gray-600`} text-sm mt-1 ${hintClassName}`}>
        { hint || errorMessage }
      </div>
    </div>
  );
};

export default AppInput;