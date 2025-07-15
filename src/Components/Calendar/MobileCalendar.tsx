import {  Fragment,useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react'
import { doctors, patients , timeSlots } from "../lib/data";
import { useSnackbar } from 'notistack';

interface CalendarGeneratorProps {
  year: number;
  month: number;
  onDateClick: (day: number, month: number, year: number) => void;
}

const MobileCalendar = ({ year, month  }: CalendarGeneratorProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date(year, month, new Date().getDate()));
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false)

  const [doctor , setDoctor] = useState("")
  const [patient , setPatient] = useState("")
  const [time, setTime] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const dateKey = selectedDate

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

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleSave = ()=>{
    if (!doctor || !patient || !time || !selectedDate) {
      enqueueSnackbar("Please complete all fields before saving.", { variant: "error" });
      return;
    }

    const newAppointment = { doctor,patient,time }


    const datteee = getDateKey(dateKey)    

    
    
    const existingData = JSON.parse(localStorage.getItem("appointments") || "[]");
    const existingDateEntry = existingData.find((entry: any) => entry.date === datteee);

    if (existingDateEntry) {
        existingDateEntry.appointments.push(newAppointment);
        enqueueSnackbar("Appointment Added!", { variant: "success" })   
    } else {
      console.log('else');
      
      existingData.push({
        date: datteee,
        appointments: [newAppointment],
      });
      enqueueSnackbar("Appointment Added!", { variant: "success" })
    }

    console.log('e from mobiel cale',existingData);
    

    localStorage.setItem('appointments',JSON.stringify(existingData))


    setDoctor("");
    setPatient("");
    setTime("");
    closeModal()

    setTimeout(()=>{     
      window.location.reload();
    },1000)

  }
  

  return (
    <>
    <div className="space-y-4">
      {/* Date picker */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Date
        </label>
        <input type="date" value={selectedDate.toISOString().split("T")[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
          }} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
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
          <button onClick={openModal}  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <FaPlus className="w-4 h-4" />
            Add
          </button>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">No appointments for this day.</p>
        ) : (
          <ul className="space-y-2">
            {appointments.map((appt, index) => (
              <li key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-start mb-2">
            <div className="space-y-1">
              <p><span>{index+1} - </span><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Patient:</strong> {appt.patient}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </div>
            <div className="flex gap-4">
              <button   className="bg-blue-400 transition-transform hover:scale-105 duration-300  border-1 rounded-sm px-6 py-1"> Edit</button>
              <button  className="bg-red-400 transition-transform hover:scale-105 duration-300 border-1 rounded-sm px-6 py-1" > Delete </button>
            </div>
          </div>

        </li>
              
              ))}
          </ul>
        )}
      </div>
    </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                    >
                    {selectedDate.toDateString()}
                  </Dialog.Title>
                  <div className="mt-2  gap-4">
                    <div className="w-full mt-4 gap-4 sm:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Doctor Name</label>
                        <select value={doctor} onChange={(e)=>setDoctor(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor)=>(
                                <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full mt-4 sm:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Patient Name </label>
                        <select value={patient} onChange={(e)=>setPatient(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <option value="">Select Patient</option>
                            {patients.map((pat)=>(
                                <option key={pat.id} value={pat.name}>{pat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full mt-4 sm:w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Slot</label>
                        <select    value={time}   onChange={(e) => setTime(e.target.value)}   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" >
                            <option value=""> Time Slot</option>
                            {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>))}
                        </select>
                    </div>

                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={closeModal}  >  Cancel</button>
                    <button onClick={handleSave}  type="button"  className="px-4 py-2 bg-blue-500 text-white rounded"  >  Save </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileCalendar;
