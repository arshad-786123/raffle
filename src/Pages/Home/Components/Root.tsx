
import React from 'react';

import stylehome from "./root.module.css"

const Root: React.FC = () => {
    return (
        <main>
            <section className={stylehome.heroBanner}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-4 pe-0">
                            <div className={`${stylehome.heroBannerLeft} d-flex flex-column justify-content-center align-items-start h-100`}>
                                <h1 className={stylehome.heroBannerTitle}>Raffily <span className="gradient-text-common">Exclusive</span></h1>
                                <p className={stylehome.heroBannerText}>Win a Prestige Package for 8 in a Private Box at <span>Chester Racecourse</span> on Ladies Day</p>
                                <p className={stylehome.heroBannerText}>Worth over £10,000</p>
                                <a className="btn-common btn-white mb-43" href="#">Enter</a>
                                <p className={stylehome.heroBannerAssociationTitle}>In association with</p>
                                <div className={`${stylehome.heroBannerAssociationLogoCont} d-flex justify-content-start align-items-center gap-4`}>
                                    <a className={stylehome.heroBannerAssociationLogo}>
                                        <img className="img-fluid" src="/static-images/logoBoodles.svg" alt="Logo Boodles" />
                                    </a>
                                    <span className="devider-common"></span>
                                    <a className={stylehome.heroBannerAssociationLogo}>
                                        <img className="img-fluid" src="/static-images/logoChester.svg" alt="Logo Chester" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 ps-0">
                            <div className={stylehome.heroBannerRight}>
                                <img className={`${stylehome.heroBannerImg} img-fluid position-relative`} src="homeBannerImg.jpg" alt="Home Banner Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={stylehome.logosSliderBox}>
                <div className={`${stylehome.logosSliderCont} d-flex justify-content-center align-items-center gap-72 overflow-auto pb-3`}>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners1.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners2.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners3.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners4.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners5.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners6.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners7.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners8.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners1.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="/static-images/logoPartners2.svg" alt="Logo Partner" />
                    </a>
                    {/* <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners3.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners4.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners5.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners6.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners7.svg" alt="Logo Partner" />
                    </a>
                    <a className={`${stylehome.logosSlide}`} href="#">
                        <img className="d-block" src="logoPartners8.svg" alt="Logo Partner" />
                    </a> */}
                </div>
            </section>
            <section className={stylehome.featuredRaffles}>
                <div className="container-fluid">
                    <h2>Featured raffles</h2>
                    <div className={`${stylehome.featuredRafflesBoxCont} d-flex justify-content-start align-items-center gap-20 overflow-auto pb-3`}>
                        <div className={`${stylehome.featuredRafflesBox} d-flex justify-content-center align-items-center`}>
                            <div className={`${stylehome.featuredRafflesBoxLeft} position-relative`}>
                                <div className={`${stylehome.timerBoxCont} position-absolute d-flex justify-content-center align-items-center gap-12`}>
                                    <div className={stylehome.timerBox}>
                                        <div className={stylehome.timerNumber}>13</div>
                                        <div className={stylehome.timerText}>Days</div>
                                    </div>
                                    <span className={stylehome.timerDevider}></span>
                                    <div className={stylehome.timerBox}>
                                        <div className={stylehome.timerNumber}>21</div>
                                        <div className={stylehome.timerText}>Hrs</div>
                                    </div>
                                    <span className={stylehome.timerDevider}></span>
                                    <div className={stylehome.timerBox}>
                                        <div className={stylehome.timerNumber}>42</div>
                                        <div className={stylehome.timerText}>Mins</div>
                                    </div>
                                    <span className={stylehome.timerDevider}></span>
                                    <div className={stylehome.timerBox}>
                                        <div className={stylehome.timerNumber}>05</div>
                                        <div className={stylehome.timerText}>Secs</div>
                                    </div>
                                </div>
                                <a className={`${stylehome.featuredRafflesThumbImg}  position-absolute`} href="#">
                                    <img className={`${stylehome.ThumbImg} img-fluid rounded-circle ratio ratio-1x1 object-fit-cover`} src="featuredRafflesThumbImg1.jpg" alt="Featured Raffles Img" />
                                </a>
                                <img className={`${stylehome.featuredRafflesImg} img-fluid`} src="featuredRafflesImg1.jpg" alt="Featured Raffles Img" />
                            </div>
                            <div className={stylehome.featuredRafflesBoxRight}>
                                Right
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Root;