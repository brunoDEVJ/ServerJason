import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
 
  async getList(req, res) {
    try {
      const {terminal, codemp} = req.params

      const cxtb = await prisma.$queryRaw`
      SELECT NOMETABELA, BANCOINSERT
      from conexoestabela
      where CODEMP = ${codemp}
      and (TERMINALINSERT & ${terminal} ) = 0`;

      res.send(cxtb);
    } catch (error) {
      console.log(error);
    }
  },

async getTable(req, res) {
  try {

    let {table,cntinsert,codemp} = req.params
    let a = table.toLowerCase()

    const tb = await prisma.$queryRaw`
    select * from  ${a}
    where cntinsert > ${cntinsert}
    and codemp = ${codemp}`
    
    res.send(console.log(tb))

  } catch (error) {
    console.log(error);
  }
}
};

