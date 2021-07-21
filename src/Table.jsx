import React from "react";
class Table extends React.Component {
    state = {
        allMovies: [
            //     {
            //         title: "Terminator",
            //         genre: "Action",
            //         stock: "2",
            //         rate: "2.5",
            //     },
            //     {
            //         title: "Die Hard",
            //         genre: "Action",
            //         stock: "3",
            //         rate: "2.5",
            //     },
            //     {
            //         title: "Get Out",
            //         genre: "Comedy",
            //         stock: "5",
            //         rate: "3",
            //     },
            //     {
            //         title: "Trip to Italy",
            //         genre: "Romance",
            //         stock: "6",
            //         rate: "3.5",
            //     },
        ],
        currPage: 1,
    };
    //lifetime mai ek baar data fetch karna hai to isliye
    // componentDidMount
    componentDidMount() {
        fetch("/movies").then(function (res) {
            return res.json();
        }).then((json) => {
            this.setState({ allMovies: json });
            this.props.sendData(json.length);
        });
    }
    render() {
        let moviesToDisplay = [];

        if(this.props.currGenre != "All Genre")
        {
            moviesToDisplay = this.state.allMovies.filter((e)=>{
                return e.genre.name == this.props.currGenre;
            });
        }
        else
        {
            moviesToDisplay = this.state.allMovies;
        }
        // console.log(moviesToDisplay);
        
        if(this.props.searchString)
        {
            let strToCompare = this.props.searchString.toLowerCase();

            moviesToDisplay = moviesToDisplay.filter((el)=>{
                return el.title.toLowerCase().includes(strToCompare);
            });
        }


        let numberOfPages = Math.ceil(this.state.allMovies.length / 5);
        let arr = [];
        for (let i = 1; i <= numberOfPages; i++) {
            arr.push(i);
        }
        let starting = (this.state.currPage - 1) * 5;
        let ending = this.state.currPage * 5 - 1;

         moviesToDisplay = moviesToDisplay.slice(
            starting, Math.min(ending,this.state.allMovies.length - 1) + 1
            );

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesToDisplay.map((el) => {
                            return (
                                <tr key={el._id}>
                                    <td>{el.title}</td>
                                    <td>{el.genre.name}</td>
                                    <td>{el.numberInStock}</td>
                                    <td>{el.dailyRentalRate}</td>
                                    <td onClick={()=>{
                                        // console.log(e.currentTarget.innerText);
                                        // e.currentTarget.innerText=="Liked"?e.currentTarget.innerText="Like":e.currentTarget.innerText="Liked";
                                        let allMovies = this.state.allMovies;

                                        let index = allMovies.findIndex((e)=>{
                                            return e._id == el._id;
                                        });

                                        allMovies[index].liked?allMovies[index].liked=false:allMovies[index].liked=true;

                                        this.setState({allMovies:allMovies});

                                    }}>{(el.liked)?
                                    <span className="material-icons">
                                    favorite
                                    </span>:
                                    <span className="material-icons">
                                    favorite_border
                                    </span>}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" 
                                        onClick={()=>{
                                            let allMovies = this.state.allMovies;
                                            
                                            allMovies = allMovies.filter((e)=>{
                                                return e._id != el._id;
                                            });

                                            this.setState({allMovies:allMovies});
                                            this.props.sendData(allMovies.length);
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"
                        onClick={()=>{
                            let currPage = this.state.currPage;
                            currPage--;
                            if(currPage<1) currPage=1;
                            this.setState({currPage:currPage});
                        }}
                        ><a className="page-link" href="#">Previous</a></li>
                        {
                            arr.map((ele)=>{
                                return (<li 
                                className="page-item"
                                onClick={()=>{
                                    this.setState({currPage:ele});
                                }}>
                                    <a className="page-link" href="#">{ele}</a>
                                    </li>
                            )
                            })
                        }
                        <li className="page-item"
                        onClick={()=>{
                            let currPage = this.state.currPage;
                            currPage++;
                            if(currPage>numberOfPages) currPage=numberOfPages;
                            this.setState({currPage:currPage});
                        }}
                        ><a className="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Table;