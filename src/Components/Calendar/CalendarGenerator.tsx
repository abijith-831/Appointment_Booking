
interface CalendarGeneratorProps {
    year: number;
    month: number;
    onDateClick: (day: number, month: number, year: number) => void;
  }
  
  const CalendarGenerator = ({ year, month ,onDateClick}: CalendarGeneratorProps) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
  
    const days= [];
  
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`blank-${i}`} className="py-6"></div>);
    }
  
    
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <div
          key={day}
          onClick={()=>onDateClick(day,month,year)}
          className="w-full h-14 border rounded-md border-gray-300  bg-gray-300 hover:bg-gray-100 text-black hover:transition-transform hover:scale-105 duration-300 dark:border-gray-500 p-2 text-center  cursor-pointer"
        >
          {day}
        </div>
      );
    }
  
    return <div className="grid grid-cols-7 gap-2 pt-4">{days}</div>;
  };
  
  export default CalendarGenerator;
  