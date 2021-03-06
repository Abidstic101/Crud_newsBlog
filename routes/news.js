const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news");
const checkAuthJwt = require("../middleWare/auth_jwt");
const checkAuthUploader = require("../middleWare/auth_uploder");

router.get("/", newsController.getAllNews);
router.get("/:newsID", newsController.getNewsById);
router.get("/owner/:newsUploader", checkAuthJwt, newsController.getNewsByUser);
router.post("/", checkAuthJwt, newsController.addNews);
router.patch(
    "/:news",
    checkAuthJwt,
    checkAuthUploader,
    newsController.EditNews
);
router.delete(
    "/:news",
    checkAuthJwt,
    checkAuthUploader,
    newsController.deletenews
);

module.exports = router;
