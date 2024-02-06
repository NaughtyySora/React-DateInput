import { FC, } from 'react';
import { DateInput } from './components/DateInput/DateInput';
import { useDateInput } from './components/DateInput/useDateInput';

export const App: FC = () => {
  const { getTime, inputProps, onClean } = useDateInput();

  const onClick = () => {
    const date = getTime("date");
    const fullDate = getTime("datetime-local");
    
    console.dir({
      date,
      fullDate,
      stringISO: new Date(date || 0).toISOString(),
      stringISOFull: new Date(fullDate || 0).toISOString(),
      stringLocal: new Date(date || 0).toString(),
      stringFullLocal: new Date(fullDate || 0).toString(),
    });

    onClean();
  };

  return (
    <main className="App">
      <DateInput
        {...inputProps}
        label="Date: "
        id="date_input"
        type="datetime-local"
        className="App-input"
      />

      <button onClick={onClick} className="App-btn">Get Time</button>
    </main>
  );
};
