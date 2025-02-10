import AlertError from '@/components/Alerts/AlertError'
import AlertSucess from '@/components/Alerts/AlertSucess'
import { fmtDate, formatCNPJ, formatPhoneNumber } from '@/utils/funcs'
import { Pagination, Tenant } from '@/utils/interfaces'

export const getAllTenants = async (): Promise<Tenant[]> => {
  const response = await fetch('http://localhost:8080/tenants/')
  const data = await response.json()
  const tenants: Tenant[] = data.map((tenant: any) => ({
    id: tenant.id,
    planId: tenant.plan_id,
    countryId: tenant.country_id,
    statusId: tenant.status_id,
    signature: fmtDate(tenant.signature),
    expiration: fmtDate(tenant.expiration),
    name: tenant.name,
    cellphone: formatPhoneNumber(tenant.cellphone),
    CNPJ: formatCNPJ(tenant.CNPJ),
    address: tenant.address,
  }))
  return tenants
}

export const getAlltenantsPaged = async (
  page: number = 1,
  limit: number = 10,
): Promise<{ tenants: Tenant[]; pagination: Pagination }> => {
  const response = await fetch(
    `http://localhost:8080/tenants/paged?page=${page}&limit=${limit}`,
  )
  const data = await response.json()

  const tenants: Tenant[] = data.tenants.map((tenant: any) => ({
    id: tenant.id,
    planId: tenant.plan_id,
    countryId: tenant.country_id,
    statusId: tenant.status_id,
    signature: fmtDate(tenant.signature),
    expiration: fmtDate(tenant.expiration),
    name: tenant.name,
    cellphone: formatPhoneNumber(tenant.cellphone),
    CNPJ: formatCNPJ(tenant.CNPJ),
    address: tenant.address,
  }))

  return {
    tenants,
    pagination: data.pagination,
  }
}

export const getDataDashboard = async () => {
  try {
    const planResponse = await fetch(
      'http://localhost:8080/tenants/companies-by-plan',
    )
    const planData = await planResponse.json()

    const dateResponse = await fetch(
      'http://localhost:8080/tenants/companies-by-signature-date',
    )
    const dateData = await dateResponse.json()

    return { planData, dateData }
  } catch (error) {
    console.error('Erro ao buscar os dados da API', error)
  }
}
export const downloadTenantsExcel = async (): Promise<void> => {
  console.log('ACESSANDO ESSA API')
  const response = await fetch('http://localhost:8080/tenants/export-excel', {
    method: 'GET',
  })

  if (response.ok) {
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'tenants.xlsx')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } else {
    console.error('Falha ao baixar o arquivo Excel:', response.statusText)
  }
}
export const downloadTenantsPDF = async (): Promise<void> => {
  console.log('ACESSANDO ESSA API')
  const response = await fetch('http://localhost:8080/tenants/export-pdf', {
    method: 'GET',
  })

  if (response.ok) {
    const blob = await response.blob()

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'relatorio_empresas.pdf')
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } else {
    console.error('Falha ao baixar o arquivo PDF:', response.statusText)
  }
}

export const postTenant = async (newTenant: Tenant) => {
  try {
    const tenantData = {
      planId: newTenant.planId,
      countryId: newTenant.countryId,
      statusId: newTenant.statusId,
      signature: newTenant.signature,
      expiration: newTenant.expiration,
      name: newTenant.name,
      cellphone: newTenant.cellphone?.replace(/\D/g, '') || '',
      CNPJ: newTenant.CNPJ?.replace(/\D/g, '') || '',
      address: newTenant.address,
    }
    const response = await fetch('http://localhost:8080/tenants/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tenantData),
    })

    if (response.ok) {
      const data = await response.json()
      AlertSucess(
        'Sucesso',
        `A empresa ${newTenant.name} foi cadastrada com sucesso`,
      )

      console.log('Tenant adicionado com sucesso:', data)
      return data
    } else {
      console.error('Erro ao adicionar tenant:', response.statusText)
      const errorData = await response.json()

      AlertError(
        'Erro',
        `Não foi possível cadastrar a empresa ${newTenant.name}. Erro:  ${errorData.message}`,
      )
    }
  } catch (error) {
    console.error('Erro ao enviar os dados:', error)
  }
}

export const deleteTenant = async (id: number) => {
  try {
    console.log('ID ENVIADO A API', id)
    const response = await fetch(`http://localhost:8080/tenants/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    if (response.ok) {
      console.log('Tenant deletado com sucesso')
      return true
    } else {
      console.error('Erro ao deletar tenant:', response.statusText)
      const errorData = await response.json()

      AlertError(
        'Erro',
        `Não foi possível deletar a empresa de id ${id}. Erro:  ${errorData.message}`,
      )
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    return false
  }
}
export const deleteTenants = async (ids: number[]) => {
  try {
    console.log('IDs enviados à API:', ids)

    const response = await fetch(
      'http://localhost:8080/tenants/delete-multiple',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }), // Passando os IDs no corpo da requisição
      },
    )

    console.log(response)

    if (response.ok) {
      console.log(`${ids.length} tenants deletados com sucesso`)
      return true
    } else {
      console.error('Erro ao deletar tenants:', response.statusText)
      const errorData = await response.json()

      AlertError(
        'Erro',
        `Não foi possível deletar as empresas de IDs ${ids.join(', ')}. Erro: ${errorData.message}`,
      )
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    return false
  }
}

export const updateTenant = async (updatedTenant: Tenant): Promise<boolean> => {
  try {
    const tenantData = {
      planId: updatedTenant.planId,
      countryId: updatedTenant.countryId,
      statusId: updatedTenant.statusId,
      signature: updatedTenant.signature,
      expiration: updatedTenant.expiration,
      name: updatedTenant.name,
      cellphone: updatedTenant.cellphone?.replace(/\D/g, '') || '',
      CNPJ: updatedTenant.CNPJ?.replace(/\D/g, '') || '',
      address: updatedTenant.address,
    }

    const response = await fetch(
      `http://localhost:8080/tenants/update/${updatedTenant.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tenantData),
      },
    )
    console.log(`http://localhost:8080/tenants/update/${updatedTenant.id}`)
    console.log(response)

    if (response.ok) {
      const data = await response.json()
      console.log('Tenant atualizado com sucesso:', data)
      AlertSucess(
        'Sucesso',
        `As alterações em ${updatedTenant.name} foram salvas com sucesso`,
      )
      return true
    } else {
      const errorData = await response.json() // Aqui você acessa o corpo da resposta de erro
      console.error('Erro ao atualizar tenant:', errorData.message) // Acessa a mensagem de erro do backend

      AlertError(
        'Erro',
        `Não foi possível salvar as alterações em ${updatedTenant.name}. Erro:  ${errorData.message}`,
      )
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar os dados para atualização:', error)
    return false
  }
}
