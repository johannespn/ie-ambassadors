import { FormikErrors, FormikTouched, useField } from "formik";
import { HTMLInputTypeAttribute, useEffect, useState } from "react";

interface TextInputProps
  extends React.FC<{
    name: string;
    label: string;
    className?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    errors?: FormikErrors<{
      [field: string]: any;
    }>;
    touched?: FormikTouched<{
      [field: string]: any;
    }>;
    autofocus?: boolean;
    disabled?: boolean;
    maxLength?: number;
  }> {}

export const TextInput: TextInputProps = ({
  label,
  className,
  type,
  maxLength,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [remainingChars, setRemainingChars] = useState(maxLength);

  useEffect(() => {
    function calculateRemainingChars() {
      if (maxLength && field.value) {
        return maxLength - field.value.length;
      }
      return maxLength;
    }

    const remainingChars = calculateRemainingChars();
    setRemainingChars(remainingChars);
  }, [field.value, maxLength]);

  return (
    <div className={`mb-5 text-start ${className}`}>
      <div className="relative">
        <label
          htmlFor={props.name}
          className="absolute left-5 top-2 text-xs text-[#5D5D5F] bg-[#F9F9F9]"
        >
          {label}
        </label>
        <textarea
          className={`w-full min-h-[8rem] pt-6 b-2 px-5 bg-[#F9F9F9] border border-lightGray rounded overflow-y-scroll resize-none text-sm`}
          maxLength={maxLength}
          {...field}
          {...props}
        />
      </div>
      {maxLength && (
        <div className="w-full flex justify-end text-sm text-lightGray">
          <span>remaining {remainingChars} chars</span>
        </div>
      )}
      {meta.touched && meta.error && (
        <span className="relative top-2 text-sm text-red-900">
          {meta.error}
        </span>
      )}
    </div>
  );
};
