const ArticleDao = require('../dao/ArticleDao');
const axios = require('axios');
const cheerio = require('cheerio')

let articleDao = new ArticleDao();

class ArticleService {
  async spider() {
    try {
      let url = 'https://lijiayuan.top/';
      let response = await axios.get(url)
      let html = response.data.toString();
      const $ = cheerio.load(html)
      let data = [];
      let arr = $('.post-title')
      let arr1 = $('.post-meta [itemprop="name"]')
      let arr2 = $('.post-meta  [itemprop="dateCreated datePublished"]')
      let arr3 = $('.post-meta [title="阅读时长"]')
      arr.map((i,el) => {
        console.log(el.text())
      })
      // for(let i=0;i<arr.length;i++) {
      //   data.push({
      //     title:arr[i].text(),
      //     tag:arr1[i].text(),
      //     date:arr2[i].text(),
      //     time:arr3[i].text()
      //   })
      // }
      console.log(data)
    } catch (error) {
      console.log(`spider error --------->${error}`)
    }
  } 
}
module.exports = ArticleService;