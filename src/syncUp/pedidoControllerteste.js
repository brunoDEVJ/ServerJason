import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import converterData from "../utils/convertData.js";

export default {
  async UpdatePedidos(req, res) {
    const jarray = req.body;
    let nomeTabela = req.params["tabela"];
    let lwhere = "";
    let contObj = 0;
    let maxContObj = jarray.length;
    let objTabela = 0;
    let up;
    let lup = true;
    let descTabela = await prisma.$queryRawUnsafe(`
    desc ${nomeTabela}`);
    let fTabelas =
      await prisma.$queryRawUnsafe(`SELECT  k.column_name as campoPriKey
    FROM information_schema.table_constraints t
    JOIN information_schema.key_column_usage k
    USING(constraint_name,table_schema,table_name)
    WHERE t.constraint_type='PRIMARY KEY'
    and t.table_name = '${nomeTabela}'`);
    let priKey = [];
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
        if (lup) res.json({
          status: 200,
          message: "ok",
        });
        else res.json({
          status: 201,
          message: "sem pendencias",
        });
      })
      .catch((err) => {
        console.log(err);
        res.send("msg:" + err);
      });
  },
};
