// Definição da interface para País
export interface Country {
  country_id: number
  iso_code: string
  name: string
  flag_url: string
}

// Lista inicial de países
export const initialCountries: Country[] = [
  {
    country_id: 1,
    name: 'United States',
    iso_code: 'US',
    flag_url: 'https://flagcdn.com/w320/us.png',
  },
  {
    country_id: 2,
    name: 'Brazil',
    iso_code: 'BR',
    flag_url: 'https://flagcdn.com/w320/br.png',
  },
  {
    country_id: 3,
    name: 'France',
    iso_code: 'FR',
    flag_url: 'https://flagcdn.com/w320/fr.png',
  },
]