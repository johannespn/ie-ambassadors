import { FormikErrors, FormikTouched, useField } from "formik";
import { HTMLInputTypeAttribute } from "react";

interface InputProps
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
    bg?: string;
  }> {}

export const Input: InputProps = ({ label, className, type, bg, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`mb-5 text-start ${className}`}>
      <div className="relative">
        <label
          htmlFor={props.name}
          className="absolute left-5 top-2 text-xs text-darkGray"
        >
          {label}
        </label>
        <input
          className={`w-full pt-7 pb-2 px-5 text-sm ${
            bg ? bg : "bg-beige-300"
          } border border-lightGray rounded`}
          type={type}
          {...field}
          {...props}
        />
      </div>
      {meta.touched && meta.error && (
        <span className="relative top-2 text-sm text-red-900">
          {meta.error}
        </span>
      )}
    </div>
  );
};
