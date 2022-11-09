import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async getListInsert(req, res) {
    try {
      const { terminal, codemp } = req.params;

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

  async clearSyncInsert(req, res) {
    try {
      const { table,cntinsert, terminal, codemp } = req.params;




      await prisma.$queryRaw`
      update conexoestabela
      set TERMINALINSERT = (TERMINALINSERT | ${terminal})
      where NOMETABELA = ${table}
      and CODEMP = ${codemp}
      and BANCOINSERT = ${cntinsert}`;

      res.send({ status: 201, msg: "Ok" });
    } catch (error) {
      console.log(error);
    }
  },
  async clearSyncUpdate(req, res) {
    try {
      const { table,cntupdate, terminal, codemp } = req.params;

      await prisma.$queryRaw`
      update conexoestabela
      set TERMINALUPDATE = (TERMINALUPDATE | ${terminal})
      where NOMETABELA = ${table}
      and CODEMP = ${codemp}
      and BANCOUPDATE = ${cntupdate}`;

      res.send({ status: 201, msg: "Ok" });
    } catch (error) {
      console.log(error);
    }
  },

  async getListUpdate(req, res) {
    try {
      const { terminal, codemp } = req.params;

      const cxtb = await prisma.$queryRaw`
    SELECT NOMETABELA, BANCOUPDATE
    from conexoestabela
    where CODEMP = ${codemp}
    and (TERMINALUPDATE & ${terminal} ) = 0`;
      res.send(cxtb);
    } catch (error) {
      console.log(error);
    }
  },
};
