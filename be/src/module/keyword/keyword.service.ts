import { Injectable } from '@nestjs/common'

@Injectable()
export class KeywordService {
  // constructor(private readonly puppeteerService: PuppeteerService) {}

  // async smoothScrollWithTimeout(page: Page, duration: number) {
  //   await page.evaluate(async () => {
  //     const totalScrollHeight = document.body.scrollHeight
  //     const scrollStep = totalScrollHeight / (10 * 60) // Chia đều cho 10 giây
  //     const scrollInterval = 16 // Mỗi bước cuộn trong khoảng 16ms (60fps)

  //     for (let i = 0; i < 10 * 60; i++) {
  //       window.scrollBy(0, scrollStep)
  //       await new Promise((resolve) => setTimeout(resolve, scrollInterval))
  //     }
  //   })

  //   // Đóng trình duyệt sau khi hoàn thành
  //   await page.close()
  // }

  // async openPage() {
  //   const browser = this.puppeteerService.getBrowser()
  //   const page = await browser.newPage()
  //   await page.setViewport({
  //     width: 800,
  //     height: 1000
  //   })
  //   await page.goto('https://www.freecodecamp.org/news/')

  //   await this.smoothScrollWithTimeout(page, 20000)

  //   // Perform operations with Puppeteer
  //   await page.screenshot({ path: 'youtube.png' })

  //   await page.close()
  //   return 1
  // }

  // async addKeyword() {
  //   const worker = new Worker(join(__dirname, 'worker.js'), {
  //     workerData: 1000000
  //   })
  //   worker.on('message', (msg) => {
  //     return msg
  //   })
  //   worker.on('error', (err) => console.error(err))
  // }

  async openPage() {
    return 1
  }
}
