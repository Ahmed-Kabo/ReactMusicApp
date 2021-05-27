import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
const Nav = ({isActiveLibrary ,setIsActiveLibrary}) => {
  const onHandlerClick =()=> {
    setIsActiveLibrary(!isActiveLibrary)
  }
  return (
    <nav>
      <h1>DJ <span>kabo</span>  </h1>
      <button onClick={onHandlerClick} >
        <FontAwesomeIcon icon={faMusic} /> library
      </button>
    </nav>
  );
};
export default Nav;
