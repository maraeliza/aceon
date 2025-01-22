// Interface para o plano
export interface Plan {
  plan_id: number;
  name: string;
  description: string;
  price: number;
}

// Lista inicial de planos
export const initialPlans: Plan[] = [
  {
    plan_id: 1,
    name: 'Free',
    description: 'Plano básico com recursos limitados.',
    price: 0.0,
  },
  {
    plan_id: 2,
    name: 'Pro',
    description: 'Plano avançado para pequenas empresas.',
    price: 49.99,
  },
  {
    plan_id: 3,
    name: 'Enterprise',
    description: 'Plano completo para grandes organizações.',
    price: 199.99,
  },
];
