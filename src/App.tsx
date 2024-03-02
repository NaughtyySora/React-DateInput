import { FC, FormEvent, } from 'react';
import { DateInput } from './components/DateInput/DateInput';
import { useDateInput } from './components/DateInput/useDateInput';

export const App: FC = () => {
  const date = useDateInput();
  const dateTime = useDateInput();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(data));
    console.dir({
      date: date.getTime("date"),
      "date-time": date.getTime("datetime-local"),
    })
    date.onClean();
    dateTime.onClean();
  };

  return (
    <main className="App" >
      <form onSubmit={onSubmit} className="App-form" id="form">
        <DateInput {...date.inputProps}
          id="date-input"
          label="Date: "
          name="date"
        />

        <DateInput
          {...dateTime.inputProps}
          id="date-time-input"
          type="datetime-local"
          label="Date / Time : "
          name="date_time"
        />
      </form>

      <button className="App-btn" form="form" >Submit</button>
    </main>
  );
};
