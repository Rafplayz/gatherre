# gatherre

probably gonna host this later

compile steps:
- step 1. 
install [npm](https://www.npmjs.com/package/npm)<br>
open command prompt and paste `npm i -g typescript`<br>
- step 2. clone repository<br>
- step 3. run `tsc` from command prompt in your local folder<br>
- step 4. if you see an "install types" error go ahead and install them. atm the types used include:
`npm i @types/jquery`
`npm i @types/sizzle`
compiled javascript will go into the `compiled-js` directory. then you can just host the index.html file on your server or just open it directly.

plus install `jquery types` so that tsc doesn't shit itself when trying to compile
