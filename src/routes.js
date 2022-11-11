import { Router } from "express";
import bairroController from "./syncUp/pedidoController.js";
import conexoesTabelaController from "./syncDown/conexoesTabelaController.js";
import gpcontroller from "./syncDown/gpcontroller.js";
import mapaatualizacoesController from "./syncDown/mapaatualizacoesController.js";
import pedidoController from "./syncUp/pedidoController.js";

const router = Router();

/*MAPA ATUALIZAÇÕES*/
router.get(
  "/sync/insert/mapaatualizacoes/:cntinsert/:codemp",
  mapaatualizacoesController.getTableInsert
);

/*MAPA ATUALIZAÇÕES*/

/*GRUPO PRODUTO*/
router.get(
  "/sync/insert/grupoproduto/:cntinsert/:codemp",
  gpcontroller.getTableInsert
);
router.get(
  "/sync/update/grupoproduto/:cntupdate/:codemp",
  gpcontroller.getTableUpdate
);
/************************************************************** */
router.post("/grupoproduto", gpcontroller.postTable);
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

/*BAIRRO*/
router.post("/sync/insert/bairro", pedidoController.postPedido);
/*BAIRRO*/

export { router };
