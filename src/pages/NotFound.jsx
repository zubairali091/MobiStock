import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

function NotFound({ inApp = false }) {
  return (
    <div className={inApp ? "notfound notfound-inapp" : "notfound"}>
      <Compass size={44} />
      <h1>Page not found</h1>
      <p>The address you entered does not exist.</p>
      <Link to={inApp ? "/app/dashboard" : "/"} className="btn btn-primary">
        {inApp ? "Back to dashboard" : "Back to home"}
      </Link>
    </div>
  );
}

export default NotFound;
