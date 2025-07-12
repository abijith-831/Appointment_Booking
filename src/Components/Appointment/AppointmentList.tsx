interface AppointmentListProps{
  date:string
}

const AppointmentList = ({ date }: AppointmentListProps) => {

  const storedAppointments = JSON.parse(localStorage.getItem('appointments') || "[]");

  const appointmentForDate = storedAppointments.find((item:any)=>item.date === date);

  
    
  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Appointments on {date}
      </h2>

      {appointmentForDate && appointmentForDate.appointments.length > 0 ? (
        <ul className="space-y-2">
          {appointmentForDate.appointments.map((appt: any, index: number) => (
            <li
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
            >
              <p><strong>Doctor:</strong> {appt.doctor}</p>
              <p><strong>Patient:</strong> {appt.patient}</p>
              <p><strong>Time:</strong> {appt.time}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No appointments found for this date.</p>
      )}
    </div>
  )
}

export default AppointmentList
