import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import converterData from "../utils/convertData.js";

export default {
  async postPedido(req, res) {
    try {
      const jarray = req.body;
      const nomeTabela = req.params;
      const tabelas = await prisma.$queryRawUnsafe(`
          select * from ${nomeTabela.tabela} C
          where C.CODEMP = -1`);

      const fTabelas = await prisma.$queryRawUnsafe(`
        desc ${nomeTabela.tabela}`);

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
      const nomeTabela = req.params;
      let up = {};
      let feito = true;

      const tabelas = await prisma.$queryRawUnsafe(`
      select * from ${nomeTabela.tabela} C
      where C.CODEMP = -1`);

      const fTabelas = await prisma.$queryRawUnsafe(`
        desc ${nomeTabela.tabela}`);

      let priKey = [];
      let auxPri;

      
        jarray.forEach(async (element) => {
          let campo = Object.keys(element);
          let value = Object.values(element);
          let j;

          for (let contField = 0; contField < campo.length; contField++) {
            j = 0;

            for (let i = 0; i < fTabelas.length; i++) {
              if (fTabelas[i].Field === campo[contField]) break;
              j++;
            }

            if (fTabelas[j].Type === "int") {
              value[contField] = parseInt(value[contField]);
            } else if (campo[contField] === "DATAALTERACAO") {
              value[contField] = converterData(value[contField]);
            }
            if (fTabelas[j].Key === "PRI") {
              auxPri = {
                [fTabelas[j].Field]: value[contField],
              };
              priKey = Object.assign(priKey, auxPri);
            }

            tabelas[campo[contField]] = value[contField];
          }

          try {
            up = await prisma.bairro.updateMany({
              where: {
                ...priKey,
              },
              data: {
                ...tabelas,
              },
            });
            if (up.count === 0) feito = false;
          } catch (error) {
            console.log(error);
            res.json({
              status: 203,
              message: error,
            });
          }
        });

        
      // let d = 0;
      // while (up.count === undefined) {
      //   console.log("fora do timeout")
      //   console.log(up.count)
      //   setTimeout(() => {
      //       console.log("feito");
      //     if (feito) {
      //       res.json({
      //         status: 200,
      //         message: "ok",
      //       });
      //     } else
      //       res.json({
      //         status: 204,
      //         message: feito,
      //       });
      //   }, 5);
      //   d++
      //   if(d>10000)
      //   break;
      //   console.log(d)
      //   console.log(up.count)
      // }

      // if (feito) {
      //   res.json({
      //     status: 200,
      //     message: "ok",
      //   });
      // } else
      //   res.json({
      //     status: 204,
      //     message: feito,
      //   });
    } catch (error) {
      console.log(error);
      res.json({ status: 202, message: error });
    }
  },
};
