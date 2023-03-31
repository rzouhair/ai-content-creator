import React, { useState, useRef } from 'react';

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

  function auto_grow() {
    if (textArea?.current?.style) {
      textArea.current.style.height = "0px";
      textArea.current.style.height = (textArea.current?.scrollHeight)+"px";
    }
  }

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

  const handleChange = (event: any) => {
    if (event.nativeEvent.inputType === 'insertLineBreak' && !shift) {
      onSubmit(event)
      return;
    }
    auto_grow()
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
      <label htmlFor={rest.id} className="mb-1.5 text-sm">{label}</label>
      <div className={`${wrapperClassName || ''} box-border flex flex-row resize-none items-center px-2 gap-2 transition-all bg-white border shadow-xs ${invalid ? `border-red-300 !shadow-red-100 hover:border-red-300 !text-red-500` : `border-gray-300 hover:border-${color}-300 !shadow-${color}-100`} rounded-md flex-none order-1 self-stretch outline-none text-gray-900 font-normal ${focused && `border-${color}-300 shadow-[0px_0px_0px_4px_#F2F4F7]`}`}>
        {prefix || null}
        <textarea
          placeholder={placeholder}
          value={value}
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
          className={`outline-none flex-1 overflow-hidden resize-none w-full py-3 ${inputClassName}`}
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