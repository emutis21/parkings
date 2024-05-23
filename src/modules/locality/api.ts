import type { Locality as ILocality } from './types'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<ILocality[]> => {
    try {
      const response = await fetch(`${API_URL}/localidad/find`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocality[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idLocalidad: ILocality['idLocalidad']): Promise<ILocality> => {
    try {
      const response = await fetch(`${API_URL}/localidad/find/${idLocalidad}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocality = await response.json()

      // if (!data) throw new Error('Localidad not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (locality: ILocality): Promise<ILocality> => {
    try {
      const body = JSON.stringify(locality)

      const response = await fetch(`${CLIENT_API_URL}/localidad/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocality = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (locality: ILocality): Promise<ILocality> => {
    const { idLocalidad, nombreLocalidad } = locality

    const body = JSON.stringify({ nombreLocalidad })

    try {
      const response = await fetch(`${CLIENT_API_URL}/localidad/update/${idLocalidad}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ILocality = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  delete: async (idEntity: string): Promise<string> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/localidad/delete/${idEntity}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()

        throw new Error(errorData as string)
      }

      return `Localidad con id ${idEntity} eliminada`
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  }
}

export default api
