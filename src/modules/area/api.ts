import type { Area as IArea } from './types'

const API_URL = process.env.PARKINGS_API_URL ?? ''
const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

const api = {
  list: async (): Promise<IArea[]> => {
    try {
      const response = await fetch(`${API_URL}/area/find`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IArea[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetch: async (idArea: IArea['idArea']): Promise<IArea> => {
    try {
      const response = await fetch(`${API_URL}/area/find/${idArea}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IArea = await response.json()

      // if (!data) throw new Error('Area not found')

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  fetchByParking: async (idParqueadero: IArea['idParqueadero']): Promise<IArea[]> => {
    try {
      const response = await fetch(`${API_URL}/area/find/parqueadero/${idParqueadero}`, {
        method: 'GET',
        cache: 'no-store'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IArea[] = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  create: async (area: IArea): Promise<IArea> => {
    try {
      const response = await fetch(`${CLIENT_API_URL}/area/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(area)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IArea = await response.json()

      return data
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  },

  update: async (area: IArea): Promise<IArea> => {
    const { idArea, descripcion } = area

    try {
      const response = await fetch(`${CLIENT_API_URL}/area/update/${idArea}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(descripcion)
      })

      if (!response.ok) throw new Error('Network response was not ok')

      const data: IArea = await response.json()

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
      const response = await fetch(`${CLIENT_API_URL}/area/delete/${idEntity}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Network response was not ok')

      return `Área ${idEntity} eliminada`
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server')
      }
      throw error
    }
  }
}

export default api
