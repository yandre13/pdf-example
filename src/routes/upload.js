const puppeteer = require('puppeteer')

const printPDF = async ({ htmlContent, opts = {} }) => {
	// launch a new chrome instance
	const browser = await puppeteer.launch({
		headless: true,
	})
	// create a new page
	const page = await browser.newPage()

	// 2. Create PDF from static HTML
	await page.setContent(htmlContent)
	const pdfBuffer = await page.pdf({ ...opts })

	await browser.close()
	return pdfBuffer
}

const postMakePDF = async(req, res) =>{
  console.log('postMakePDF')
  const { body: { htmlContent, opts } } = req.body //from axios
  console.log(req.body)
  const pdfBuffer = await printPDF({ htmlContent, opts })
  res.setHeader('Content-Type', 'application/pdf')
  const b64 = pdfBuffer.toString('base64')
  console.log({ b64 })
  return res.send(b64)
}

module.exports = { postMakePDF }
