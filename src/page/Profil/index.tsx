import { useState, useEffect } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";

export default function Profil() {
  const [profileImage, setProfileImage] = useState<string>("https://via.placeholder.com/150");
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [name, setName] = useState<{ firstName: string; lastName: string }>({
    firstName: "",
    lastName: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedProfileName = localStorage.getItem('profileName');
    const storedSavedMovies = localStorage.getItem('savedMovie');

    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
    if (storedProfileName) {
      setName(JSON.parse(storedProfileName));
    }
    if (storedSavedMovies) {
      setSavedMovies([JSON.parse(storedSavedMovies)]);
    }
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSavedMovies = () => {
    const saved = localStorage.getItem('savedMovie');
    if (saved) {
      setSavedMovies([JSON.parse(saved)]);
    } else {
      setSavedMovies([]);
    }
  };

  useEffect(() => {
    if (showSaved) {
      loadSavedMovies();
    }
  }, [showSaved]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'firstName' | 'lastName') => {
    const updatedName = { ...name, [field]: e.target.value };
    setName(updatedName);
    localStorage.setItem('profileName', JSON.stringify(updatedName));
  };

  const toggleEditing = () => {
    setEditing(!editing);
  };

  return (
    <div className="profil-section">
      <div className="profil-container">
        <div className="profile-image-container">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
        <div className="profil-list">
          <div className="profil-item">
            <input
              type="text"
              value={name.firstName}
              onChange={(e) => handleNameChange(e, 'firstName')}
              className="profil-item-input"
              placeholder="Name"
              disabled={!editing}
            />
            <span className="edit-icon" onClick={toggleEditing}>
              <LuPencilLine className="edit-icon-svg" />
            </span>
          </div>
          <div className="profil-item">
            <input
              type="text"
              value={name.lastName}
              onChange={(e) => handleNameChange(e, 'lastName')}
              className="profil-item-input"
              placeholder="Surname"
              disabled={!editing}
            />
            <span className="edit-icon" onClick={toggleEditing}>
              <LuPencilLine className="edit-icon-svg" />
            </span>
          </div>
          <div
            className="profil-item profil-item-star"
            onClick={() => setShowSaved(!showSaved)}
          >
            Saqlanganlar
            <span className="star-icon">
              <IoMdStarOutline className="star-icon-svg" />
            </span>
          </div>
        </div>
      </div>
      <div className="Kinolar">
        {showSaved && savedMovies.length > 0 ? (
          <div className="saved-movies">
            {savedMovies.map((movie, index) => (
              <div key={index} className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        ) : (
          showSaved && <p>No saved movies found.</p>
        )}
      </div>
    </div>
  );
}
