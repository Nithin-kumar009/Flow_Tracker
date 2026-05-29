const router = require("express").Router();
const { getWeeklyReport, getMonthlyReport, getAnalytics } = require("../controllers/reportController");

router.get("/weekly",    getWeeklyReport);
router.get("/monthly",   getMonthlyReport);
router.get("/analytics", getAnalytics);

module.exports = router;