import { LangIcon } from "./Icons";
import { Langs } from "../definitions";
import useCalendarStore from "../hooks/calendar-hook";

export default function LanguageSelector (): JSX.Element {
  const { lang, setLang } = useCalendarStore()

  return (
    <div className="overflow-hidden flex flex-row border-solid border-[1px] border-blue-700 rounded-md [&>button]:flex [&>button]:flex-row [&>button]:p-2 [&>button]:gap-1 " >
      <button type="button" className={`bg-slate-600 hover:bg-sky-500 ${lang === Langs.en && 'bg-sky-500'}`} onClick={ () => setLang(Langs.en)}>
        <LangIcon /> EN
      </button>
      <button type="button" className={`bg-slate-400 hover:bg-sky-500 ${lang === Langs.es && 'bg-sky-500'}`} onClick={ () => setLang(Langs.es)}>
      <LangIcon /> ES
      </button>
    </div>
  )
}
