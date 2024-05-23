import { Localitie as ILocalitie } from './types'

const API_URL = process.env.PARKINGS_API_URL
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL

const api = {
  list: async (): Promise<ILocalitie[]> => {
    try {
      const response = await fetch(`${API_URL}/localidad/find`, { method: 'GET' })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocalitie[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idLocalidad: ILocalitie['idLocalidad']): Promise<ILocalitie> => {
    try {
      const response = await fetch(`${API_URL}/localidad/find/${idLocalidad}`, { method: 'GET' })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocalitie = await response.json()

      if (!data) throw new Error('Localidad not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (localitie: ILocalitie): Promise<ILocalitie> => {
    try {
      const body = JSON.stringify(localitie)

      const response = await fetch(`${CLIENT_API_URL}/localidad/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocalitie = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (localitie: ILocalitie): Promise<ILocalitie> => {
    const { idLocalidad, nombreLocalidad } = localitie

    console.log('localitie', localitie)

    const body = JSON.stringify({ nombreLocalidad })

    try {
      const response = await fetch(`${CLIENT_API_URL}/localidad/update/${idLocalidad}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocalitie = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  delete: async ({ idLocalidad }: { idLocalidad: ILocalitie['idLocalidad'] }): Promise<string> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/localidad/delete/${idLocalidad}`, { method: 'DELETE' })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Network response was not ok')
      }

      return `Localidad con id ${idLocalidad} eliminada`
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },
}

export default api
