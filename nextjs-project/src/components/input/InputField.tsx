import { Input, InputProps } from "./Input";

export interface InputFieldProps extends InputProps {
    label: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, id, className, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-100">
                {label}
            </label>
            <Input id={id} className={`mt-1 ${className}`} {...props} />
        </div>
    );
};