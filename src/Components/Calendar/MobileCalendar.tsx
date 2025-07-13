import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

interface CalendarGeneratorProps {
  year: number;
  month: number;
  onDateClick: (day: number, month: number, year: number) => void;
}

const MobileCalendar = ({ year, month, onDateClick }: CalendarGeneratorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date(year, month, new Date().getDate()));
  const [appointments, setAppointments] = useState<any[]>([]);

  const getDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const loadAppointments = (date: Date) => {
    const all = JSON.parse(localStorage.getItem("appointments") || "[]");
    const key = getDateKey(date);
    const found = all.find((entry: any) => entry.date === key);
    setAppointments(found?.appointments || []);
  };

  const handlePrev = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
    // onDateClick(prev.getDate(), prev.getMonth(), prev.getFullYear());
  };

  const handleNext = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
    // onDateClick(next.getDate(), next.getMonth(), next.getFullYear());
  };

  useEffect(() => {
    loadAppointments(selectedDate);
  }, [selectedDate]);

  

  return (
    <div className="space-y-4">
      {/* Date picker */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
            onDateClick(newDate.getDate(), newDate.getMonth(), newDate.getFullYear());
          }}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <button onClick={handlePrev} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          <FaChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {selectedDate.toDateString()}
          </div>
        </div>

        <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Next
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Appointments ({appointments.length})
          </h3>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FaPlus className="w-4 h-4" />
            Add
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">No appointments for this day.</p>
        ) : (
          <ul className="space-y-2">
            {appointments.map((appt, idx) => (
              <li key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-lg shadow-sm">
                <p><strong>Doctor:</strong> {appt.doctor}</p>
                <p><strong>Patient:</strong> {appt.patient}</p>
                <p><strong>Time:</strong> {appt.time}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileCalendar;
