import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import { CartContext } from "../../Context/CartContextProvider";
export default function Navbar() {
  let { token ,setToken} = useContext(AuthContext);
  let {numsCartItems}=useContext(CartContext)
  let nav = useNavigate();
  function logout(){
    localStorage.removeItem('token');
    setToken(null);
    nav('/login');
  } 
  return (
    <>
      <nav className="bg-white border-gray-200 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-evenly">
          <div>
          <Link
            to="/"
            className="space-x-3 rtl:space-x-reverse flex text-center items-center "
          >
            <i className="fa-solid fa-cart-shopping text-active mr-1" style={{fontWeight:900, fontSize:'24px'}}></i>
              <h2 style={{fontWeight:500, fontSize:'20px'}}>fresh cart</h2>
          </Link>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
            {token ?
              (<div>
                <ul className="font-medium justify-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/Cart"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Cart
                  </NavLink>
                </li>
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/wishList"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/Product"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Products
                  </NavLink>
                </li>
               
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/Category"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Categories
                  </NavLink>
                </li>
                <li style={{fontWeight:400, fontSize:'13px'}}>
                  <NavLink
                    to="/Brands"
                    className={(x) => x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"}
                    aria-current="page"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul> </div>) : ('')}

            <div><ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ml-auto">
              {token ?
                (<><li className="relative" style={{fontWeight:400, fontSize:'16px'}}>
                  <NavLink  to={'/Cart'} className={ "block py-2 px-3"}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="absolute top-0 end-0 -translate-y-2 translate-x-1">{numsCartItems}</span>
                  </NavLink>
                </li>
               <li style={{fontWeight:400, fontSize:'13px'}} onClick={logout}>
               <NavLink className={ "block py-2 px-3"}>
                 Logout
               </NavLink>
             </li></> ):( <>
                  <li style={{fontWeight:400, fontSize:'13px'}}>
                    <NavLink
                      to="/login"
                      className={ "block py-2 px-3"}
                      aria-current="page"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li style={{fontWeight:400, fontSize:'13px'}}>
                    <NavLink
                      to="/register"
                      className={"block py-2 px-3"}
                      aria-current="page"
                    >
                      register
                    </NavLink>
                  </li>
                </>)}

            </ul>
          </div>
          </div>
      </nav >
    </>
  );
}
