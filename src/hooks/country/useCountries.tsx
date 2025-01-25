import { Country } from '@/utils/interfaces'

export const getAllCountries = async (): Promise<Country[]> => {
  const response = await fetch('http://localhost:8080/countries/')
  const data = await response.json()

  const countries: Country[] = data.map((country: any) => ({
    country_id: country.id,
    iso_code: country.iso_code,
    name: country.name,
    flag_url: country.logo_url,
  }))

  return countries
}

export const postCountry = async (newCountry: Country) => {
  try {
    const countryData = {
      name: newCountry.name,
      iso_code: newCountry.iso_code,
      logo_url: newCountry.flag_url,
    }

    const response = await fetch('http://localhost:8080/countries/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(countryData),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('País adicionado com sucesso:', data)
      return data
    } else {
      console.error('Erro ao adicionar país:', response.statusText)
    }
  } catch (error) {
    console.error('Erro ao enviar os dados:', error)
  }
}
export const deleteCountry = async (id: number) => {
  try {
    console.log('ID ENVIADO A API' + id)
    const response = await fetch(
      `http://localhost:8080/countries/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    console.log(response)
    if (response.ok) {
      console.log('País deletado com sucesso')
      return true
    } else {
      console.error('Erro ao deletar país:', response.statusText)
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    return false
  }
}

export const updateCountry = async (
  countryId: number,
  updatedCountry: Country,
) => {
  try {
    const countryData = {
      name: updatedCountry.name,
      iso_code: updatedCountry.iso_code,
      logo_url: updatedCountry.flag_url,
    }

    console.log('ID ENVIADO A API' + countryId)
    console.log(countryData)

    const response = await fetch(
      `http://localhost:8080/countries/update/${countryId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryData),
      },
    )
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log('País atualizado com sucesso:', data)
      return data
    } else {
      console.error('Erro ao atualizar país:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Erro ao enviar os dados para atualização:', error)
    return null
  }
}
