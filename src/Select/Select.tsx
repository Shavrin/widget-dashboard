import { Select as HSelect, Field, Label } from "@headlessui/react";

export type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
};

export function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <Field>
      <Label className="text-white">{label}</Label>
      <HSelect
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded w-full p-1 bg-stone-300 text-stone-900"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </HSelect>
    </Field>
  );
}
