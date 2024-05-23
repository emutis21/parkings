import type { Parking as IParking } from './types'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<IParking[]> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find`, { method: 'GET' })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IParking[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idParqueadero: IParking['idParqueadero']): Promise<IParking> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find/${idParqueadero}`, {
        method: 'GET'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IParking = await response.json()

      // if (!data) throw new Error('Parqueadero not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetchByLocalitie: async (idLocalidad: IParking['idLocalidad']): Promise<IParking[]> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find/localidad/${idLocalidad}`, {
        method: 'GET'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IParking[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (parking: IParking): Promise<IParking> => {
    try {
      const body = JSON.stringify(parking)

      const response = await fetch(`${CLIENT_API_URL}/parqueadero/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IParking = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (parking: IParking): Promise<IParking> => {
    const { direccion, disponible, idParqueadero } = parking

    const body = JSON.stringify({
      direccion,
      disponible
    })

    try {
      const response = await fetch(`${CLIENT_API_URL}/parqueadero/update/${idParqueadero}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IParking = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  delete: async ({
    idParqueadero
  }: {
    idParqueadero: IParking['idParqueadero']
  }): Promise<string> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/parqueadero/delete/${idParqueadero}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(errorData as string)
      }

      return `Parqueadero con id ${idParqueadero} eliminado`
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  }
}

export default api
