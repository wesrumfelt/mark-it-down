# mark-it-down
A Typescript library for transforming simple markdown into html

## Test it out
(npm/node required)

To test the library, run the included local testing file:
```console
npm install
npx tsx ./test.ts
```

## Installation
```console
npm install mark-it-down
*** Note: not currently published to npm
```

## API
To translate a string of markdown content, pass to the render method

```javascript
import {render} from 'mark-it-down'
const html = render(mdString)
```
