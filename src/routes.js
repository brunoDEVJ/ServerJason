import { Router } from "express";
import gpcontroller from "./controllers/gpcontroller.js";

const router = Router();

router.get("/sync/insert/list/:terminal/:codemp", gpcontroller.getList)
router.get("/sync/insert/table/:table/:cntinsert/:codemp",gpcontroller.getTable)
// router.get("/sync/insert/clearsync/:table/:terminal/:codemp",gpcontroller.createGP)



// router.get("/sync/update/list/:terminal/:codemp",gpcontroller.createGP)
// router.get("/sync/update/table/:table/:cntupdate/:codemp",gpcontroller.createGP)
// router.get("/sync/update/clearsync/:table/:terminal/:codemp",gpcontroller.createGP)


export { router };
