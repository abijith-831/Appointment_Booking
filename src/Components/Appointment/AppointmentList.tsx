interface AppointmentListProps{
  date:string;
  onEdit:(index:number , data:any)=>void
}

const AppointmentList = ({ date ,onEdit}: AppointmentListProps) => {

  const storedAppointments = JSON.parse(localStorage.getItem('appointments') || "[]");

  const appointmentForDate = storedAppointments.find((item:any)=>item.date === date);

  if (!appointmentForDate) {
    return (
      <div className="p-4 w-full">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Appointments on {date}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">No appointments found for this date.</p>
      </div>
    );
  }
    
  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Appointments on {date}
      </h2>

      <ul className="space-y-2">
        {appointmentForDate.appointments.map((appt: any, index: number) => (
          <li key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-1">
                <p><span>{index+1} - </span><strong>Doctor:</strong> {appt.doctor}</p>
                <p><strong>Patient:</strong> {appt.patient}</p>
                <p><strong>Time:</strong> {appt.time}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={()=>onEdit(index,appt)}  className="bg-blue-400 transition-transform hover:scale-105 duration-300  border-1 rounded-sm px-6 py-1"> Edit</button>
                <button  className="bg-red-400 transition-transform hover:scale-105 duration-300 border-1 rounded-sm px-6 py-1" > Delete </button>
              </div>
            </div>

          </li>
        ))}
      </ul>

    </div>
  )
}

export default AppointmentList
