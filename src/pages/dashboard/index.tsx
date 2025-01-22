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
} from 'recharts'
import { automationUsage, COLORS, conversionRate, formStats } from './data'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
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
