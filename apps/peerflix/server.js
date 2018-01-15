import 'babel-polyfill';
import _ from 'lodash';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import torrent from './torrent';
import video from './video';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get('/categories', (req, res) => res.json(torrent.categories))

app.get('/search', async(req, res) => {
    const {
        keyword,
        topic,
    } = req.query;
    try {
        const results = await torrent.search(keyword, topic);
        res.json(torrent.filterMagnets(results));
    } catch (e) {
        console.log(e);
        res.json({});
    }
    // https://torrent.glitch.me/search?keyword=ricky%20and%20morty&topic=TV
});

function close(results) {
    return () => {
        try {
            console.log('Destroying torrent.');
            results.onClose();
            results.stream.destroy();
        } catch (e) {
            console.error(`Error caught while closing ${e.message}`);
        }
    }
}

app.get('/play', async(req, res) => {
    const {
        torrent,
    } = req.query;
    try {
        const magnet = JSON.parse(decodeURIComponent(torrent));
        const results = await video(magnet, req.headers.range);
        
        const headers = {
            'Accept-Ranges': 'bytes',
            'Content-Type': 'video/mp4',
            'Content-Length': results.length,
            'Content-Range': results.range,
        };
        
        res.writeHead(206, headers);
        
        if (req.method === 'HEAD') return res.end()
        
        results.stream.pipe(res);
        results.stream.on("error", err => res.end(err));
    } catch (e) {
        console.error(e);
        return res.send('Unable to play video!');
    }
});

app.get('/', (req, res) => res.sendFile(path.resolve('./views/index.html')));

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});