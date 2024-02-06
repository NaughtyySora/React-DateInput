import { ChangeEvent, useState } from "react";
import { tDateType } from "./DateInput";

const updateTime = (type: tDateType, timeStamp?: number) => {
  if (type === "datetime-local" || !timeStamp) return timeStamp;
  const local = new Date();
  const current = new Date(timeStamp);
  local.setFullYear(current.getFullYear(), current.getMonth(), current.getDate());
  return local.getTime();
};

export const useDateInput = (inputValue?: string | number | Date, blockClear = false) => {
  const [value, setValue] = useState(inputValue ? new Date(inputValue).toString() : "");
  const [pinned, setPinned] = useState(false);

  const onClean = () => {
    !pinned && setValue("");
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (blockClear && !e.target?.value) return;
    setValue(e.target.value);
  };

  const getTime = (type: tDateType) => value ? updateTime(type, new Date(value).getTime()) : undefined;
  const setTime = (time: typeof inputValue) => setValue(time ? new Date(time).toString() : "");

  return {
    inputProps: {
      value,
      pinned,
      setPinned,
      onChange
    },
    onClean,
    getTime,
    setTime,
  };
};
