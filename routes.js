const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello</title></head>');
        res.write('<ul>')
        res.write('<li>User 1</li>')
        res.write('<li>User 2</li>')
        res.write('<li>User 3</li>')
        res.write('</ul>')
        res.write(
            `<body>
                <form action="/create-user" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>`
        );
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Hello</title></head>');
        res.write('</html>')
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody.split('=')[1]);
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';