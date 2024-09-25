const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async(req, res) => {
    const contacts = await prisma.contact.findMany()
    res.render('form',{contacts});
});

app.post('/submit', async (req, res) => {
    const { name, email, password, message } = req.body;
    const contact = await prisma.contact.create({
        data: { name, email, password, message },
    });
    res.send('اطلاعات با موفقیت ذخیره شد!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`سرور روی پورت ${PORT} در حال اجراست`);
});
