import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import converterData from "../utils/convertData.js";

export default {
  async postPedido(req, res) {
    try {
      const jarray = req.body;

      const tabelas = await prisma.$queryRaw`
          select * from bairro
          where bairro.BAIRRO_ID = -1`;

      const fTabelas = await prisma.$queryRaw`
        desc bairro`;

      jarray.forEach(async (element) => {
        let campo = Object.keys(element);
        let value = Object.values(element);
        let j;

        for (let contField = 0; contField < campo.length; contField++) {
          j = 0;
          for (let i = 0; i < fTabelas.length; i++) {
            if (fTabelas[i].Field === campo[contField]) {
              break;
            }
            j++;
          }

          if (campo[contField] === "DATAALTERACAO") {
            value[contField] = converterData(value[contField]);
          } else if (fTabelas[j].Type === "int") {
            value[contField] = parseInt(value[contField]);
          }
          tabelas[campo[contField]] = value[contField];
        }
        try {
          await prisma.bairro.create({
            data: {
              ...tabelas,
            },
          });

          res.json({
            status: 200,
            message: "ok",
          });
        } catch (error) {
          res.json({
            status: 250,
            message: error,
          });
        }
      });
    } catch (error) {
      res.json({ status: 202, message: error });
    }
  },

  async UpdatePedido(req, res) {
    try {
      const jarray = req.body;

      const tabelas = await prisma.$queryRaw`
          select * from bairro
          where bairro.BAIRRO_ID = -1`;

      const fTabelas = await prisma.$queryRaw`
        desc bairro`;

      jarray.forEach(async (element) => {
        let campo = Object.keys(element);
        let value = Object.values(element);
        let j;

        for (let contField = 0; contField < campo.length; contField++) {
          j = 0;
          for (let i = 0; i < fTabelas.length; i++) {
            if (fTabelas[i].Field === campo[contField]) {
              break;
            }
            j++;
          }

          if (campo[contField] === "DATAALTERACAO") {
            value[contField] = converterData(value[contField]);
          } else if (fTabelas[j].Type === "int") {
            value[contField] = parseInt(value[contField]);
          }
          tabelas[campo[contField]] = value[contField];
        }

        try {
          await prisma.bairro.updateMany({
            where: {
              BAIRRO_ID: tabelas.BAIRRO_ID,
              NOME_BAI: tabelas.NOME_BAI
            },
            data: {
              ...tabelas,
            }
          });

          res.json({
            status: 200,
            message: "ok",
          });
        } catch (error) {
          console.log(error)
          res.json({
            status: 203,
            message: error,
          });
        }
      });
    } catch (error) {
      res.json({ status: 202, message: error });
    }
  },
};

