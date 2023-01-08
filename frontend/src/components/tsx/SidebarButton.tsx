import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, To, useLocation } from 'react-router-dom';
import '../css/sidebarButton.css';

export default function SidebarButton(props: {
    name: string;
    title: string;
    to: To;
    icon: any;
}) {
    const location = useLocation();

    const isActive = location.pathname === props.to;

    const btnClass = isActive ? 'btn-body active' : 'btn-body';
    return (
        <Link to={props.to}>
            <div className={btnClass}>
                <FontAwesomeIcon
                    icon={props.icon}
                    color="white"
                    className="sidebar-font ms-4 mb-3"
                />
                <span className={props.name + ' mb-3 mx-3'}>{props.title}</span>
            </div>
        </Link>
    );
}
