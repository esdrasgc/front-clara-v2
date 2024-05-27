import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingRoutes from './LandingRoutes';
import DashboardRoutes from './DashboardRoutes';


const RoutesComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing/*" element={<LandingRoutes />} />
                <Route path="/dashboard/*" element={<DashboardRoutes />} />
                <Route path="*" element={<LandingRoutes />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesComponent;