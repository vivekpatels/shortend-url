const express = require('express');
const { handleGenerateNewShortUrl, redirectToOriginalWebsite, analyticsToUrl } = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', redirectToOriginalWebsite);
router.get('/analytics/:shortId', analyticsToUrl)

module.exports = router;