import { Box, Paper, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
} from 'recharts'
import {
  automationUsage,
  COLORS,
  COLORS_ACEON,
  conversionRate,
  formStats,
} from './data'
import { useEffect, useState } from 'react'
import { getDataDashboard } from '@/hooks/tenant/useTenant'

const Dashboard: React.FC = () => {
  const [companiesByPlan, setCompaniesByPlan] = useState([])
  const [companiesBySignatureDate, setCompaniesBySignatureDate] = useState([])

  const fetchData = async () => {
    const data = await getDataDashboard()
    console.log(data)
    setCompaniesByPlan(data?.planData)
    setCompaniesBySignatureDate(data?.dateData)
  }
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(date))
  }
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <Typography>{`Data: ${formatDate(payload[0].payload.date)}`}</Typography>
          <Typography>{`Número de empresas: ${payload[0].payload.count}`}</Typography>
        </Box>
      )
    }

    return null
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" my={5}>
        Empresas
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>

        <Paper sx={{ padding: 3, flex: '1 1 48%', height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Empresas por Plano
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={companiesByPlan}
                dataKey="count"
                nameKey="planName"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {companiesByPlan.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS_ACEON[index % COLORS_ACEON.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        {/* Line Chart - Empresas por data de assinatura */}
        <Paper sx={{ padding: 3, flex: '1 1 48%', height: '300px', paddingBottom:6 }}>
          <Typography variant="h6" gutterBottom>
            Empresas por Data de Assinatura
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={companiesBySignatureDate}>
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => formatDate(tick)} 
              />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
              <Tooltip content={customTooltip} />
            
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>

      <Typography variant="h4" my={5}>
        Formulários
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ padding: 3, flex: '1 1 30%' }}>
          <Typography variant="h6">Total de Formulários</Typography>
          <Typography variant="h4">350</Typography>
        </Paper>
        <Paper sx={{ padding: 3, flex: '1 1 30%' }}>
          <Typography variant="h6">Automações Ativas</Typography>
          <Typography variant="h4">120</Typography>
        </Paper>
        <Paper sx={{ padding: 3, flex: '1 1 30%' }}>
          <Typography variant="h6">Taxa de Conversão Média</Typography>
          <Typography variant="h4">65%</Typography>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 3 }}>
        <Paper sx={{ padding: 3, flex: '1 1 48%', height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Formulários criados no último mês
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formStats}>
              <Line type="monotone" dataKey="forms" stroke="#8884d8" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ padding: 3, flex: '1 1 48%', height: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Uso de Automações
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={automationUsage}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {automationUsage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>

        <Paper sx={{ padding: 3, flex: '1 1 100%' }}>
          <Typography variant="h6" gutterBottom>
            Taxa de Conversão por Formulário
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionRate}>
              <Bar dataKey="rate" fill="#82ca9d" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  )
}

export const PageDashboard = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}
