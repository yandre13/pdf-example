const router = require('express').Router(),
	{ postMakePDF } = require('./upload')

router.post('/makepdf', postMakePDF)
// router.post('/test', postTest)

module.exports = router
