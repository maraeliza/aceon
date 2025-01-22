import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from '@mui/material'

import { BarChart, PieChart } from '@mui/x-charts'
import { responsesData } from './data'
// Dados de exemplo

// Cores para os gráficos
const COLORS = ['#3b82f6', '#34d399', '#f87171', '#facc15', '#a855f7']

const AnalysisScreen = () => {
  return (
    <Box padding={4}>
      <Typography variant="h5" gutterBottom>
        Análise de Respostas do Formulário
      </Typography>

      {responsesData.map((item) => (
        <Box key={item.id} marginBottom={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.question}
              </Typography>
              <Box
                display="flex"
                gap={4}
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Box width="45%" height={300}>
                  <BarChart
                    xAxis={[
                      { scaleType: 'band', data: Object.keys(item.answers) },
                    ]}
                    series={[
                      {
                        data: Object.values(item.answers),
                        color: COLORS[0],
                      },
                    ]}
                  />
                </Box>
                <Box width="45%" height={300}>
                  <PieChart
                    series={[
                      {
                        outerRadius: 120,
                        data: Object.entries(item.answers).map(
                          ([label, value]) => ({
                            label,
                            value,
                          }),
                        ),
                        color: COLORS[0],
                      },
                    ]}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}

      <Typography variant="h5" gutterBottom>
        Resumo Detalhado
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Questão</TableCell>
              <TableCell>Opção</TableCell>
              <TableCell>Respostas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responsesData.map((item) =>
              Object.entries(item.answers).map(([option, count]) => (
                <TableRow key={`${item.id}-${option}`}>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{option}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              )),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AnalysisScreen
