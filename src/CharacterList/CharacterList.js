import React from 'react';
import './CharacterList.css';

class CharacterList extends React.Component {
    constructor(props) {
        super(props);

        this.apiKey = "bdd9b54829f965e5052a48c7361ced37";
        this.page = 0;
        this.limit = 20;
        this.state = {
            characters: [],
            favorites : [],
            totalPage : 0,
            loading : true
        };
    }

    async loadData (init){
        if(!init){
            this.page = this.page + 1;
        }
        let offset = this.page * 20;
        const response = await fetch('https://gateway.marvel.com:443/v1/public/characters?apikey='+this.apiKey+'&limit='+this.limit+'&offset='+offset);
        const res = await response.json();
        console.log(res)
        this.total = res.data.total;
        let joined = this.state.characters.concat(res.data.results);
        this.setState({
            characters: joined,
            totalPage : Math.round(res.data.total / this.limit),
            page : this.page,
            loading: false
        })
    }

    async componentDidMount() {
        // GET request using fetch with async/await
        await this.loadData(true);
        this.setState({
            favorites :  JSON.parse(localStorage.getItem('favorites')) || []
        });
        console.log(this.state.favorites)
    }

    handleFavorite(character){
        if(this.state.favorites.findIndex(fav => fav.id === character.id) === -1){
            let joined = this.state.favorites.concat([character]);
            localStorage.setItem('favorites', JSON.stringify(joined));
            this.setState({
                favorites : joined
            });
        }else{
            let temp = this.state.favorites;
            temp.splice(temp.findIndex(fav => fav.id === character.id), 1)
            localStorage.setItem('favorites', JSON.stringify(temp));
            this.setState({
                favorites : temp
            });
        }
    }

    render() {
        const { characters, page, totalPage, favorites, loading } = this.state;
        return (
            <main>
                <div className={loading ? "loader" : "loader hidden"}>
                    <img src="/loader.gif" alt=""/>
                </div>
                <div className="characters">
                    {characters.map((value, index) => {
                        return <div className={`character ${favorites.findIndex(fav => fav.id === value.id) > -1 ? "fav" : ""}`} key={index}>
                            {((value.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && value.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708') ? (<img src={value.thumbnail.path +"."+ value.thumbnail.extension } alt=""/>) : (<img src="/notfound.png" alt=""/>))}
                            <h2>{value.name}</h2>
                            <p>{value.description}</p>
                            <div className="cover">
                                <a className="seemore" href={"/character/" + value.id}>See More</a>
                                <br/>
                                {favorites.findIndex(fav => fav.id === value.id) === -1 ? <a className="favorite-add" href onClick={() => {  this.handleFavorite(value) }}>Add to favorites</a> :
                                <a className="favorite-remove" href onClick={() => {  this.handleFavorite(value) }}>Remove favorites</a>}
                            </div>
                        </div>
                    })}
                </div>
                <div className="actions">
                    <button className="loadmore" disabled={page === totalPage} onClick={() => this.loadData(false)}>Load more</button>
                </div>
            </main>
        );
    }
}

export default CharacterList;
