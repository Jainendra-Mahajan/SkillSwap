import React from 'react'
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">Skill Swap</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to={"/add-skill"}>Add Skill</Link>
                    </li>
                    <li>
                        <Link to={"/ask-help"}>Ask Help</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar