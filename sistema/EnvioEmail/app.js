const express = require("express");
const { json } = require('express')
const env = require('./env');
const cors = require('cors')

const app = express();


const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(json())
// ROTAS 


app.post('/sendmail', (req, res) => {
  console.log(req.body)
  const { email, nome, mensagem, telContato } = req.body
  //text
  const mensagemEmail = `
  Enviado por: ${email} Contato: ${telContato}

  ${mensagem}
  `


  //nodemailer
  const nodemailer = require('nodemailer');

  if (!nome || !email || !mensagem) {
    return res.status(400).send("Campo Inválido")
  }

  const transporter = nodemailer.createTransport({ // Configura os parâmetros de conexão com servidor.
    host: 'mail.tc2code.com.br',
    port: 465,
    // server: 'Gmail',
    secure: true,
    auth: {
      user: env.emailContact,
      pass: env.passwordMailer
    }
  });

  //composição email 
  const mailOptions = {
    from: env.emailContact,
    to: env.emailContact,
    subject: `${nome} entrou em contato`,
    text: mensagemEmail
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email Enviado:' + info.response);
    }
  });
  return res.status(200).send("Email Enviado com Sucesso");
})


//fim rotas
app.listen(PORT, () => {
  console.log(`Server Rodando na porta ${PORT}`)
})



