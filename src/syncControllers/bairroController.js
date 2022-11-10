import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Sao_Paulo",
};

export default {
  async postBairro(req, res) {
    try {
      let bairros = req.body;
      bairros.forEach(async (bairro) => {
        bairro.BAIRRO_ID,
          bairro.NOME_BAI,
          bairro.CODEMP,
          bairro.CNTINSERT,
          bairro.CNTUPDATE,
          bairro.DATAALTERACAO;

        let cBairro = await prisma.bairro.create({
          data: {
            BAIRRO_ID: parseInt(bairro.BAIRRO_ID, 10),
            NOME_BAI: bairro.NOME_BAI,
            CNTINSERT: parseInt(bairro.CNTINSERT, 10),
            CNTUPDATE: parseInt(bairro.CNTUPDATE, 10),
            DATAALTERACAO: new Date(bairro.DATAALTERACAO),
            CODEMP: parseInt(bairro.CODEMP, 10),
          },
        });
        res.send("Ok");
      });
    } catch (error) {
      console.log(error);
    }
  },
};
