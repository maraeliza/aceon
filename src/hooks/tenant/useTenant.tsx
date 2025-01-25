import { formatDate } from '@/utils/funcs'
import { Tenant } from '@/utils/interfaces'

export const getAllTenants = async (): Promise<Tenant[]> => {
  const response = await fetch('http://localhost:8080/tenants/')
  const data = await response.json()
  const tenants: Tenant[] = data.map((tenant: any) => ({
    id: tenant.id,
    planId: tenant.plan_id,
    countryId: tenant.country_id,
    statusId: tenant.status_id,
    signature: formatDate(tenant.signature),
    expiration: formatDate(tenant.expiration),
    name: tenant.name,
    cellphone: tenant.cellphone,
    CNPJ: tenant.CNPJ,
    address: tenant.address,
  }))
  return tenants
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
      cellphone: newTenant.cellphone,
      CNPJ: newTenant.CNPJ,
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
      console.log('Tenant adicionado com sucesso:', data)
      return data
    } else {
      console.error('Erro ao adicionar tenant:', response.statusText)
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

    if (response.ok) {
      console.log('Tenant deletado com sucesso')
      return true
    } else {
      console.error('Erro ao deletar tenant:', response.statusText)
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    return false
  }
}

export const updateTenant = async (tenantId: number, updatedTenant: Tenant) => {
  try {
    const tenantData = {
      planId: updatedTenant.planId,
      countryId: updatedTenant.countryId,
      statusId: updatedTenant.statusId,
      signature: updatedTenant.signature,
      expiration: updatedTenant.expiration,
      name: updatedTenant.name,
      cellphone: updatedTenant.cellphone,
      CNPJ: updatedTenant.CNPJ,
      address: updatedTenant.address,
    }

    const response = await fetch(
      `http://localhost:8080/tenants/update/${tenantId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tenantData),
      },
    )

    if (response.ok) {
      const data = await response.json()
      console.log('Tenant atualizado com sucesso:', data)

      return data
    } else {
      console.error('Erro ao atualizar tenant:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Erro ao enviar os dados para atualização:', error)
    return null
  }
}
