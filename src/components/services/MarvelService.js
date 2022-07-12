import {useHttp} from "../../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1fd83a380356d95c699cbb2384836eec';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }


    const _transformCharacter = (res) => {

        return {
                id: res.id,
                name: res.name,
                description: res.description
                    ? (res.description.length < 150 ? res.description : (res.description.substring(0, 150) + ' ...'))
                    : "There is no info about that character",
                thumbnail: res.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? res.thumbnail.path + `.` + res.thumbnail.extension
                    : res.thumbnail.path + `.` + res.thumbnail.extension,
                homepage: res.urls[0].url,
                wiki: res.urls[1].url,
                comics: res.comics.items
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            printPrice: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic}
}
export default useMarvelService;