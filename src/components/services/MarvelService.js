
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1fd83a380356d95c699cbb2384836eec';
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (res) => {
        console.log(res.description)
        return {
                name: res.name,
                description: res.description
                    ? (res.description.length < 150 ? res.description : (res.description.substring(0, 150) + ' ...'))
                    : "There is no info about that character",
                thumbnail: res.thumbnail.path + `.` + res.thumbnail.extension,
                homepage: res.urls[0].url,
                wiki: res.urls[1].url
        }
    }
}
export default MarvelService;