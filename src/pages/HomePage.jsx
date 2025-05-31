import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import TipsSection from '../components/TipsSection';
import SocialMediaSection from '../components/SocialMediaSection';
import Footer from '../components/Footer';

const HomePage = () => (
  <>
    <Navbar />
    <section id="hero">
      <HeroSection />
    </section>
    <section id="features">
      <FeatureSection />
    </section>
    <section id="contact">
      <TipsSection/>
      <SocialMediaSection />
    </section>
    <Footer />
  </>
);

export default HomePage;
