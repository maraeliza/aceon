import { Plan } from '@/utils/interfaces'

export const getAllPlans = async (): Promise<Plan[]> => {
  const response = await fetch('http://localhost:8080/plans/')
  const data = await response.json()
  const plans: Plan[] = data.map((plan: any) => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
  }))
  return plans
}

export const postPlan = async (newPlan: Plan) => {
  try {
    const planData = {
      name: newPlan.name,
      description: newPlan.description,
      price: newPlan.price,
    }
    const response = await fetch('http://localhost:8080/plans/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Plano adicionado com sucesso:', data)
      return data
    } else {
      console.error('Erro ao adicionar plano:', response.statusText)
    }
  } catch (error) {
    console.error('Erro ao enviar os dados:', error)
  }
}

export const deletePlan = async (id: number) => {
  try {
    console.log('ID ENVIADO A API', id)
    const response = await fetch(`http://localhost:8080/plans/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      console.log('Plano deletado com sucesso')
      return true
    } else {
      console.error('Erro ao deletar plano:', response.statusText)
      return false
    }
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error)
    return false
  }
}
export const updatePlan = async (planId: number, updatedPlan: Plan) => {
  try {
    const planData = {
      name: updatedPlan.name,
      description: updatedPlan.description,
      price: updatedPlan.price,
    }

    const response = await fetch(
      `http://localhost:8080/plans/update/${planId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      },
    )

    if (response.ok) {
      const data = await response.json()
      console.log('Plano atualizado com sucesso:', data)

      return data
    } else {
      console.error('Erro ao atualizar plano:', response.statusText)
      return null
    }
  } catch (error) {
    console.error('Erro ao enviar os dados para atualização:', error)
    return null
  }
}
