export interface InputWithLabelProps {
  id: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.Ref<HTMLInputElement>;
  name: string;
  value: {
    isDirty: boolean;
    invalid: boolean;
  };
  errors: {
    message?: string;
  };
  placeholder?: string;
  className?: string;
  required?: boolean;
}
