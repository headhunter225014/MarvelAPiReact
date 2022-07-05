
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1fd83a380356d95c699cbb2384836eec';
    _baseOffset = 210;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }


    _transformCharacter = (res) => {

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
}
export default MarvelService;