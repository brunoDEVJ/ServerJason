import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  async createGP(req, res) {
    try {
      const { descricao, margemminima } = req.body;

    let gp = await prisma.grupoproduto.create({
      data: {
        DESCRICAO: descricao,
        MARGEMMINIMA: margemminima
      },
    });
    res.send(gp);
    } catch (error) {
      res.send(error)
    }
    
  },
};
