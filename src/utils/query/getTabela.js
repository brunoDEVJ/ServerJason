import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTabela (nomeTabela) {
  let fTabelas = await prisma.$queryRawUnsafe(`SELECT  k.column_name as campoPriKey
    FROM information_schema.table_constraints t
    JOIN information_schema.key_column_usage k
    USING(constraint_name,table_schema,table_name)
    WHERE t.constraint_type='PRIMARY KEY'
    and t.table_name = '${nomeTabela}'`)
    return fTabelas
}

export {getTabela}