const Koa = require('koa');
const fs = require('fs');
const puppeteer = require('puppeteer');
const app = new Koa();
const baseUrl = 'http://kaburda.cn';//这里是真实SPA页面的地址
app.use(async (ctx,next)=>{
  let browser = await puppeteer.launch({dumpio:true,args: ['--no-sandbox', '--disable-setuid-sandbox'],timeout: 10000});
   const page = await browser.newPage();
   try {
     let myUrl = baseUrl+ctx.url;
     console.log(myUrl);
     await page.goto(myUrl); //到指定页面的网址.
     await page.waitFor(5000);
   } catch (err) {
     
     await page.close();
     await browser.disconnect();
     console.log('出现错误：'+err); // 这里捕捉到错误 `error`
   }
   let html = await page.content()
  
  /*fs.writeFile("myhtml22.html",html,function (err) {
    
    if (err){
      console.log('文件写入出错'+err);
      throw err ; 
    } 
    
    console.log("myhtml.html成功"); //文件被保存
​
  }) */
  ctx.type = "text/html;charset=utf-8";
  ctx.body =html;
  await page.close();
  await browser.close();
});
app.listen('9088');
console.log('9088端口爬虫代理程序已启动');

