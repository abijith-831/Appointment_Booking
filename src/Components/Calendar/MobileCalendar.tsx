interface CalendarGeneratorProps {
    year: number;
    month: number;
    onDateClick: (day: number, month: number, year: number) => void;
}
  

const MobileCalendar = ({ year, month, onDateClick }: CalendarGeneratorProps) => {
    const totalDays = new Date(year, month + 1, 0).getDate();
  
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              onClick={() => onDateClick(day, month, year)}
              className="flex justify-between items-center px-4 py-3 border rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              <span>Day {day}</span>
              <span className="text-sm text-gray-500">Tap to view</span>
            </button>
          );
        })}
      </div>
    );
  };
  
  export default MobileCalendar;
  