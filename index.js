import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const user = [];
let userImage;

let tweets = [
	{
	    username: "bobesponja",
		avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
	    tweet: "eu amo o hub"
	}
];

app.post('/sign-up',(req,res)=>{
    const body = req.body;
    userImage = body.avatar;
    
    const newUser = {
        username: body.username,
        avatar: body.avatar
    };

    user.push(newUser);

    res.send('OK');
});

app.post('/tweets',(req,res) => {
    const body = req.body;

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