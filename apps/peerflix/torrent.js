import fp from 'lodash/fp';
import _ from 'lodash';
import TorrentSearchApi from 'torrent-search-api';

const filter = ['xxx', 'porn'];

const notIncludes = fp.negate(fp.includes);
const searchClient = new TorrentSearchApi();

const enablePublic = fp.compose(
    fp.forEach(p => searchClient.enableProvider(p)),
    fp.filter(n => n === 'ThePirateBay'),
    fp.map(fp.get('name')),
    fp.filter(fp.get('public')),
);

enablePublic(searchClient.getProviders());

const getCategories = fp.compose(
    fp.filter(c => notIncludes(_.lowerCase(c), filter)),
    fp.sortedUniqBy(fp.lowerCase),
    fp.sortBy(fp.lowerCase),
    fp.flatten,
    fp.map(fp.get('categories')),
);

const categories = getCategories(searchClient.getActiveProviders());

const search = async(search, category) => {
    const results = await searchClient.search(decodeURIComponent(search), category);
    return _.uniqBy(
        results,
        'title',
    );
}

const filterMagnets = fp.compose(
    fp.filter('magnet'),
    fp.compact,
);

export default {
    categories,
    search,
    filterMagnets,
}