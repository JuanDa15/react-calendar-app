import useCalendarStore from "../hooks/calendar-hook";
import useUiStore from "../hooks/ui-store-hook";
import { PlusIcon } from "./Icons";

export function FabAddBtn (): JSX.Element {
  const { openModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClick = () => {
    setActiveEvent(null)
    openModal()
  }
  return (
    <button
      type="button"
      className="absolute transition-colors right-5 bottom-5 bg-slate-800 p-2 rounded-full hover:bg-sky-500"
      onClick={handleClick}
    >
      <PlusIcon className="w-8 h-8" />
    </button>
  )
}
