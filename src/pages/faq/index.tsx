import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const FaqPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  const faqData = [
    {
      question: 'Como faço para criar uma conta?',
      answer:
        "Para criar uma conta, clique no botão 'Criar Conta' na página inicial e preencha os campos necessários, como seu nome, e-mail e senha.",
    },
    {
      question: 'Posso alterar meu e-mail depois de criar minha conta?',
      answer:
        "Sim, você pode alterar seu e-mail a qualquer momento nas configurações de perfil, acessando a seção 'Informações Pessoais'.",
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer:
        'Aceitamos cartões de crédito, débito, PayPal e transferência bancária.',
    },
    {
      question: 'Como posso cancelar minha assinatura?',
      answer:
        "Você pode cancelar sua assinatura a qualquer momento nas configurações de conta. Basta ir até 'Plano de Assinatura' e clicar em 'Cancelar Assinatura'.",
    },
    {
      question: 'O que fazer se eu esquecer minha senha?',
      answer:
        "Se você esquecer sua senha, basta clicar em 'Esqueci minha senha' na tela de login e seguir as instruções para redefinir sua senha via e-mail.",
    },
  ]

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: '0 auto', p: 2 }}>
      {/* Título */}
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        Perguntas Frequentes (FAQ)
      </Typography>

      {/* Descrição */}
      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}
      >
        Aqui você encontrará as respostas para as perguntas mais comuns. Caso
        não encontre a solução que procura, entre em contato conosco.
      </Typography>

      {/* Lista de Perguntas e Respostas */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
              sx={{ mb: 2, borderRadius: 2, boxShadow: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default FaqPage
