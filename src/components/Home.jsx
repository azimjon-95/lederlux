import React from 'react'
import Main from './main/Main'
import Products from './products/Products';
import ManzilMapPage from './map/MapPage';
import CertificatesGallery from './certificates/CertificatesGallery';
import SodiumNitrateInfo from './sodiumNitrateInfo/SodiumNitrateInfo';

const Home = ({ lang }) => {
    return (
        <>
            <Main lang={lang} />
            <Products lang={lang} />
            <SodiumNitrateInfo lang={lang} />
            <ManzilMapPage lang={lang} />
            <CertificatesGallery lang={lang} />
        </>
    )
}

export default Home
