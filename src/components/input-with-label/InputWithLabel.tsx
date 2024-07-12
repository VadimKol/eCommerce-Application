import styles from './styles.module.scss';

interface InputWithLabelProps {
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

export function InputWithLabel({
  id,
  label,
  type,
  onChange,
  ref,
  name,
  value,
  errors,
  placeholder = '',
  className = '',
  required = false,
}: InputWithLabelProps): JSX.Element {
  const getFieldClass = (): string => {
    if (!value?.isDirty) {
      return '';
    }
    return value.invalid ? styles.invalid || '' : styles.valid || '';
  };

  const fieldClass = getFieldClass();

  return (
    <div className={`${styles.inputWithError} ${styles.bigInput}`}>
      <label htmlFor={id} className={styles.formInput}>
        <div className={styles.requiredTitle}>{label}</div>
        <input
          id={id}
          type={type}
          onChange={onChange}
          ref={ref}
          name={name}
          className={`${className} ${fieldClass}`}
          placeholder={placeholder}
          aria-invalid={errors || !value.isDirty ? 'true' : 'false'}
          required={required}
        />
      </label>
      {errors && (
        <span role="alert" className={styles.errorMsg}>
          {errors.message}
        </span>
      )}
    </div>
  );
}

export default InputWithLabel;
