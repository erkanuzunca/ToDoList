// rcc
import React, { Component } from 'react'

// I18N
import { withTranslation } from 'react-i18next';

// ROUTER
import { Link } from 'react-router-dom';

// Language
import OtherLanguageServices from "../internationalization/OtherLanguageServices";

// Flag (Dil)
import tr from "../img/flag/tr.png"
import en from "../img/flag/en.png"


// CLASS COMPONENT
class Header extends Component {

    // Component görünen ismi
    static displayName = "Blog_Header";

    // Constructor
    constructor(props) {
        super(props);

        // STATE
        this.state = {}

        // BIND
    } //end constructor

    // CDM

    // FUNCTION

    //Bayraklar
    internationalizationLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);

        //Hem java tarafından hemde frontend tarafından değişiklik yaptık.
        OtherLanguageServices.headerLanguageServices(language);
    }

    //RENDER
    render() {

        //RETURN
        return (
            <React.Fragment>
             

            </React.Fragment>
        ) //end return
    } //end render
} //end class

// Higher Order Component
export default withTranslation()(Header);