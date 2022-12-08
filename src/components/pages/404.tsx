import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div style={{ 'color': '#fff', 'fontSize': '28px', 'textAlign': 'center', 'margin': '20px', 'lineHeight': '35px' }}>
            <ErrorMessage />
            <p >Page doesn't exist</p>
            <Link to="/RickAndMorty">Back to main page</Link>
        </div>
    )
}

export default Page404;