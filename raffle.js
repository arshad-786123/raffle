"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
require('../../config/passport');
const passport_1 = __importDefault(require("passport"));
const categories_1 = require("../controller/categories");
const listRaffles_1 = require("../controller/raffle/listRaffles");
const getRaffle_1 = require("../controller/owner/getRaffle");
const getSoldOutRaffle_1 = require("../controller/owner/getSoldOutRaffle");
const Categories_1 = require("../controller/categories/Categories");
const requireAuth = passport_1.default.authenticate('jwt', {
    session: false
});
router.get('/categories', categories_1.Categories);
router.post('/categories', Categories_1.createCategories);
router.put('/categories/:id', Categories_1.updateCategories);
router.delete('/categories/:id', Categories_1.deleteCategories);
// router.get('/categories', requireAuth, Categories)
// router.post('/categories', requireAuth, createCategories)
// router.put('/categories/:id', requireAuth, updateCategories)
// router.delete('/categories/:id', requireAuth, deleteCategories)
router.get('/raffles', listRaffles_1.ListRaffles);
router.get('/raffles/raffles-by-type/:type', listRaffles_1.ListRafflesByType);
router.get('/categories_wise_raffles/:category', listRaffles_1.CategoriesWiseRaffles);
router.get('/specific_raffle/:id', getRaffle_1.GetRaffleForNonAuth);
router.post('/specific_raffle/update', getRaffle_1.updateRaffleDataWithCoupon);
router.get('/sold_raffle_tickets/:id', getSoldOutRaffle_1.getSoldOutRaffle);
router.get('/order_listing', getRaffle_1.getOrderListing);
router.get('/order/:id', getRaffle_1.getOrderById);
router.get('/ending_soon', getRaffle_1.getRaffleOfEndingSoon);
router.get('/expired-raffles', getRaffle_1.getExpiredRaffles);
router.get('/sales-commission', getRaffle_1.getTotalSalesAndCommission);
router.post("/send-mail", getRaffle_1.sendMail);
exports.default = router;
