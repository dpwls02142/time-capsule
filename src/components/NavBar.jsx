import { Link } from "react-scroll";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="App">
        <header className="nav">
          <nav className="nav__container__actions">
            <ul>
              <li className="title">
                Message Bottle
              </li>
              <li>
              <Link
                activeClass="active"
                to="form"
                spy={true}
                smooth={true}
                duration={500}
                offset={-20}
              >
                추억 기록하기
              </Link>
              </li>
              <li>
                <Link
                  activeClass="active"
                  to="list"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  추억 보러가기
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;