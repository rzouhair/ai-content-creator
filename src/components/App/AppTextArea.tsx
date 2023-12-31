import React, { useState, useRef, useEffect, useCallback } from 'react';

const AppTextarea = ({
  label,
  placeholder,
  maxLength,
  validation,
  errorMessage,
  autocomplete,
  color = 'indigo',
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
      <label htmlFor={rest.id} className="text-base font-semibold">{label}</label>
      <div className={`${wrapperClassName || ''} max-h-[300px] overflow-auto mt-1.5 box-border flex flex-row resize-none px-2 gap-2 transition-all bg-white dark:text-white dark:bg-gray-700 border shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `border-gray-300 dark:border-gray-700 hover:border-${color}-300 !shadow-${color}-100`} rounded-md flex-none order-1 self-stretch outline-none text-gray-900 font-normal ${focused && `border-${color}-300 shadow-[0px_0px_0px_3px_#F2F4F7]`}`}>
        {prefix || null}
        <textarea
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
          className={`outline-none bg-transparent flex-1 overflow-hidden text-base resize-none w-full py-2 ${inputClassName}`}
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