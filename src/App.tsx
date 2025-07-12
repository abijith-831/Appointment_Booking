import { SnackbarProvider } from 'notistack';
import './App.css'
import CalendarView from './Components/Calendar/CalendarView'

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <CalendarView/>
    </SnackbarProvider>
  )
}

export default App
