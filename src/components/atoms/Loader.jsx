import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <Loader2 className="animate-spin w-16 h-16 text-blue-500" />
        <p className="loader-text">Cargando...</p>
      </div>
    </div>
  );
}

export default Loader;
