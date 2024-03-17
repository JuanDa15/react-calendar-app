import useCalendarStore from "../hooks/calendar-hook"
import useUiStore from "../hooks/ui-store-hook"
import { TrashIcon } from "./Icons"

export default function FabDeleteBtn (): JSX.Element {
  const { activeEvent, startDeletingEvent } = useCalendarStore()
  const { closeModal } = useUiStore()
  const handleClick = async () => {
    if (activeEvent?._id) {
      await startDeletingEvent(activeEvent._id)
      closeModal()
    }
  }

  if (!activeEvent) return <></>

  return (
    <button
      type="button"
      className="absolute transition-colors left-5 bottom-5 bg-red-600 p-2 rounded-full hover:bg-red-700 z-30"
      onClick={handleClick}
    >
      <TrashIcon className="w-8 h-8" />
    </button>
  )
}
