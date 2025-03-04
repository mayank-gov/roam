"use client";

import React from "react";
import { useParams  } from 'next/navigation'
import Link from 'next/link';

const Header = () => {
    const pathname = useParams<{companyid:string}>()
    const companyPage = `/company/${pathname.companyid}`;
    return (
        <div>
            <div className="ontario-header__container">
                <header
                    className="ontario-application-header ontario-header"
                    id="ontario-header"
                >
                    <div className="ontario-row">
                        <div className="ontario-columns ontario-small-6 ontario-application-header__logo">
                            <a href="https://www.ontario.ca/page/government-ontario">
                                <img
                                    src="/ODS/logos/ontario-logo--desktop.svg"
                                    alt="Ontario.ca homepage"
                                    role="img"
                                />
                            </a>
                        </div>
                        <div className="ontario-columns ontario-small-6 ontario-application-header__lang-toggle">
                            <a
                                href="#"
                                className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline"
                            >
                                Français
                            </a>
                        </div>
                    </div>
                </header>
                <div className="ontario-application-subheader-menu__container">
                    <section className="ontario-application-subheader">
                        <div className="ontario-row">
                            <div className="ontario-columns ontario-small-12 ontario-application-subheader__container">
                                <p className="ontario-application-subheader__heading">
                                    <a href="#">Roam</a>
                                </p>

                                <div className="ontario-application-subheader__menu-container">
                                    {/*<ul className="ontario-application-subheader__menu ontario-show-for-large">*/}
                                    {/*    <li>*/}
                                    {/*        <a href="#">Notifications</a>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <a href="#">Services</a>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <a href="#">Delegations</a>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <Link href={companyPage+"/members"}>*/}
                                    {/*            Members*/}
                                    {/*        </Link>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                    <ul className="ontario-application-subheader__menu ontario-hide-for-small ontario-show-for-medium ontario-hide-for-large">
                                        <li>
                                            <a href="#">Link 1</a>
                                        </li>
                                        <li>
                                            <a href="#">Link 2</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <nav className="ontario-navigation" id="ontario-navigation">
                        <div className="ontario-navigation__container">
                            <ul>
                                <li className="ontario-show-for-small-only">
                                    <a href="#">Link 1</a>
                                </li>
                                <li className="ontario-show-for-small-only">
                                    <a href="#">Link 2</a>
                                </li>
                                <li className="ontario-hide-for-large">
                                    <a href="#">Link 3</a>
                                </li>
                                <li className="ontario-hide-for-large">
                                    <a href="#">Link 4</a>
                                </li>
                                <li className="ontario-hide-for-large">
                                    <a href="#">Link 5</a>
                                </li>
                                <li>
                                    <a href="#">Link 6</a>
                                </li>
                                <li>
                                    <a href="#">Link 7</a>
                                </li>
                                <li>
                                    <a href="#">Link 8</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="ontario-overlay"></div>
            {/* <script src='/ODS/scripts/ontario-a11y.js'></script>
        <script src='/ODS/scripts/ontario-header.js'></script> */}
        </div>
    );
};

export default Header;