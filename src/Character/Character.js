import React from 'react';
import './Character.css';

class Character extends React.Component {

    constructor(props) {
        super(props);
        this.apiKey = "bdd9b54829f965e5052a48c7361ced37";
        this.state = {
            id : 0,
            character : [],
            loading: true
        };
    }

    async loadData (id){
        const response = await fetch('https://gateway.marvel.com:443/v1/public/characters/'+id+'?apikey='+this.apiKey);
        const res = await response.json();
        this.setState({
            character: res.data.results,
            loading: false
        })
    }

    async componentDidMount() {
        // GET request using fetch with async/await
        const {match : { params }} = this.props;
        this.setState({
            id : params.id
        });

        await this.loadData(params.id);
    }

    render() {
        const { character, loading } = this.state;
        return (
            <main>
                    {character.map((value, index) => {
                        return <div className="character-page" key={index}>
                            <header >
                                <div className="background" style={{
                                    backgroundImage: `url(${value.thumbnail.path +"."+ value.thumbnail.extension})`,
                                    backgroundSize : "cover",
                                    backgroundPosition: "center"
                                }}></div>
                                <img src={value.thumbnail.path +"."+ value.thumbnail.extension} alt=""/>
                            </header>
                            <div className={loading ? "loader" : "loader hidden"}>
                                <img src="/loader.gif" alt=""/>
                            </div>
                            <div className="infos">
                                <h1>{value.name}</h1>
                                <h2>Description</h2>
                                <p>{value.description}</p>
                                <h2>Series</h2>
                                {
                                    value.series.items.map((serie, i) => {
                                        return <li key={i}>{serie.name}</li>
                                    })
                                }
                                <h2>Stories</h2>
                                {
                                    value.stories.items.map((story, i) => {
                                        return <li key={i}>{story.name}</li>
                                    })
                                }
                                <h2>Events</h2>
                                {
                                    value.events.items.map((event, i) => {
                                        return <li key={i}>{event.name}</li>
                                    })
                                }
                                <h2>Links</h2>
                                {
                                    value.urls.map((url, i) => {
                                        return <li key={i}><a href={url.url}>{url.type}</a></li>
                                    })
                                }
                            </div>
                        </div>
                    })}

            </main>
        );
    }
}

export default Character;
