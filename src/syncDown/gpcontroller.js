import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async getTableInsert(req, res) {
    try {
      let { cntinsert, codemp } = req.params;

      const tb = await prisma.$queryRaw`
        select * from  grupoproduto
        where cntinsert > ${cntinsert}
        and codemp = ${codemp}`;
      if (tb.length > 0) res.send(tb);
      else {
        res.json({ status: 201, message: "sem pendencias" });
      }
    } catch (error) {
      console.log(error)
      res.json({ status: 202, message: "erro" });
    }
  },

  async getTableUpdate(req, res) {
    try {
      let { cntupdate, codemp } = req.params;

      const tb = await prisma.$queryRaw`
        select * from  grupoproduto
        where cntupdate > ${cntupdate}
        and codemp = ${codemp}`;
      if (tb.length > 0) res.send(tb);
      else {
        res.json({ status: 201, message: "sem pendencias" });
      }
    } catch (error) {
      res.json({ status: 202, message: "erro" });
    }
  },


  /*********************************************************/
  async postTable(req, res) {
    try {
      let { DESCRICAO, CODEMP } = req.body;

      let cGrupoProduto = await prisma.grupoproduto.create({
        data: {
          DESCRICAO,
          CODEMP,
        },
      });

      res.send(cGrupoProduto);
    } catch (error) {
      console.log(error);
    }
  },
};
