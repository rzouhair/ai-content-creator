import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Textarea } from '../ui/textarea';

const AppTextarea = ({
  label,
  placeholder,
  maxLength,
  validation,
  errorMessage,
  autocomplete,
  color = 'secondary',
  value,
  onChange,
  onSubmit = () => {},
  className,
  inputClassName,
  wrapperClassName,
  hintClassName,
  hint,
  rows = 1,
  prefix,
  suffix,
  invalid,
  submitOnEnter,
  resizable,
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
  submitOnEnter?: boolean
  rows?: number;
  value: string;
  onChange: (e: any) => void
  onSubmit?: (e: any) => void
  className?: string;
  inputClassName?: string;
  hint?: string,
  color?: string;
  id?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  resizable?: boolean;
  invalid?: boolean;
}) => {
  // border-secondary
  // !border-secondary
  // hover:border-secondary

  const [focused, setFocused] = useState(false)
  const [shift, setShift] = useState(false)

  const textArea = useRef<HTMLTextAreaElement | null>()

  const auto_grow = useCallback(() => {
    if (textArea?.current?.style) {
      textArea.current.style.height = `${rows * 20.4}px`;
      textArea.current.style.height = (textArea.current?.scrollHeight)+"px";
    }
  }, [rows])

  const handleKeyUp = (event: any) => {
    if (event.key === 'Shift') {
      setShift(false)
    }
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Shift') {
      setShift(true)
    }
  }
  
  useEffect(() => {
    auto_grow()
  }, [value, rows, auto_grow])

  const handleChange = (event: any) => {
    if (event.nativeEvent.inputType === 'insertLineBreak' && submitOnEnter && !shift) {
      onSubmit(event)
      return;
    }
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

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <div className={`${className}`}>
      <label htmlFor={rest.id} className="text-base font-semibold dark:text-white">{label}</label>
      <div className={`${wrapperClassName || ''} max-h-[300px] overflow-auto dark:text-white mt-1.5 flex flex-row items-center transition-all bg-white dark:bg-night-500 border border-ghost_white dark:border-muted shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `!shadow-${color}-100`} rounded-md flex-none order-1 self-stretch outline-none text-gray-900 font-normal ${focused && `!border-secondary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2`}`}>
        {prefix || null}
        <Textarea
          placeholder={placeholder}
          value={value}
          // @ts-ignore
          ref={textArea}
          rows={rows}
          maxLength={maxLength}
          autoComplete={autocomplete}
          /* onChange={handleChange} */
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={`outline-none flex-1 text-base w-full bg-transparent border-none focus-visible:ring-none focus-visible:ring-transparent focus-visible:ring-offset-0 ${focused && 'outline-none'} ${inputClassName}`}
          {...rest}
        />
        {suffix || null}
      </div>
      <div className={`${invalid ? '!text-red-600' : `text-gray-600`} text-sm ${hintClassName}`}>
        { hint || errorMessage }
      </div>
    </div>
  );
};

export default AppTextarea;