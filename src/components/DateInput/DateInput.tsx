import { ComponentProps, ReactNode, FC, Dispatch, SetStateAction } from "react";
import "./DateInput.scss";

export type tDateType = "datetime-local" | "date";
export type tDateValue = number | string | Date;
export type tDateInput = { time?: number; onClean?: () => void };

export interface iDateInput extends Omit<ComponentProps<"input">, "value"> {
  pinned: boolean;
  id: string;
  setPinned: Dispatch<SetStateAction<boolean>>;
  type?: tDateType;
  value?: string;
  minmax?: { min?: tDateValue; max?: tDateValue };
  label?: ReactNode;
  className?: string;
};

const pad = (value: number) => (value < 10 ? "0" + value : value);
const date = (v: Date) => v.getFullYear() + "-" + pad(v.getMonth() + 1) + "-" + pad(v.getDate());
const time = (v: Date) => pad(v.getHours()) + ":" + pad(v.getMinutes());

const methods = {
  "datetime-local": (v: Date) => date(v) + "T" + time(v),
  date
};

const formatDate = (type: tDateType, value?: tDateValue) => (value ? methods[type](new Date(value)) : undefined);

export const DateInput: FC<iDateInput> = ({ id, label, value, minmax, pinned, setPinned, type = "date", className = "", ...props }) => {
  const formatter = formatDate.bind(null, type);

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="DateInput-label"
        >
          {label}
        </label>
      )}

      <div className={`DateInput ${className}`}>
        <input
          required
          id={id}
          {...props}
          className={`DateInput-input ${pinned ? "pinned" : ""}`}
          type={type}
          value={value}
          min={formatter(minmax?.min)}
          max={formatter(minmax?.max)}
        />

        <button
          type="button"
          className={`DateInput-pin ${pinned ? "active" : ""}`}
          onClick={() => setPinned(pv => !pv)}
          title="pin date"
        />
      </div>
    </>
  );
};