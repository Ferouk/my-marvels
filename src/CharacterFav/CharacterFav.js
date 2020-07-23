import React from 'react';
import './CharacterFav.css';

class CharacterFav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: [],
            favorites : []
        };
    }

    async loadData (init){
        this.setState({
            favorites :  JSON.parse(localStorage.getItem('favorites')) || []
        });
    }

    async componentDidMount() {
        // GET request using fetch with async/await
        await this.loadData(true);
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
        const { favorites } = this.state;
        return (
            <main>
                <div className="characters">
                    {favorites.length > 0 ? favorites.map((value, index) => {
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
                    }) : <h1 className="muted">The list is empty !</h1>
                    }
                </div>
            </main>
        );
    }
}

export default CharacterFav;
