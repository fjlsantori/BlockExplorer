
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const blockNumber = props.blockNumber;
    return (
        <nav className="navbar">
        <h1>FJL BlockXplorer</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to={`/BlockDetails/${blockNumber}`}>Block Details</Link>
        </div>
      </nav>
    );
}
 
export default Navbar;