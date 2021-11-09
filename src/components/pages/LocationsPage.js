import ErrorBoundary from './../errorBoundary/ErrorBoundary';
import Locations from './../locations/Locations';

const LocationsPage = () => {
    return (
        <ErrorBoundary>
            <Locations />
        </ErrorBoundary>
    )
}

export default LocationsPage;