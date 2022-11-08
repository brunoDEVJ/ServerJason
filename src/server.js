import express from "express"

import { router } from "./routes.js"

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 8096, (erro) => {
  if (erro) {
      return console.log(erro)
  }
  console.log("tudo funcionando")
}) 