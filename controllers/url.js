const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {

    const body = req.body;
    if(!body?.url) return res.status(400).json({error: "url is required"})

    const shortId = shortid.generate();
    console.log("shortId", shortId)

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({id: shortId})
}

async function redirectToOriginalWebsite(req, res) {
    const shortId = req.params.shortId;

    

 const entry =  await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }})

    res.redirect(entry.redirectURL);

}

async function analyticsToUrl(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({shortId});

    res.json({
        totalClicks: result.visitHistory.length,
        visitHistory: result.visitHistory
    })
}

module.exports = {handleGenerateNewShortUrl, redirectToOriginalWebsite, analyticsToUrl};