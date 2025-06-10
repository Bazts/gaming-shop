import { useEffect } from "react"
import { useAuthStore } from "../stores/authStore"
import { api } from "../../../../api/axios"

export const UserSessionPanel = () => {
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    const localUser = sessionStorage.getItem('local_user')

    if (!localUser) {
      return setUser(null)
    }

    setUser(JSON.parse(localUser))
  }, [])

  const logout = async () => {
    try {
      const apiEndpoint = '/api/auth/logout'
      const res = await api.get(apiEndpoint)

      const { data } = res

        window.location.href = '/'
        sessionStorage.removeItem('local_user')
        setUser(null)
      
    } catch (error) {
      
    }
  }
  
  return (
          <>
            {
              !user
              ? <>
              <div className="flex items-center gap-2">
        <a
          className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/registro"
          aria-label="Ir a la página sobre nosotros"
        >
          Registro
        </a>
        <a
          className="bg-neutral-700 py-2 px-4 rounded-md hover:bg-neutral-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/iniciar-sesion"
          aria-label="Ir a la página sobre nosotros"
        >
          Iniciar sesion
        </a>
      </div>
              </>
              :  <div className='flex items-center gap-2'>
                <a
          className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/inventario"
          aria-label="Ir a la página sobre nosotros"
        >
          Inventario
        </a>
        <button onClick={logout} className="py-2 px-4 rounded-md bg-neutral-700 hover:bg-red-700 transition duration-150 hover:cursor-pointer">Cerrar sesión</button>
              </div>
            }
          </>
  )
}