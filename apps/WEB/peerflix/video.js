import _ from 'lodash';
import fp from 'lodash/fp';
import WebTorrent from 'webtorrent';
import Transcoder from 'stream-transcoder';

const getRange = fp.compose(
    fp.split('-'),
    fp.last,
    fp.split('=')
);

export async function video({ magnet }, range) {
    const rangeArray = getRange(range);
    const client = new WebTorrent();
    return new Promise((resolve, reject) => {
        client.add(magnet, function(torrent) {
            torrent.on('warning', warning => console.warn('Warning', warning.message));
            torrent.on('error', err => {
                console.error(err);
                torrent.destroy(() => console.log('torrent destroyed'));
            });
            
            let file;
            
            torrent.files.forEach(fileMeta => {
                if (!file && fileMeta.name.endsWith('.mkv')) {
                    file = fileMeta;
                } else {
                    fileMeta.deselect();
                }
            });

            if (file) {
                const options = {
                    start: Number(rangeArray[0]),
                    end: Number(rangeArray[1]) || Number(file.length) - 1,
                    autoClose: true,
                };
                console.log(options, rangeArray, file.length);
                const stream = file.createReadStream();
                const transcoded = new Transcoder(stream)
                    .maxSize(320, 240)
            	    .videoCodec('h264')
            	    .videoBitrate(800 * 1000)
            	    .fps(25)
            	    .audioCodec('aac')
            	    .sampleRate(44100)
            	    .channels(2)
            	    .audioBitrate(128 * 1000)
            	    .format('mp4')
            	    .on('finish', function() {
            	    	console.log('finished');
            	    })
            	    .stream();
                
                return resolve({
                    stream: transcoded,
                    length: (options.end - options.start) + 1,
                    range: "bytes " + options.start + "-" + options.end + "/" + file.length,
                    onClose: torrent.destroy.bind(torrent),
                });
            }

            return reject('No file found!');
        });

        client.on('error', function(err) {
            console.error('Client error', err);
            reject(err);
        })
    });
}

export default video;