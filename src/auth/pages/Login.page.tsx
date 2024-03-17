import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

export default function LoginPage(): JSX.Element {
  return (
    <div className='grid place-items-center min-h-screen'>
      <div className='flex flex-col lg:flex-row'>
        <div className='p-4 bg-slate-800 rounded-md rounded-r-none text-center h-auto'>
          <h3 className='text-3xl mb-3 font-semibold'>Ingreso</h3>
          <form className='flex flex-col gap-1'>
            <Input type='text' placeholder='Correo' />
            <Input type='password' placeholder='Contraseña' />
            <Button type='button'>Login</Button>
          </form>
        </div>

        <div className='p-4 bg-gray-900 rounded-md rounded-l-none text-center'>
          <h3 className='text-3xl mb-3 font-semibold'>Registro</h3>
          <form className='flex flex-col gap-2'>
            <Input type='text' placeholder='Nombre' />
            <Input type='email' placeholder='Correo' />
            <Input type='password' placeholder='Contraseña' />
            <Input type='password' placeholder='Repita la contraseña' />

            <Button type='button'>Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
