import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import converterData from "../utils/convertData.js";

export default {
  async postPedido(req, res) {
    try {
      const jarray = req.body;
      let nomeTabela = req.params["tabela"];
      if (nomeTabela === "MAPAATUALIZACOES") {
        jarray.forEach(async (element) => {
          let sqldelete = `delete from ${element.QUALTABELAATUALIZOU} where ${element.CMD}`;
          await prisma
            .$queryRawUnsafe(sqldelete)
            .then(() => {
              res.json({
                status: 200,
                message: "ok",
              });
            })
            .catch((err) => {
              res.json({ msg: err });
            });
        });
      } else {
        const tabelas = await prisma.$queryRawUnsafe(`
          select * from ${nomeTabela} C
          where C.CODEMP = -1`);

        const fTabelas = await prisma.$queryRawUnsafe(`
        desc ${nomeTabela}`);

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
      }
    } catch (error) {
      res.json({ status: 202, message: error });
    }
  },

  async UpdatePedidos(req, res) {
    const jarray = req.body;
    let maxContObj = jarray.length;
    let nomeTabela = req.params["tabela"];
    if (nomeTabela === "mapaatualizacao") {
      jarray.forEach(async (element) => {
        await prisma
          .$queryRawUnsafe(`delete from ${element.tabela} where ${element.cmd}`)
          .then(() => {
            res.json({
              status: 200,
              message: "ok",
            });
          })
          .catch((err) => {
            res.json({ msg: err });
          });
      });
    } else {
      let lwhere = "";
      let contObj = 0;

      let objTabela = 0;
      let up;
      let lup = true;

      let descTabela;
      let fTabelas;
      let priKey = [];

      descTabela = await prisma.$queryRawUnsafe(`
    desc ${nomeTabela}`);

      fTabelas =
        await prisma.$queryRawUnsafe(`SELECT  k.column_name as campoPriKey
  FROM information_schema.table_constraints t
  JOIN information_schema.key_column_usage k
  USING(constraint_name,table_schema,table_name)
  WHERE t.constraint_type='PRIMARY KEY'
  and t.table_name = '${nomeTabela}'`);

      jarray.forEach((obj) => {
        lwhere = lwhere + "(";
        let auxauxPri = {};
        for (let i = 0; i < fTabelas.length; i++) {
          let auxPri = {};
          let campo = fTabelas[i]["campoPriKey"];
          let valor = obj[campo];
          if (descTabela[i].Type === "int") {
            valor = parseInt(valor);
          }
          lwhere = lwhere + `(${campo}='${valor}')`;
          if (i == fTabelas.length - 1) {
            lwhere = lwhere + ")";
          } else lwhere = lwhere + "and";
          auxPri = { [campo]: valor };
          auxauxPri = Object.assign(auxauxPri, auxPri);
        }
        priKey.push(auxauxPri);
        if (contObj < maxContObj - 1) {
          lwhere = lwhere + "or";
        }
        contObj++;
      });
      await prisma
        .$queryRawUnsafe(`select * from ${nomeTabela} where ${lwhere}`)
        .then(async (tabelas) => {
          jarray.forEach((element) => {
            let campo = Object.keys(element);
            let value = Object.values(element);
            let j;
            for (let contField = 0; contField < campo.length; contField++) {
              j = 0;
              for (let i = 0; i < descTabela.length; i++) {
                if (descTabela[i].Field === campo[contField]) break;
                j++;
              }
              if (descTabela[j].Type === "int") {
                value[contField] = parseInt(value[contField]);
              } else if (campo[contField] === "DATAALTERACAO") {
                value[contField] = converterData(value[contField]);
              }
              tabelas[objTabela][campo[contField]] = value[contField];
            }
            objTabela++;
          });
          for (let i = 0; i < jarray.length; i++) {
            up = await prisma.bairro.updateMany({
              where: priKey[i],
              data: tabelas[i],
            });
            if (up.count === 0) lup = false;
          }
          return lup;
        })
        .then((lup) => {
          if (lup)
            res.json({
              status: 200,
              message: "ok",
            });
          else
            res.json({
              status: 201,
              message: "sem pendencias",
            });
        })
        .catch((err) => {
          res.json("msg:" + err);
        });
    }
  },
};
