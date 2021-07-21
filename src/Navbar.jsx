import {Link} from "react-router-dom";
import React from "react";
let navItems = document.querySelectorAll(".nav-link");
  console.log(navItems);
  
function Navbar() {
  // Dom manipulation for highlighting part , we should do it by hooks actually but for now use dom
  for(let  i = 0 ; i <navItems.length; i++)
  {
    navItems[i].addEventListener("click",function(e){
        for(let j=0 ; j<navItems.length ; j++)
        {
          navItems[j].classList.remove("active");
        }
        e.currentTarget.classList.add("active");
    })
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Movie Rentals</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
              <Link className="nav-link" to="/">Movies</Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/Customers">Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Rentals">Rentals</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">Login</Link>
            </li>
          </ul>
         </div>
      </div>
    </nav>
  );
}

export default Navbar;