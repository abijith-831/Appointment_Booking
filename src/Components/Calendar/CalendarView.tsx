import { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const CalendarView = () => {

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [year , setYear] = useState<number>(new Date().getFullYear())
    const [selectedMonth , setSelectedMonth] = useState<number>(0)

  return (
    <div className="w-full p-8">
        <div className="flex items-center justify-between w-full">     
            <div className="w-1/6 flex justify-start">
                <ThemeToggle />
            </div>

            <div className="flex-1 text-center">
                <h1 className="text-4xl font-bold dark:bg-blue-300">Book Appointments</h1>
            </div>
            <div className="w-1/6" />
        </div>
    </div>

  )
}

export default CalendarView
