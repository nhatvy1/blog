import { registerAs } from "@nestjs/config";

export default registerAs('puppeteer', ()=> ({
  headless: true, 
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}))