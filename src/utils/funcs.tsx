export const formatDate = (dateString: string) => {
  const date = new Date(dateString) // Converte a string da data para um objeto Date
  return date.toLocaleDateString('pt-BR', {
    // Formata a data para o formato brasileiro
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
