import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const LeftNavigation = () => {
    return (
        <div style={{ width: '20%', float: 'left', padding: '20px' }}>
            <h2>Navigation</h2>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/user">User</Link>
                </li>
                <li>
                    <Link to="/news">News</Link>
                </li>
                <li>
                    <Link to="/information">Information</Link>
                </li>
            </ul>
        </div>
    );
};

const HomePage = () => {
    return <div style={{ marginLeft: '25%', padding: '20px' }}>Home Content</div>;
};

const UserPage = () => {
    return <div style={{ marginLeft: '25%', padding: '20px' }}>User Content</div>;
};

const NewsPage = () => {
    return <div style={{ marginLeft: '25%', padding: '20px' }}>News Content</div>;
};

const InformationPage = () => {
    return <div style={{ marginLeft: '25%', padding: '20px' }}>Information Content</div>;
};

const Home = () => {
    return (
        <Router>
            <div>
                {/* Left Navigation */}
                <LeftNavigation />

                {/* Right Content */}
                <div>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/user" component={UserPage} />
                    <Route path="/news" component={NewsPage} />
                    <Route path="/information" component={InformationPage} />
                </div>
            </div>
        </Router>
    );
};

export default Home;
