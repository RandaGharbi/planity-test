import { useState } from "react";
import { UploadContainer, ErrorMessage } from "../styles/FileUploadStyles"; // Importation des styles
import { SuccessPopup } from "./SuccessPopup"; // Popup de succès
import upload from "../assets/upload.png";
import Loading from "./Loading"; // Importation du composant Loading

const BACKEND_URL = "http://localhost:5000/upload";

export const FileUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "resultats.zip";
      link.click();
      window.URL.revokeObjectURL(downloadUrl);

      setShowSuccess(true); // Affiche le popup
      setTimeout(() => setShowSuccess(false), 3000); // Masque le popup après 3 secondes
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UploadContainer>
        <div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            id="file-input"
            disabled={loading}
          />
          <label htmlFor="file-input">
            <img src={upload} alt="upload" className="upload-image" />
            Select a file
          </label>
        </div>
      </UploadContainer>

      {/* Loader Container */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000, // To keep the loader on top
          }}
        >
          <Loading />
        </div>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {showSuccess && <SuccessPopup message="Upload successful!" />}
    </>
  );
};
