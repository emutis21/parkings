import type { Space as ISpace } from './types'

import { deleteEntity } from '@/lib/api'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<ISpace[]> => {
    try {
      const response = await fetch(`${API_URL}/espacio/find`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ISpace[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idEspacio: ISpace['idEspacio']): Promise<ISpace> => {
    try {
      const response = await fetch(`${API_URL}/espacio/find/${idEspacio.toString()}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ISpace = await response.json()

      // if (!data) throw new Error('Space not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetchByArea: async (idArea: ISpace['idArea']): Promise<ISpace[]> => {
    try {
      const response = await fetch(`${API_URL}/espacio/find/area/${idArea}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ISpace[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (space: Omit<ISpace, 'idEspacio'>): Promise<ISpace> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/espacio/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(space)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ISpace = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (space: ISpace): Promise<ISpace> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/espacio/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(space)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: ISpace = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  delete: async (idEspacio: ISpace['idEspacio']): Promise<string> => {
    return deleteEntity('espacio', idEspacio.toString())
  }
}

export default api
