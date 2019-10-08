import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/indexActions";

import Logo from "../../../logo.svg";
import classes from "../Header/Header.module.scss";
import Button from "../../../components/UI/Button/Button"

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <header className={
                classes.Header
            }>
                <div className={
                    classes.LogoPlace
                }>
                    <div>
                        <img className={
                                classes.AppLogo
                            }
                            src={Logo}
                            alt={"Logo"}/>
                    </div>
                    <div>
                        <Link to="/">
                            <div>A51 Kanban</div>
                        </Link>
                    </div>
                </div>

            </header>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
