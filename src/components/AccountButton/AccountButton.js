import React from "react";
import { Link } from "react-router-dom";
import './AccountButton.css';

const AccountButton = ({ handleCloseMenu }) => {
    return (
        <Link to='/profile' className='account-button' onClick={handleCloseMenu}>Аккаунт</Link>
)
};

export default AccountButton;
