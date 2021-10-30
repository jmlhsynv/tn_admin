import React from 'react'
import Footer from './Footer'

function Main() {
    return (
        <div className="app-main__outer">
            <div className="app-main__inner">
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-car icon-gradient bg-mean-fruit">
                                </i>
                            </div>
                            <div>Analytics Dashboard
                                <div className="page-title-subheading">
                                    This is an example dashboard created using
                                    build-in elements and components.
                                </div>
                            </div>
                        </div>
                        <div className="page-title-actions">
                            
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Main
