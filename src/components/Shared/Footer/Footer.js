import React from 'react';
import moment from 'moment';

const Footer = () => {

    return (
        <footer>
            <small>&copy; {moment().format('YYYY')} <span className="fw-bold">Muhammad Shahnewaz</span>. All right reserved.</small>
        </footer>
    );
};

export default Footer;