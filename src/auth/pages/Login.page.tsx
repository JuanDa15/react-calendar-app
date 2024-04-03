import { FormEventHandler, useState } from 'react';
import { useForm } from '../../hooks/use-form';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import useAuthStore from '../../hooks/auth-store-hook';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
};

export default function LoginPage(): JSX.Element {
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  const [formSubmitted, setFormSubmitted] = useState<'login' | 'register' | null>()
  const {
    onInputChange: onLoginChange,
    loginEmail,
    loginPassword,
  } = useForm(loginFormFields);
  const {
    onInputChange: onRegisterChange,
    registerName,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  } = useForm(registerFormFields);

  const onLogin: FormEventHandler = (e) => {
    e.preventDefault();
    setFormSubmitted('login');
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const onRegister: FormEventHandler = (e) => {
    e.preventDefault();

    if (!equalPasswords) return;
    setFormSubmitted('register');
  
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  const equalPasswords = registerPassword === registerConfirmPassword;

  return (
    <div className='grid place-items-center min-h-screen'>
      <div className='flex flex-col lg:flex-row'>
        <div className='p-4 bg-slate-800 rounded-md rounded-r-none text-center h-auto'>
          <h3 className='text-3xl mb-3 font-semibold'>Ingreso</h3>
          <form className='flex flex-col gap-1' onSubmit={onLogin}>
            <Input
              type='email'
              placeholder='Correo'
              name='loginEmail'
              onChange={onLoginChange}
              value={loginEmail}
              autoComplete='off'
            />
            <Input
              type='password'
              placeholder='Contraseña'
              name='loginPassword'
              onChange={onLoginChange}
              value={loginPassword}
              autoComplete='off'
            />
            <Button type='submit'>Login</Button>
          </form>
          {(errorMessage && formSubmitted === 'login')  && (
            <p className='bg-red-300 text-red-700 rounded-md mt-2'>
              {errorMessage}
            </p>
          )}
        </div>

        <div className='p-4 bg-gray-900 rounded-md rounded-l-none text-center'>
          <h3 className='text-3xl mb-3 font-semibold'>Registro</h3>
          <form className='flex flex-col gap-2' onSubmit={onRegister}>
            <Input
              type='text'
              placeholder='Nombre'
              name='registerName'
              value={registerName}
              onChange={onRegisterChange}
              autoComplete='off'
            />
            <Input
              type='email'
              placeholder='Correo'
              name='registerEmail'
              value={registerEmail}
              onChange={onRegisterChange}
              autoComplete='off'
            />
            <Input
              type='password'
              placeholder='Contraseña'
              name='registerPassword'
              value={registerPassword}
              onChange={onRegisterChange}
              autoComplete='off'
            />
            <Input
              type='password'
              placeholder='Repita la contraseña'
              name='registerConfirmPassword'
              value={registerConfirmPassword}
              onChange={onRegisterChange}
              autoComplete='off'
            />
            {!equalPasswords && (
              <p className='bg-red-300 text-red-700 rounded-md mt-2'>
                Las contraseñas no coinciden
              </p>
            )}
            {(errorMessage && formSubmitted === 'register')  && (
            <p className='bg-red-300 text-red-700 rounded-md mt-2'>
              {errorMessage}
            </p>
          )}

            <Button type='submit'>Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
