import { render } from './src';
const md = "# Header one\n" +
    "\n" +
    "Hello there\n" +
    "\n" +
    "How are you?\n" +
    "What's going on?\n" +
    "\n" +
    "## Another Header\n" +
    "\n" +
    "This is a paragraph [with an inline link](http://google.com). Neat, eh?\n" +
    "\n" +
    "## This is a header [with a link](http://yahoo.com)"
console.log(render(md))