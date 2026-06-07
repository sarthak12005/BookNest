const express = require('express');
const router = express.Router();

router.post('/create-order', createRazorpayOrder);
router.post('/verify-payment', verifyPayment);
router.post('/webhook', express.raw({ type: 'application/json' }), razorpayWebhook);

module.exports = router;
