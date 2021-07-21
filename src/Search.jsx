import React from "react";

function Search(props){
  
        return(
            <div>
                <p>Showing {props.moviesLength} movies from the database</p>
                <button type="button" className="btn btn-primary mb-4">
                    New
                </button>

                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon1"
                onChange = {(e)=>{
                    props.receiveSearchParam(e.currentTarget.value);
                }}
                />
                </div>
            </div>


        );
}

export default Search;