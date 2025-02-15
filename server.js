const express = require('express');
const app = express();
const port = 3000;

let rooms = {};

app.use(express.static('public'));

app.post('/create-room', (req, res) => {
    // 房间创建和管理逻辑
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
