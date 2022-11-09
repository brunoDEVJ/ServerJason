import { Router } from "express";
import conexoesTabelaController from "./controllers/conexoesTabelaController.js";
import gpcontroller from "./controllers/gpcontroller.js";

const router = Router();
/*GRUPO PRODUTO*/
router.get(
  "/sync/insert/grupoproduto/:cntinsert/:codemp",
  gpcontroller.getTableInsert
);
router.get(
  "/sync/update/grupoproduto/:cntupdate/:codemp",
  gpcontroller.getTableUpdate
);
router.post("/grupoproduto", gpcontroller.postTable)
/*GRUPO PRODUTO*/

/*CONEXÕES TABELA*/
router.get(
  "/sync/insert/list/:terminal/:codemp",
  conexoesTabelaController.getListInsert
);
router.get(
  "/sync/insert/cleansync/:table/:cntinsert/:terminal/:codemp",
  conexoesTabelaController.clearSyncInsert
);
router.get(
  "/sync/update/list/:terminal/:codemp",
  conexoesTabelaController.getListUpdate
);
router.get(
  "/sync/update/cleansync/:table/:cntupdate/:terminal/:codemp",
  conexoesTabelaController.clearSyncUpdate
);
/*CONEXÕES TABELA*/

export { router };
