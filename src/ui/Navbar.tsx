import { Button } from "./Button";
import { CalendarIcon, SignOutIcon } from "./Icons";
import LanguageSelector from "./LenguageSelector";

export function Navbar (): JSX.Element {
  return (
    <nav className="flex flex-row justify-between items-center px-4 py-3 bg-slate-800 h-[64px]">
      <div className="flex flex-row gap-2">
        <CalendarIcon />
        <b>Calendar</b>
      </div>
      <div className="flex flex-row gap-2">
        <LanguageSelector />
        <Button type="button" className="flex flex-row gap-2 bg-red-800 hover:bg-red-600">
          <SignOutIcon />
          SignOut
        </Button>
      </div>
    </nav>
  )
}
