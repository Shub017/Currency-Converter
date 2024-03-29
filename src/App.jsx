import { useState } from 'react';
import InputBox from './Components/InputFile';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import Datepicker from "tailwind-datepicker-react";

function App() {
  
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  //For date in currency conversion   
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [selectedDate, setDate] = useState(formattedDate);

  
  //console.log(selectedDate);

  const CurrencyInfo = useCurrencyInfo(from, selectedDate);
//   console.log(`For date ${selectedDate}  this rates are: ${CurrencyInfo}`)
  const options = Object.keys(CurrencyInfo);

  const dateoptions = {
    title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date(),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700 dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-red-500",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
  };
     

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * CurrencyInfo[to]);
  };

  const [showDatepicker, setShowDatepicker] = useState(false);
    
  

  
  const handleChange = (selectedDate) => {
    // Create a new Date object from the selectedDate string
    const date = new Date(selectedDate);
  
    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month}-${day}`;
  
    // console.log(formattedDate);
    setDate(formattedDate);
  };
  

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5" onClick={swap}>
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert  {from.toUpperCase()} to {to.toUpperCase()}
            </button>
            <button type="button" className="w-full mt-4 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg" onClick={() => setShowDatepicker(true)}>
              Select Date
            </button>
            {showDatepicker && (
              <Datepicker
                options={dateoptions}
                onChange={handleChange}
                show={showDatepicker}
                setShow={setShowDatepicker}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
