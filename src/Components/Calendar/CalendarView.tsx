import { useState } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import CalendarGenerator from "./CalendarGenerator";
import AppointmentView from "../Appointment/AppointmentView";
import { useNavigate } from 'react-router-dom';
import useIsMobile from "../hooks/useIsMobile";
import MobileCalendar from "./MobileCalendar";


const CalendarView = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({ length: 31 }, (_, i) => 2000 + i);

    
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState<SelectedDate|null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const isMobile = useIsMobile();

    interface SelectedDate {
        day: number;
        month: number;
        year: number;
    }

    const handleDateClick = (day:number,month:number,year:number)=>{
        setSelectedDate({day,month,year})
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    return (
        <div className="min-h-screen  transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center  space-x-4">
                        <ThemeToggle />
                        <div className="hidden sm:block w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                    
                    <div className="text-center mx-auto">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Book Appointments
                        </h1>
                        <p className="text-black dark:text-gray-400 mt-2 text-sm sm:text-base">
                            Schedule and manage your calendar events
                        </p>
                    </div>

                    <div className="flex justify-end items-end">
                        <button onClick={()=>{navigate('/login')} } className="border-1 rounded-lg  px-6 py-2 font-bold ">Logout</button>
                    </div>
                    
                    <div className="w-20 sm:w-24"></div>
                </div>

                <div className="bg-gray-100  backdrop-blur-sm rounded-2xl p-3 border-1 shadow-2xl border-gray-200/50 dark:border-gray-700/50 transition-transform hover:scale-101 duration-300 mb-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex gap-3">
                            <select  value={selectedMonth}   onChange={(e) => setSelectedMonth(Number(e.target.value))}   className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                                {monthNames.map((item, index) => (
                                    <option key={index} value={index}>{item}</option>
                                ))}
                            </select>    
                            <select  value={year}  onChange={(e) => setYear(Number(e.target.value))}  className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                                {years.map((yr) => (
                                    <option key={yr} value={yr}>{yr}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 backdrop-blur-sm rounded-2xl shadow-2xl border-1  border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-transform hover:scale-101 duration-300">
                    <div className="grid grid-cols-7 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                        {daysOfWeek.map((day, index) => (
                            <div key={index} className="py-2 text-center font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="p-2">
                        <div className="min-h-[400px] sm:min-h-[390px]">
                        {isMobile ? (
                            <MobileCalendar year={year} month={selectedMonth} onDateClick={handleDateClick} />
                            ) : (
                            <CalendarGenerator year={year} month={selectedMonth} onDateClick={handleDateClick} />
                            )}

                        </div>
                    </div>
                </div>

                <div className="mt-8 flex fitems-center justify-center gap-4 sm:gap-6">
                    <button 
                        onClick={() => {
                            if(selectedMonth === 0) {
                                setSelectedMonth(11);
                                setYear((prev) => prev - 1);
                            } else {
                                setSelectedMonth((prev) => prev - 1);
                            }
                        }} 
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0" >
                        <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200">←</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Previous</span>
                    </button>

                    <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/30">
                        <h2 className="font-bold text-lg text-black">
                            {monthNames[selectedMonth]} - {year}
                        </h2>
                    </div>

                    <button 
                        onClick={() => {
                            if(selectedMonth === 11) {
                                setSelectedMonth(0);
                                setYear((prev) => prev + 1);
                            } else {
                                setSelectedMonth((prev) => prev + 1);
                            }
                        }} 
                        className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0" >
                        <span className="font-medium text-gray-700 dark:text-gray-300">Next</span>
                        <span className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200">→</span>
                    </button>
                </div>
            </div>
            <AppointmentView isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={selectedDate} monthNames={monthNames}/>
            
        </div>
    );
};

export default CalendarView;