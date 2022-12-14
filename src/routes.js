import { Router } from "express";

import conexoesTabelaController from "./syncDown/conexoesTabelaController.js";
import gpcontroller from "./syncDown/gpcontroller.js";
import mapaatualizacoesController from "./syncDown/mapaatualizacoesController.js";
// import pedidoController from "./syncUp/pedidoController.js";
import pedidoControllers from "./syncUp/pedidoControllerteste.js";

const router = Router();

/*MAPA ATUALIZAÇÕES*/
router.get(
  "/sync/insert/mapaatualizacoes/:cntinsert/:codemp",
  mapaatualizacoesController.getTableInsert
);

/*MAPA ATUALIZAÇÕES*/

/*GRUPO PRODUTO*/
router.get(
  "/sync/insert/gruposprod/:cntinsert/:codemp",
  gpcontroller.getTableInsert
);
router.get(
  "/sync/update/gruposprod/:cntupdate/:codemp",
  gpcontroller.getTableUpdate
);
/************************************************************** */
router.post("/gruposprod", gpcontroller.postTable);
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
router.post("/sync/insert/:tabela", pedidoControllers.postPedido);
// router.put("/sync/update/:tabela", pedidoController.UpdatePedido);
router.put("/sync/update/:tabela", pedidoControllers.UpdatePedidos);
/*BAIRRO*/

export { router };
