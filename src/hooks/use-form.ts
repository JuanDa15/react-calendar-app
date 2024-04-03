/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEventHandler, useEffect, useMemo, useState } from 'react';

export function useForm(initialForm: any = {}, formValidations: Record<string, any> = {}) {

  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState<Record<string, string>>({});

  useEffect(() => {
    createValidators();
  }, [formState])

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm])


  const isFormValid = useMemo(() => {

    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation])


  const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onResetForm = () => {
    setFormState(initialForm);
  }

  const createValidators = () => {

    const formCheckedValues: Record<string, string> = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }



  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid
  }
}