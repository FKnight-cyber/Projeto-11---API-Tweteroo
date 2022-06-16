import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const user = [];
let userImage;
let userName;

let tweets = [];

app.post('/sign-up',(req,res)=>{
    const body = req.body;
    userImage = body.avatar;
    userName = body.username

    if(body.username === '' || body.avatar === ''){
        res.status(400).send('Todos os campos são obrigatórios!');
    }
    
    const newUser = {
        username: body.username,
        avatar: body.avatar
    };

    user.push(newUser);

    res.status(201).send('OK');
});

app.post('/tweets',(req,res) => {
    const body = req.body;

    if(body.username === '' || body.tweet === ''){
        res.status(400).send('Todos os campos são obrigatórios!');
    }

    const newTweet = {
        username: userName,
        tweet: body.tweet,
        avatar: userImage
    }

    tweets.push(newTweet);

    res.status(201).send('OK');
});

app.get('/tweets',(req,res)=>{
    const page = parseInt(req.query.page);
    const pageTweets = [...tweets]

    if(page >= 1 && page <= Math.round(tweets.length/10)+1 ){
        res.status(201).send(pageTweets.reverse().splice(0+10*(page-1),10+10*(page-1)));
    }else{
        res.status(400).send("Informe uma página válida!");
    }
});

app.get("/tweets/:USERNAME",(req,res)=>{
    const userName = req.params.USERNAME;

    tweets = tweets.filter(e => e.username === userName);
    tweets = tweets.slice(-10);
    res.status(201).send(tweets);
})

app.listen(5000);