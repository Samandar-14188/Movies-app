import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <header className="header">
      <ul className="nav-list">
        <li className="nav-item" onClick={() => handleNavigate("/")}>
          Home{" "}
        </li>
        <li className="nav-item" onClick={() => handleNavigate("/search")}>
          Search
        </li>
        <li className="nav-item" onClick={() => handleNavigate("/profil")}>
          Profil
        </li>
      </ul>
    </header>
  );
}
