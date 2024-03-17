import { ChangeEventHandler, FormEventHandler, useEffect, useMemo, useState } from 'react';
import { Button } from './Button';
import { CheckIcon } from './Icons';
import { Input } from './Input';
import { TextArea } from './TextArea';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enUS, es } from 'date-fns/locale';
import { differenceInSeconds } from 'date-fns';
import useCalendarStore from '../hooks/calendar-hook';
import { CalendarEvent } from '../definitions';
import useUiStore from '../hooks/ui-store-hook';

registerLocale('es-ES', es)
registerLocale('en-US', enUS)

export function CreateEventForm(): JSX.Element {
  const { lang, activeEvent, startSavingEvent } = useCalendarStore()
  const { closeModal } = useUiStore()
  const [submitted, setSubmitted] = useState(false)

  const [formValues, setFormValues] = useState<{
    title: string,
    notes: string,
    start: Date | null,
    end: Date | null,
    _id: string | null,
    bgColor: string,
  }>({
    title: '',
    notes: '',
    start: null,
    end: null,
    _id: null,
    bgColor: '#4463d5',
  });

  useEffect(() => {
    if (activeEvent) {
      setFormValues({
        title: activeEvent.title,
        notes: activeEvent.notes,
        start: activeEvent.start,
        end: activeEvent.end,
        _id: activeEvent._id,
        bgColor: activeEvent.bgColor,
      })
    }
  }, [ activeEvent ])

  const handleInputChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = ({
    target,
  }) => {
    const { name, value } = target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, inputName: 'start' | 'end') => {
    setFormValues((prev) => ({
      ...prev,
      [inputName]: date,
    }));
  };

  const titleClass = useMemo(() => {
    if (!submitted) return ''
    if (formValues.title.length > 0) return ''
    return 'text-red-500 border-red-500 border-[2px]'
  }, [formValues.title, submitted])

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setSubmitted(true)
    if (!formValues.title) return window.alert('Title is required');

    const dateDifference = differenceInSeconds(formValues.end!, formValues.start!)

    if (isNaN(dateDifference)) return window.alert('Please select a valid date')
    if (dateDifference <= 0) return window.alert('End Date should be higher than start date')

    await startSavingEvent({...formValues, user: { _id: 'efcesvesf', name: 'Carlos'}} as CalendarEvent)

    setSubmitted(false)
    closeModal()
  }

  return (
    <>
      <h1 className='text-2xl text-center'> Nuevo evento </h1>
      <hr className='my-2' />
      <form onSubmit={handleSubmit} className='w-100 flex flex-col gap-2 min-w-[300px]'>
        <DatePicker
          selected={formValues.start}
          placeholderText='Fecha y hora de inicio'
          onChange={(event) => handleDateChange(event, 'start')}
          dateFormat='Pp'
          className='px-4 py-2 rounded-md focus:outline-[2px] focus:outline-sky-600 bg-inherit border-solid border-[1px] border-sky-600 w-full'
          showTimeSelect={true}
          locale={lang}
          timeCaption={ lang === 'es-ES' ? 'Hora' : 'Time' }
        />
        <DatePicker
          minDate={formValues.start}
          selected={formValues.end}
          placeholderText='Fecha y hora de fin'
          onChange={(event) => handleDateChange(event, 'end')}
          dateFormat='Pp'
          className='px-4 py-2 rounded-md focus:outline-[2px] focus:outline-sky-600 bg-inherit border-solid border-[1px] border-sky-600 w-full'
          showTimeSelect={true}
          locale={lang}
        />

        <div className='flex flex-col'>
          <Input
            type='text'
            placeholder='Título del evento'
            value={formValues.title}
            name='title'
            onChange={handleInputChange}
            className={titleClass}
          />
          <small
            className='inline-block w-full text-sky-300 px-2 rounded-md'
            id='emailHelp'
          >
            Una descripción corta
          </small>
        </div>

        <div className='flex flex-col'>
          <TextArea
            placeholder='Notas'
            rows={5}
            name='notes'
            value={formValues.notes}
            onChange={handleInputChange}
          />
          <small
            className='inline-block w-full text-sky-300 px-2 rounded-md'
            id='emailHelp'
          >
            Información adicional
          </small>
        </div>

        <div className='relative flex flex-col'>
          <small>Select and event color</small>
          <label htmlFor='bgColor' className={`inline-block w-full h-8 rounded-md`} style={{
            backgroundColor: formValues.bgColor,
          }}></label>
          <input type='color' name='bgColor' value={formValues.bgColor} onChange={handleInputChange} hidden id='bgColor'/>
        </div>

        <Button type='submit' className='flex flex-row gap-2 justify-center text-white'>
          <CheckIcon />
          <span> Guardar</span>
        </Button>
      </form>
    </>
  );
}
