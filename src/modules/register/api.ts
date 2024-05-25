import type { Register as IRegister } from './types'

import { deleteEntity } from '@/lib/api'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<IRegister[]> => {
    try {
      const response = await fetch(`${API_URL}/registro/find`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IRegister[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idRegistro: IRegister['idRegistro']): Promise<IRegister> => {
    try {
      const response = await fetch(`${API_URL}/registro/find/${idRegistro}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IRegister = await response.json()

      // if (!data) throw new Error('Registro not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (data: Omit<IRegister, 'idRegistro'>): Promise<IRegister> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/registro/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const newRegister: IRegister = await response.json()

      return newRegister
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (data: IRegister): Promise<IRegister> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/registro/update/${data.idRegistro}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const updatedRegister: IRegister = await response.json()

      return updatedRegister
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  delete: (idEntity: string): Promise<string> => deleteEntity('registro', idEntity)
}

export default api
