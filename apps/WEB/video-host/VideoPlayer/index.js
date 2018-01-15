if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { curry } = require('lodash/fp');
const appRoot = require('app-root-path');
const express = require('express');
const app = express();
const S3 = require('aws-sdk').S3;
const downloader = require('s3-download-stream');
const fs = require('fs');
const url = require('url');
const util = require('util');

const auth = {
    apiVersion: process.env.apiVersion,
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
};

const amazonConnection = new S3(auth);

const beginPipingVideo = curry((type, req, res, err, data) => {
    console.log(type, req.headers);
    if (!req.headers.range) {
        return res.end();
    }

    const positions = req.headers.range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const total = data.ContentLength;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    const chunksize = (end - start) + 1;

    const headers = {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": `video/${type}`
    };

    console.log(type, headers);

    res.set(headers);

    const config = {
        client: amazonConnection,
        chunkSize: null,
        params: {
            Key: req.path.replace('/', `SD_MP4/`),
            Bucket: 'videohosttestbucket',
            Range: "bytes " + start + "-" + end,
        },
    };

    console.log('Downloading', config.params);

    const stream = downloader(config)
        .pipe(res);

    stream.on('finish', () => {
        res.end();
        console.log('finish');
    });

    stream.on('close', () => {
        console.log('close');
    });

    stream.on('end', () => {
        res.end();
        console.log('end');
    });

    stream.on('error', err => {
        console.log('error', err);
    });
});

/**
 * Serve mp4 videos
 */
app.get('/*.mp4', (req, res) => amazonConnection.headObject({
    Key: req.path.replace('/', 'SD_MP4/'),
    Bucket: process.env.bucket,
}, beginPipingVideo('mp4', req, res)));

/**
 * Serve webp videos
 */
app.get('/*.webp', (req, res) => amazonConnection.headObject({
    Key: req.path.replace('/', 'thumbnails/'),
    Bucket: process.env.bucket,
}, beginPipingVideo('webp', req, res)));

app.get('/', (req, res) => res.sendFile(`${appRoot}/index.html`));

/**
 * 404 response
 */
app.use((req, res) => res.status(404).send('Not found.'));

/**
 * HTTP server start.
 */
app.listen(process.env.PORT || 9000);