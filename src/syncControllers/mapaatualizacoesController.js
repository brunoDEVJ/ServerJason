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
      res.send(tb);
      
    } catch (error) {
      console.log(error);
    }
  },
}