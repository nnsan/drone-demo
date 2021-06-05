const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001;
const app = next({
    dev,
    dir: './client',
    quiet: false
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        handle(req, res, parsedUrl).catch(error => {
            console.log(error);
            process.exit(1);
        });
    }).listen(port, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
});
