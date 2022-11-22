import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import converterData from "../utils/convertData.js";

export default {
  async UpdatePedidos(req, res) {
    const jarray = req.body;
    const nomeTabela = req.params;
    let priCampo = [];
    let priValue = [];
    // let objPriKey = {};

    const fTabelas = await prisma.$queryRawUnsafe(`
        desc ${nomeTabela.tabela}`);

    jarray.forEach((element) => {
      let campo = Object.keys(element);
      let value = Object.values(element);
      let j;

      for (let contField = 0; contField < campo.length; contField++) {
        j = 0;

        for (let i = 0; i < fTabelas.length; i++) {
          if (fTabelas[i].Field === campo[contField]) break;
          j++;
        }

        if (fTabelas[j].Key === "PRI") {
          priCampo[contField] = fTabelas[j].Field;
          // priValue.push(value[contField]);
          priValue[contField] = [value[j]];
        }
      }
    });
    // 
    

    // let testarr = ["BAIRRO_ID","NOME_BAI"]
    // let value = [1, 2];
    // let capus = ["GERAL", "teste 02"];
    // let testa = {
    //   BAIRRO_ID: { in: value },
    //   NOME_BAI: { in: capus },
    // };

    // console.log(testar[0].BAIRRO_ID)
    let queryFind = `
    select * from ${nomeTabela.tabela} c
    where c.bairro_id in (1,2)
    and c.nome_bai in ('GERAL', 'teste 02')
    `
    const tabelas = await prisma.$queryRawUnsafe(queryFind)
    console.log(tabelas)

    jarray.forEach((element) => {
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
      }
    });

    up = prisma.bairro
      .updateMany({
        where: {
          // BAIRRO_ID: data[i].BAIRRO_ID,
          // NOME_BAI: data[i].NOME_BAI,
        },
        // data: data[i],
      })
      .then((data) => {
        res.send("final");
      });
    //   data[0].CNTINSERT = 10;
    //   data[1].CNTINSERT = 15;
    //   return data;
    // })
    // .then((data) => {
    //   let up;
    //   let lup = true;

    //   for (let i = 0; i < 2; i++) {
    //     up = prisma.bairro.updateMany({
    //       where: {
    //         BAIRRO_ID: data[i].BAIRRO_ID,
    //         NOME_BAI: data[i].NOME_BAI,
    //       },
    //       data: data[i],
    //     });
    //     if (up.count === 0) lup = false;
    //   }
    //   return lup;
    // })
    // .then((data) => {
    //   console.log(data);
    //   if (data) res.send("alterações concluidas");
    //   else res.send("n");
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.send("msg:" + err);
    // });
  },
};
