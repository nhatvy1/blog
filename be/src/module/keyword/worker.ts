//worker.js
import * as fs from 'fs'
import { parentPort } from 'worker_threads'
import { workerData } from 'worker_threads'
import puppeteer from 'puppeteer'

const count = workerData

async function run() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(
    'https://vnexpress.net/xuat-khau-nhat-ban-lan-dau-giam-trong-10-thang-4805181.html'
  )

  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const distance = 100
      const interval = setInterval(() => {
        window.scrollBy(0, distance)
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  })

  // Wait for 2 minutes (120000 milliseconds)
  await new Promise((resolve) => setTimeout(resolve, 30000))

  // Scroll back to the top
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      const distance = 100
      const interval = setInterval(() => {
        window.scrollBy(0, -distance)
        if (window.scrollY === 0) {
          clearInterval(interval)
          resolve()
        }
      }, 100)
    })
  })

  await page.close()
}

run()

parentPort.postMessage(`Done`)
