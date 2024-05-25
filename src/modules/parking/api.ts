import type { Parking as IParking } from './types'

import { deleteEntity } from '@/lib/api'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<IParking[]> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find`, {
        method: 'GET',
        cache: 'no-store'
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

  fetch: async (idParqueadero: IParking['idParqueadero']): Promise<IParking> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find/${idParqueadero}`, {
        method: 'GET',
        cache: 'no-store'
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

  fetchByLocality: async (idLocalidad: IParking['idLocalidad']): Promise<IParking[]> => {
    try {
      const response = await fetch(`${API_URL}/parqueadero/find/localidad/${idLocalidad}`, {
        method: 'GET',
        cache: 'no-store'
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

  delete: (idEntity: string): Promise<string> => deleteEntity('parqueadero', idEntity)
}

export default api
