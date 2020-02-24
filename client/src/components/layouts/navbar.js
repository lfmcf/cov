import React, { Component } from 'react'
import './navbar.scss';
// import logo from './menu-2.png';
import pic from '../assests/images/8ec9c6b570f81f2193716c0ade0b96f9bce6b517.jpeg'
import {Link, withRouter} from 'react-router-dom'


class NavigationBar extends Component {
    state = {
        windowSize: ''
    }

    componentDidMount () {
        window.addEventListener("resize", this.resize);
        this.resize();
    }
    resize = () => {
        let size = window.innerWidth
        this.setState({windowSize: size})
    }

    logOut = (e) => {
        e.preventDefault()
        this.props.removeUser()
        this.props.history.push('/')
        
    }

    
    render() {
        const show = this.props.dropDownToggle
        const user = this.props.user
        let laptop, mobile = null
        if(user) {
            laptop = <div className="navDesktop">
            <div className="logo">
                <h3><Link to="/">Covoiturage</Link></h3>
            </div>
            <div className="right-menu" id="right-menu">
                <ul className="menu-list nav-link">
                    <li>
                        <Link to="search">
                            <i className="fa fa-search"></i>
                            Rechercher
                        </Link>
                    </li>
                    <li>
                        <Link to="/add_post_step_1">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            Proposer un trajet
                        </Link>
                    </li>
                    
                    <li>
                        <Link to="/messages" >
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            Messages
                        </Link>
                    </li>
                    <li className="avatar" ref={this.props.node}>
                        <img alt="avatar" className="profile-pic" src={pic}  />
                    </li>
                </ul>
            </div>
            <div className="dropdown-content nav-link" id="dc" style={{display: show ? "" : "none"}}>
                <ul>
                    <li>
                        <Link to="profile">Profile</Link>
                    </li>
                    <li >
                        <a href="/" onClick={this.logOut}>Déconnexion</a>
                    </li>
                </ul>
            </div>
        </div>
        mobile = <div className="navMobile">
        <div className="mobileRightMenu nav-link">
            <Link to="search" className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <Link to="/ajouter" className="proposer">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
        </div>
        <div className="mobileLogo nav-link">
            <h3><Link to="/">Covoiturage</Link></h3>
        </div>
        <div className="mobileAvatar" ref={this.props.node}>
            <img alt="avatar" className="profile-pic" src={pic} />
        </div>
        <div className="dropdown-content" id="dc" style={{display: show ? "" : "none"}}>
                <ul>
                    <li>
                        <Link to="messages">Messages</Link>
                    </li>
                    <li>
                        <Link to="profile">Profile</Link>
                    </li>
                    <li >
                        <a href="/" onClick={this.logOut}>Déconnexion</a>
                    </li>
                </ul>
            </div>
    </div>
        } else {
            laptop = <div className="navDesktop">
            <div className="logo nav-link">
                <h3><Link to="/">Covoiturage</Link></h3>
            </div>
            <div className="right-menu" id="right-menu">
                <ul className="menu-list nav-link">
                    <li>
                        <Link to="search">
                            <i className="fa fa-search"></i>
                            Rechercher
                        </Link>
                    </li>
                    <li>
                        <Link to="/add_post_step_1">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            Proposer un trajet
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">Connexion</Link>{/* <span class="oi oi-account-login"></span> */}
                    </li>
                    <li>
                        <Link to="/inscription" >Inscription</Link>
                    </li>
                    
                </ul>
            </div>
        </div>
        mobile = <div className="navMobile">
        <div className="mobileRightMenu nav-link">
            <Link to="search" className="search">
                <i className="fa fa-search" aria-hidden="true"></i>
            </Link>
            <Link to="/add_post_step_1" className="proposer">
                <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
        </div>
        <div className="mobileLogo nav-link">
            <h3><Link to="/">Covoiturage</Link></h3>
        </div>
        <div className="mobileAvatar nav-link" >
            <Link to="/login"><i className="fa fa-user" aria-hidden="true" ></i></Link>
        </div>
    </div>
        }
        let {windowSize} = this.state
        
        
        if(windowSize < 786) {
            return (
                <div className="nav-container">
                    <nav>
                        {mobile}
                    </nav>
                </div>
            )
        }else{
            return (
                <div className="nav-container">
                    <nav>
                        {laptop}
                    </nav>
                </div>
            )
        }
        
    }
}

export default withRouter(NavigationBar);