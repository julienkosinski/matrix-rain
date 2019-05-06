# My resume in Matrix style
I tried to make an original website talking about me and answering to a motivation request to a french start-up job opening.
Currently it's only in french but I might add english and improve things a lot.

## Credit
This version of my resume is based on the hard work of [Timothy Tsui](https://github.com/timiscoding). You can find his work [here](https://github.com/timiscoding/matrix-rain)!
Many thanks to him, he makes me learn a lot! :)

## Deployment
[On Heroku](https://julien-kosinski-matrix.herokuapp.com/)

### Development build
To build it locally, run

```
npm i
npm start
```

then open `http://localhost:3000/` in the browser.

Note: There are performance issues in dev build because of the unminified p5 lib. This can be alleviated by using the minified version at the cost of less meaningful debugging messages. See [P5Wrapper.js](https://github.com/timiscoding/matrix-rain/blob/master/src/components/P5Wrapper.js)

###  Production build

```
npm i
npm run build
npm run serve
```

then navigate to the link provided.
