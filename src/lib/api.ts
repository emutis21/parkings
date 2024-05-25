const CLIENT_API_URL = process.env.NEXT_PUBLIC_PARKINGS_API_URL ?? ''

export const deleteEntity = async (entity: string, idEntity: string): Promise<string> => {
  try {
    const response = await fetch(`${CLIENT_API_URL}/${entity}/delete/${idEntity}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      const errorData = await response.json()

      if (response.status === 404) {
        throw new Error(`La entidad ${entity} con id ${idEntity} no se encontró`)
      }

      throw new Error(errorData as string)
    }

    return `${entity.charAt(0).toUpperCase() + entity.slice(1)} con id ${idEntity} eliminada`
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server')
    }
    throw error
  }
}
