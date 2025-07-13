import { useState } from "react";
import { doctors,patients , timeSlots } from "../lib/data";
import AppointmentList from "./AppointmentList";
import { useSnackbar } from 'notistack';


interface SelectedDate {
    day: number;
    month: number;
    year: number;
}

interface AppointmentViewProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: SelectedDate | null;
    monthNames: string[];
}

const AppointmentView = ({ isOpen, onClose, selectedDate, monthNames }:AppointmentViewProps) => {

    if (!isOpen || !selectedDate) return null; 

    const [doctor , setDoctor] = useState("")
    const [patient , setPatient] = useState("")
    const [time, setTime] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const dateKey = `${selectedDate.year}-${selectedDate.month + 1}-${selectedDate.day}`

    const handleEdit = (index:number,appt:any)=>{
      setDoctor(appt.doctor)
      setPatient(appt.patient)
      setTime(appt.time)
      setEditIndex(index)
      setIsEditing(true)
    }
    
    const handleSave = ()=>{
        if (!doctor || !patient || !time || !selectedDate) {
          enqueueSnackbar("Please complete all fields before saving.", { variant: "error" });
          return;
        }

        const newAppointment = { doctor,patient,time }

        const existingData = JSON.parse(localStorage.getItem("appointments") || "[]");

        const existingDateEntry = existingData.find((entry: any) => entry.date === dateKey);

        if (existingDateEntry) {
          if(isEditing && editIndex !== null){
            existingDateEntry.appointments[editIndex] = newAppointment
            enqueueSnackbar("Appointment updated!", { variant: "success" })
          }else{
            existingDateEntry.appointments.push(newAppointment);
            enqueueSnackbar("Appointment Added!", { variant: "success" })
          }
        } else {
          existingData.push({
            date: dateKey,
            appointments: [newAppointment],
          });
        }


        localStorage.setItem('appointments',JSON.stringify(existingData))
        onClose()

        setDoctor("");
        setPatient("");
        setTime("");
        setEditIndex(null);
        setIsEditing(false);

    }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg  flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* modalheader */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white"> {selectedDate && `${monthNames[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`}  </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200" >   × </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Doctor Name</label>
                        <select value={doctor} onChange={(e)=>setDoctor(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <option value="">Select Doctor</option>
                            {doctors.map((doctor)=>(
                                <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-2/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> Patient Name </label>
                        <select value={patient} onChange={(e)=>setPatient(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                            <option value="">Select Patient</option>
                            {patients.map((pat)=>(
                                <option key={pat.id} value={pat.name}>{pat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full sm:w-1/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Slot</label>
                        <select    value={time}   onChange={(e) => setTime(e.target.value)}   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" >
                            <option value=""> Time Slot</option>
                            {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>))}
                        </select>
                        </div>
                    </div>
                </div>
            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6  border-gray-200 dark:border-gray-700">
              <button onClick={onClose} className="px-6  py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" >  Cancel </button>
              <button onClick={handleSave} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:shadow-lg">  Add  </button>
            </div>

        </div>
        <div className="">
          <div className="flex items-center p-4">
            < AppointmentList date={dateKey} onEdit={handleEdit}/>
          </div>
        </div>


      </div>
    </div>
  )
}

export default AppointmentView
