import axios from 'axios'
import { useState } from "react";
import { Form } from "../../components/form/Form";
import { api } from "../../../../api/axios";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]> ([])

    const handleSumit = async (formData: Record<string, any>) => {
    try {
      setIsLoading(true)
      const apiEndpoint = '/api/auth/register'
      const res = await api.post(apiEndpoint, formData)

      window.location.href = '/iniciar-sesion'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data);
        setErrors(error.response?.data.details.errors)
      } else {
        console.error('Error inesperado:', error);
        setErrors(['Error inesperado al intentar iniciar sesión'])
      }
      
      const errorMessage = error instanceof Error
        ? error.message
        : 'An error has occurred'
      
      console.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Crear Cuenta</h2>

      {errors.length > 0 && (
        <div className='my-2 flex flex-col gap-1 max-w-80 mx-auto'>
          {errors.map((error, index) => (
              <p className='text-red-400 text-center' key={index}>{error}</p>
          ))}
        </div>
      )}
      
      <Form className="space-y-4" onSubmit={handleSumit}>
        <div>
          <label className="block text-gray-300 mb-1">Nombre completo</label>
          <input
            type="text"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tu nombre"
            name="full_name"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@dominio.com"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition"
        >
          {
            !isLoading
              ? 'Registrarse'
              : <div className="size-6 mx-auto">
                <div className="size-full rounded-full border-3 border-neutral-200 border-b-transparent animate-spin" />
              </div>
          }
        </button>
      </Form>
      <p className="text-center text-gray-400 mt-4">
        ¿Ya tienes una cuenta?{' '}
        <a href="iniciar-sesion" className="text-blue-500 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}