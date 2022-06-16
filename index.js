import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const user = [];
let userImage;

let tweets = [];

app.post('/sign-up',(req,res)=>{
    const body = req.body;
    userImage = body.avatar;

    if(body.username === '' || body.avatar === ''){
        res.status(400).send('Todos os campos são obrigatórios!');
    }
    
    const newUser = {
        username: body.username,
        avatar: body.avatar
    };

    user.push(newUser);

    res.send('OK');
});

app.post('/tweets',(req,res) => {
    const body = req.body;

    if(body.username === '' || body.tweet === ''){
        res.status(400).send('Todos os campos são obrigatórios!');
    }

    const newTweet = {
        username: body.username,
        tweet: body.tweet,
        avatar: userImage
    }

    tweets.push(newTweet);

    res.send('OK');
});

app.get('/tweets',(req,res)=>{
    tweets = tweets.slice(-10);
    res.send(tweets);
})

app.listen(5000);