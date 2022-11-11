import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async getTableInsert(req, res) {
    try {
      let { cntinsert, codemp } = req.params;

      const tb = await prisma.$queryRaw`
        select * from  mapaatualizacoes
        where cntinsert > ${cntinsert}
        and codemp = ${codemp}`;
      if (tb.length > 0) res.send(tb);
      else {
        res.json({ status: 201, message: "sem pendencias" });
      }
    } catch (error) {
      res.json({ status: 202, message: "erro" });
    }
  },
};
