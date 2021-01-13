import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
};

const InputField: React.FC<Props> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
      >
        {props.label}
      </label>
      <input
        {...field}
        id={field.name}
        type={props.type}
        placeholder={props.placeholder}
        className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
        required
      />
    </div>
  );
};

export default InputField;
