const puppeteer = require('puppeteer');
const fs = require("fs");
// puppeteer.defaultArgs({
//     headless:false
// })
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://zengpintang.net');
// //   console.log("hello");
// //   await page.screenshot({path: 'example.png'});
//   await browser.close();
// })();
puppeteer.launch({
    headless: true
}).then(async browser => {

    const page = await browser.newPage();
    
    const DOMAIN = 'http://zengpintang.net';
    await page.goto(DOMAIN);
    await page.waitForSelector("#nav112 a");
    const linkQy = await page.$eval("#nav112 a", node => node.href);
    const linkJw = await page.$eval("#nav116 a", node => node.href);
    const linkArr = [linkJw, linkQy]
    // console.log(linkJw);
    // 爬取图片
    // // await page.waitForSelector(".J_photoImgPanel .J_photoImg");
    // let jp = await page.$$eval(".J_photoImgPanel .J_photoImg",nodes=>nodes.map(n=>n.src))
    // // let jp = await page.$$eval("#nav112 ",nodes=>nodes.map(n=>n.src))
    // // console.log(jp);
    // await fs.writeFile("produceImage.json",JSON.stringify(jp),async err =>{
    //     if(err) throw err;
    //     console.log("爬取的文件已经保留");

    // 企业动态
    if(true){
        let resultArr = [];
        const page2 = await browser.newPage();
        await page2.goto(linkJw);
    
        let title = await page2.$$eval(".fk-newsListTitle",nodes=>nodes.map(n=>n.innerHTML));
        let date = await page2.$$eval(".fk-newsListDate",nodes=>nodes.map(n=>n.innerHTML));
        let content = await page2.$$eval(".pic-mixNewsStyleSummary.fk-newsListSummary",nodes=>nodes.map(n=>n.innerText));
        for(let i = 0;i<title.length;i++){
            let obj = {};
            obj.title = title[i];
            obj.date = date[i];
            obj.content = content[i].trim();
            resultArr.push(obj)
        }
        await fs.writeFile("qydt.json",JSON.stringify(resultArr),async err =>{
            if(err) throw err;
            console.log("爬取的企业动态数据已经保留");
        })
    }

    //页面内部跳转的方式 （这种方式目前存在一定的问题）
    // const eleH = await page.$("#nav112");
    // // console.log(eleH)
    // await eleH.click();

    // let resultArr = [];
    // let title = await page.$$eval(".fk-newsListTitle",nodes=>nodes.map(n=>n.innerHTML));
    // let date = await page.$$eval(".fk-newsListDate",nodes=>nodes.map(n=>n.innerHTML));
    // let content = await page.$$eval(".pic-mixNewsStyleSummary.fk-newsListSummary",nodes=>nodes.map(n=>n.innerText));
    // for(let i = 0;i<title.length;i++){
    //     let obj = {};
    //     obj.title = title[i];
    //     obj.date = date[i];
    //     obj.content = content[i].trim();
    //     resultArr.push(obj)
    // }

    // 酒文化
    if(true){
        let resultArr1 = [];
        const page3 = await browser.newPage();
        await page3.goto(linkQy);
    
        let title1 = await page3.$$eval(".fk-newsListTitle",nodes=>nodes.map(n=>n.innerHTML));
        let date1 = await page3.$$eval(".fk-newsListDate",nodes=>nodes.map(n=>n.innerHTML));
        let content1 = await page3.$$eval(".pic-mixNewsStyleSummary.fk-newsListSummary",nodes=>nodes.map(n=>n.innerText));
        for(let i = 0;i<title1.length;i++){
            let obj = {};
            obj.title = title1[i];
            obj.date = date1[i];
            obj.content = content1[i].trim();
            resultArr1.push(obj)
        }
        await fs.writeFile("jwh.json",JSON.stringify(resultArr1),async err =>{
            if(err) throw err;
            console.log("爬取的酒文化数据已经保留");
        })
    }
    // console.log(resultArr)
    await browser.close();
});