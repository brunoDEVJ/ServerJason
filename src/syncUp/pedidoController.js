import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async postPedido(req, res) {
    try {
      let pedidos = req.body;
      bairros.forEach(async (bairro) => {
        bairro.BAIRRO_ID,
          bairro.NOME_BAI,
          bairro.CODEMP,
          bairro.CNTINSERT,
          bairro.CNTUPDATE,
          bairro.DATAALTERACAO;

        const str = bairro.DATAALTERACAO;

        const [dateValues, timeValues] = str.split(" ");

        const [day, month, year] = dateValues.split("/");
        const [hours, minutes, seconds] = timeValues.split(":");

        const date = new Date(
          +year,
          +month - 1,
          +day,
          +hours - 3,
          +minutes,
          +seconds
        );
        try {
          await prisma.pedido.create({
            data: {
              BAIRRO_ID: parseInt(bairro.BAIRRO_ID, 10),
              NOME_BAI: bairro.NOME_BAI,
              CNTINSERT: parseInt(bairro.CNTINSERT, 10),
              CNTUPDATE: parseInt(bairro.CNTUPDATE, 10),
              DATAALTERACAO: date,
              CODEMP: parseInt(bairro.CODEMP, 10),
            },
          });
          res.json({
            status: 200,
            message: "ok",
          });
        } catch (error) {
          res.json({ status: 250, message: error.meta.target });
          console.log("caiu no catch de dentro");
        }
      });
      console.log(pedidos)
    } catch (error) {
      res.json({ status: 202, message: "erro!" });
      console.log("caiu no catch de dentro");
    }
  },
};



// [
// 	{
// 	"BAIRRO_ID": "2",
// 	"NOME_BAI": "Tedf2s3te 03",
// 	"CODEMP":"1",
// 	"CNTINSERT": "5",
// 	"CNTUPDATE": "0",
// 	"DATAALTERACAO": "24/00/2022 07:30:14"
// 	},
// 	{
// 	"BAIRRO_ID": "2",
// 	"NOME_BAI": "Tedf2s3te 03",
// 	"CODEMP":"1",
// 	"CNTINSERT": "5",
// 	"CNTUPDATE": "0",
// 	"DATAALTERACAO": "24/00/2022 07:30:14"
// 	},
// 	{
// 	"BAIRRO_ID": "2",
// 	"NOME_BAI": "Tedf2s3te 03",
// 	"CODEMP":"1",
// 	"CNTINSERT": "5",
// 	"CNTUPDATE": "0",
// 	"DATAALTERACAO": "24/00/2022 07:30:14"
// 	}
// ]