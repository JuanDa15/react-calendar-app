import useCalendarStore from '../../hooks/calendar-hook';
import { Calendar } from '../../ui/Calendar';
import { FabAddBtn } from '../../ui/FabAddBtn';
import FabDeleteBtn from '../../ui/FabDeleteBtn';
import { Navbar } from '../../ui/Navbar';



export default function CalendarPage(): JSX.Element {
  const { events } = useCalendarStore()
  return (
    <>
      <Navbar />
      <div className='p-4 bg-slate-500 relative'>
        <Calendar events={events} />
        <FabAddBtn />
        <FabDeleteBtn />
      </div>
    </>
  );
}
