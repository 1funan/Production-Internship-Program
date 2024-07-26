const markdownIt = require('markdown-it')();
const strMark = '# Hello, markdown-it! \n ## you'
const md = markdownIt.render(strMark);
console.log(md);