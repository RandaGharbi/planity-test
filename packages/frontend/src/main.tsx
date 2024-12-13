import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import  {FileUpload}  from "./component/FileUpload.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Téléchargement de fichier CSV</h1>
    <FileUpload />
  </StrictMode>
);
