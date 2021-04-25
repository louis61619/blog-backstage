import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

function checkURL(URL) {
  var str = URL;
  var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  var objExp = new RegExp(Expression);
  if (objExp.test(str) === true) {
    return true;
  } else {
    return false;
  }
}
const renderer = new marked.Renderer();

renderer.image = function (src, title, alt) {
  const newSrc = checkURL(src)? src : process.env.REACT_APP_STATIC_URL + src;
  return `<img src="${newSrc}" />`;
};

marked.setOptions({
  renderer: renderer,
});

marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  },
});

export default marked;
