const http = require('http'); //http Module
const fs = require('fs'); //File System Module
const PORT = 3006; //Port

// Create Server
const server = http.createServer((req, res) => {

    let log = `${Math.floor(Math.random() * 100)} : New Request...\n `;
    console.log(log);

    fs.appendFile('index1.txt', log, (err, data) => {
        if (!err) {
            console.log("Append File");
        }

    })


    if (req.url === '/') {
        const log = `${req.url} : Default Request \n`;

        fs.readFile('index.html', 'utf-8', (err, data) => {
            fs.appendFile('index1.txt', log, (err) => {
                if (!err) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                }
            })
        })
    } else if (req.url === '/about') {
        const log = `${req.url} : About Request \n`;

        fs.appendFile('index1.txt', log, (err, data) => {
            if (!err) {
                console.log(`${req.url} : About Request`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<h2>Welcome to <mark>About Page</mark></h2>`);
            }
        })
    } else {
        const log = `${req.url} : Unknown Request \n`;

        fs.appendFile('index1.txt', log, (err, data) => {
            if (!err) {
                console.log(`${log} : Unknown Request`);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end(`<h1><mark>404</mark> : Page Not Found</h1>`);
            }
        })
    }
});




server.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server Start Now ${PORT}`);
    }
});
 