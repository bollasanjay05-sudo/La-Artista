<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>L'ARTISTA | Fine Italian Dining Restaurant</title>
    <meta name="description" content="Premium fine dining Italian restaurant experience at L'ARTISTA in Riga, Latvia">
    <meta name="robots" content="index, follow">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- CSS -->
    <style>
        /* ============================================
           L'ARTISTA FINE DINING - FULLY OPTIMIZED CSS
        ============================================ */

        :root {
          /* Italian Flag Colors */
          --green: #1F3D2B;
          --white: #FFFFFF;
          --red: #D6273B;
          --ivory: #F9F7F2;
          --gold: #C8A951;
          
          /* Text Colors */
          --text-dark: #1A1A1A;
          --text-muted: #666666;
          --text-light: #999999;
          
          /* Shadows */
          --shadow: 0 5px 15px rgba(0,0,0,0.1);
          --shadow-lg: 0 10px 30px rgba(0,0,0,0.15);
          
          /* Transitions */
          --transition: all 0.3s ease;
          
          /* Spacing */
          --space-sm: 1rem;
          --space-md: 2rem;
          --space-lg: 3rem;
          --space-xl: 4rem;
        }

        /* ============================================
           RESET & BASE STYLES
        ============================================ */
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          font-size: 16px;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: var(--ivory);
          color: var(--text-dark);
          line-height: 1.6;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ============================================
           ITALIAN FLAG STRIPES
        ============================================ */
        .italian-flag-stripe {
          position: fixed;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(
            to right,
            var(--green) 33.33%,
            var(--white) 33.33% 66.66%,
            var(--red) 66.66%
          );
          z-index: 1000;
        }

        .italian-flag-stripe.top {
          top: 0;
        }

        .italian-flag-stripe.bottom {
          bottom: 0;
        }

        /* ============================================
           CONTAINERS
        ============================================ */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }

        section {
          padding: 80px 0;
        }

        @media (max-width: 768px) {
          section {
            padding: 60px 0;
          }
          
          .container {
            padding: 0 15px;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 50px 0;
          }
          
          .container {
            padding: 0 12px;
          }
        }

        /* ============================================
           UTILITY CLASSES
        ============================================ */
        .red-text { color: var(--red); }
        .green-text { color: var(--green); }
        .white-text { color: var(--white); }

        .text-center { text-align: center; }

        .highlight-red {
          color: var(--red);
          font-weight: 600;
        }

        .highlight-green {
          color: var(--green);
          font-weight: 600;
        }

        /* Logo Fallback */
        .logo-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1F3D2B, #D6273B);
          color: white;
          font-family: "Playfair Display", serif;
          font-weight: bold;
          text-align: center;
          padding: 15px;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          font-size: 0.8em;
        }

        .hero-fallback {
          font-size: 1.2em;
          padding: 30px;
        }

        /* ============================================
           BUTTONS
        ============================================ */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 30px;
          border: 2px solid transparent;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
          gap: 8px;
          font-family: 'Inter', sans-serif;
        }

        .btn-red {
          background-color: var(--red);
          color: white;
          border-color: var(--red);
        }

        .btn-red:hover {
          background-color: #b81e30;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(214, 39, 59, 0.3);
        }

        .btn-premium {
          background: linear-gradient(135deg, var(--red), #b81e30);
          color: var(--white);
          border: 2px solid var(--red);
        }

        .btn-premium:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(214, 39, 59, 0.3);
          background: linear-gradient(135deg, #b81e30, var(--red));
        }

        .btn-outline-premium {
          background: transparent;
          color: var(--white);
          border: 2px solid var(--white);
          backdrop-filter: blur(10px);
        }

        .btn-outline-premium:hover {
          background: var(--white);
          color: var(--red);
          transform: translateY(-3px);
        }

        .btn-large {
          padding: 1rem 2.5rem;
          font-size: 1rem;
        }

        .btn-block {
          width: 100%;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .btn {
            padding: 12px 24px;
            font-size: 14px;
          }
          
          .btn-large {
            padding: 14px 28px;
          }
          
          .button-group {
            flex-direction: column;
            width: 100%;
          }
          
          .button-group .btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .btn {
            padding: 10px 20px;
            font-size: 13px;
          }
          
          .btn-large {
            padding: 12px 24px;
          }
        }

        /* ============================================
           LOADER
        ============================================ */
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1F3D2B 0%, #2D5A42 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .loader-logo {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: white;
          margin-bottom: 30px;
          letter-spacing: 3px;
        }

        .loader-spinner {
          width: 70px;
          height: 70px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top: 4px solid #D6273B;
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loader-text {
          color: rgba(255, 255, 255, 0.8);
          margin-top: 20px;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* ============================================
           WHATSAPP FLOAT BUTTON
        ============================================ */
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          bottom: 30px;
          right: 30px;
          background-color: #25d366;
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 28px;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          animation: pulse 2s infinite;
        }

        .whatsapp-float:hover {
          background-color: #128C7E;
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            width: 55px;
            height: 55px;
            font-size: 24px;
            bottom: 20px;
            right: 20px;
          }
        }

        /* ============================================
           NAVIGATION - FIXED WITH PERFECTLY CENTERED LOGO
        ============================================ */
        .premium-navbar {
          position: fixed;
          top: 6px;
          left: 0;
          right: 0;
          background: rgba(249, 247, 242, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 6px 0;
          border-bottom: 1px solid rgba(214, 39, 59, 0.1);
          transition: var(--transition);
        }

        .premium-navbar.scrolled {
          background: rgba(249, 247, 242, 0.98);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
        }

        /* Logo Container - Perfectly Centered */
        .logo-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          text-decoration: none;
          z-index: 1001;
        }

        /* Logo - Bigger with RED CIRCLE BORDER */
        .custom-logo {
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--red);
          padding: 3px;
          background: white;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .nav-logo {
          width: 70px;
          height: 70px;
        }

        .custom-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 50%;
        }

        /* Navigation Links - Split into left and right */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 30px;
          margin: 0;
          padding: 0;
        }

        .nav-links.left {
          margin-right: auto;
        }

        .nav-links.right {
          margin-left: auto;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: var(--transition);
          position: relative;
          padding: 5px 0;
          white-space: nowrap;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--red);
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--red);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link.active {
          color: var(--red);
          font-weight: 600;
        }

        .nav-link.active::after {
          width: 100%;
          background: var(--red);
        }

        /* Mobile Menu Toggle */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 30px;
          height: 20px;
          position: relative;
          z-index: 1001;
        }

        .menu-toggle span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--red);
          position: absolute;
          transition: var(--transition);
        }

        .menu-toggle span:nth-child(1) { top: 0; }
        .menu-toggle span:nth-child(2) { top: 9px; }
        .menu-toggle span:nth-child(3) { top: 18px; }

        /* Mobile Menu */
        .premium-mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 300px;
          height: 100vh;
          background: var(--green);
          padding: 100px 30px 30px;
          transition: var(--transition);
          z-index: 999;
          box-shadow: -5px 0 20px rgba(0,0,0,0.1);
        }

        .premium-mobile-menu.active {
          right: 0;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-logo {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: white;
          font-weight: 600;
        }

        .mobile-menu-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }

        .premium-mobile-menu .nav-links {
          flex-direction: column;
          gap: 25px;
          margin-left: 0;
        }

        .premium-mobile-menu .nav-link {
          font-size: 16px;
          padding: 10px 0;
          display: block;
          color: white;
        }

        .premium-mobile-menu .nav-link:hover {
          color: var(--red);
        }

        .mobile-menu-footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu-footer .btn {
          width: 100%;
        }

        /* Responsive Navigation */
        @media (max-width: 1100px) {
          .nav-links {
            gap: 20px;
          }
        }

        @media (max-width: 992px) {
          .nav-links {
            gap: 15px;
          }
          
          .nav-link {
            font-size: 12px;
          }
        }

        @media (max-width: 768px) {
          .nav-links.left,
          .nav-links.right {
            display: none;
          }
          
          .logo-center {
            position: static;
            transform: none;
            margin: 0 auto;
          }
          
          .menu-toggle {
            display: block;
            position: absolute;
            right: 20px;
          }
          
          .nav-container {
            justify-content: center;
            padding: 0 15px;
          }
          
          .nav-logo {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 0 12px;
          }
          
          .nav-logo {
            width: 55px;
            height: 55px;
          }
        }

        /* ============================================
           HERO SECTION
        ============================================ */
        .hero-premium {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 70px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
          transition: filter 0.3s ease;
        }

        .hero-bg img:hover {
          filter: brightness(0.7);
        }

        .premium-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, 
              rgba(31, 61, 43, 0.4) 0%, 
              rgba(255, 255, 255, 0.1) 50%, 
              rgba(214, 39, 59, 0.4) 100%);
          pointer-events: none;
          z-index: -1;
        }

        .premium-hero-content {
          text-align: center;
          color: white;
          padding: 40px 20px;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .premium-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin-bottom: 40px;
        }

        .premium-hero-logo {
          width: 200px;
          height: 200px;
          border-width: 4px;
          margin-bottom: 1rem;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .premium-title {
          margin-bottom: 1rem;
        }

        .premium-title .title-line-1 {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          font-weight: 600;
          letter-spacing: 2px;
          line-height: 1;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .premium-title .title-line-2 {
          display: block;
          font-size: 24px;
          font-weight: 300;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.9);
        }

        .premium-subtitle {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .premium-tagline {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .premium-hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .premium-scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          cursor: pointer;
          animation: bounce 2s infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .scroll-text {
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          opacity: 0.8;
        }

        .scroll-arrow {
          font-size: 24px;
          animation: bounceArrow 1.5s infinite;
        }

        @keyframes bounceArrow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        /* Responsive Hero */
        @media (max-width: 1024px) {
          .premium-title .title-line-1 {
            font-size: 60px;
          }
          
          .premium-title .title-line-2 {
            font-size: 20px;
            letter-spacing: 4px;
          }
        }

        @media (max-width: 768px) {
          .hero-premium {
            min-height: 90vh;
            padding-top: 60px;
          }
          
          .premium-title .title-line-1 {
            font-size: 48px;
          }
          
          .premium-title .title-line-2 {
            font-size: 18px;
            letter-spacing: 3px;
          }
          
          .premium-subtitle {
            font-size: 18px;
          }
          
          .premium-tagline {
            font-size: 16px;
            padding: 0 10px;
          }
          
          .premium-hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          
          .premium-hero-buttons .btn {
            width: 100%;
            max-width: 300px;
          }
          
          .premium-hero-logo {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .premium-title .title-line-1 {
            font-size: 36px;
          }
          
          .premium-title .title-line-2 {
            font-size: 16px;
            letter-spacing: 2px;
          }
          
          .premium-subtitle {
            font-size: 16px;
          }
          
          .premium-tagline {
            font-size: 14px;
          }
          
          .premium-hero-logo {
            width: 120px;
            height: 120px;
          }
          
          .premium-hero-buttons .btn {
            max-width: 100%;
          }
        }

        /* ============================================
           SECTIONS
        ============================================ */
        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          color: var(--green);
          margin-bottom: 10px;
        }

        .section-header .subtitle {
          color: var(--red);
          font-size: 18px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin: 20px 0;
        }

        .divider-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, var(--green), var(--red));
        }

        .divider-icon {
          color: var(--red);
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 36px;
          }
          
          .section-header .subtitle {
            font-size: 16px;
          }
          
          .section-divider {
            gap: 10px;
          }
          
          .divider-line {
            width: 40px;
          }
        }

        @media (max-width: 480px) {
          .section-header h2 {
            font-size: 28px;
          }
          
          .section-header .subtitle {
            font-size: 14px;
          }
          
          .divider-line {
            width: 30px;
          }
        }

        /* ============================================
           ABOUT SECTION
        ============================================ */
        .about-section {
          padding: 80px 0;
        }

        .premium-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .premium-content {
          padding-right: 30px;
        }

        .premium-intro {
          font-size: 20px;
          line-height: 1.8;
          margin-bottom: 25px;
          color: var(--text-dark);
        }

        .premium-description {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 30px;
        }

        .premium-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .premium-feature-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: var(--shadow);
          transition: var(--transition);
          border: 1px solid rgba(214, 39, 59, 0.1);
        }

        .premium-feature-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
          border-color: var(--red);
        }

        .premium-feature-icon {
          font-size: 2.5rem;
          color: var(--red);
          margin-bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          background: rgba(214, 39, 59, 0.1);
          border-radius: 50%;
        }

        .premium-feature-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: var(--green);
        }

        .premium-feature-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .premium-about-image {
          position: relative;
        }

        .image-frame {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          position: relative;
        }

        .image-frame video {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .image-frame:hover video {
          transform: scale(1.05);
        }

        .image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
          padding: 20px;
          font-size: 14px;
          text-align: center;
        }

        /* Responsive About */
        @media (max-width: 992px) {
          .premium-about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .premium-content {
            padding-right: 0;
            order: 2;
          }
          
          .premium-about-image {
            order: 1;
          }
          
          .image-frame video {
            height: 300px;
          }
        }

        @media (max-width: 768px) {
          .premium-intro {
            font-size: 18px;
          }
          
          .premium-description {
            font-size: 15px;
          }
          
          .premium-features-grid {
            grid-template-columns: 1fr;
          }
          
          .image-frame video {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .premium-feature-card {
            padding: 1.5rem;
          }
          
          .image-frame video {
            height: 200px;
          }
        }

        /* ============================================
           MENU SECTION
        ============================================ */
        .menu-section {
          background: linear-gradient(135deg, rgba(31, 61, 43, 0.02) 0%, rgba(249, 247, 242, 1) 100%);
          border-radius: 20px;
          padding: 60px 40px;
          margin: 60px auto;
        }

        .menu-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 40px;
          flex-wrap: wrap;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .menu-tab {
          padding: 12px 24px;
          background: transparent;
          border: 2px solid rgba(214, 39, 59, 0.2);
          color: var(--text-dark);
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: var(--transition);
          white-space: nowrap;
        }

        .menu-tab:hover {
          border-color: var(--red);
          color: var(--red);
        }

        .menu-tab.active {
          background: linear-gradient(135deg, var(--red), #b81e30);
          color: white !important;
          border-color: var(--red);
          box-shadow: 0 4px 15px rgba(214, 39, 59, 0.3);
        }

        .menu-category {
          display: none;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .menu-category.active {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .menu-category h3 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: var(--green);
          margin-bottom: 30px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }

        .menu-category h3 i {
          color: var(--red);
          font-size: 28px;
        }

        .menu-items-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .menu-item {
          background: white;
          padding: 25px;
          border-radius: 12px;
          box-shadow: var(--shadow);
          transition: var(--transition);
          border: 1px solid rgba(214, 39, 59, 0.1);
          opacity: 0;
          transform: translateY(10px);
          animation: menuItemFadeIn 0.5s ease forwards;
        }

        @keyframes menuItemFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .menu-item:nth-child(1) { animation-delay: 0.1s; }
        .menu-item:nth-child(2) { animation-delay: 0.2s; }
        .menu-item:nth-child(3) { animation-delay: 0.3s; }
        .menu-item:nth-child(4) { animation-delay: 0.4s; }
        .menu-item:nth-child(5) { animation-delay: 0.5s; }
        .menu-item:nth-child(6) { animation-delay: 0.6s; }
        .menu-item:nth-child(7) { animation-delay: 0.7s; }
        .menu-item:nth-child(8) { animation-delay: 0.8s; }
        .menu-item:nth-child(9) { animation-delay: 0.9s; }
        .menu-item:nth-child(10) { animation-delay: 1s; }

        .menu-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border-color: var(--red);
        }

        .menu-item-content {
          flex: 1;
        }

        .menu-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(214, 39, 59, 0.1);
        }

        .menu-item-header h4 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: var(--green);
          font-weight: 500;
          flex: 1;
          margin-right: 15px;
          line-height: 1.4;
        }

        .menu-item-header .allergy {
          font-size: 12px;
          color: var(--red);
          font-weight: 600;
          white-space: nowrap;
          background: rgba(214, 39, 59, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
        }

        .menu-desc {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 8px;
          font-style: italic;
        }

        .price {
          font-size: 18px;
          font-weight: 600;
          color: var(--red);
          white-space: nowrap;
          margin-top: 8px;
          text-align: right;
        }

        /* Menu Responsive */
        @media (max-width: 992px) {
          .menu-section {
            padding: 40px 20px;
            margin: 40px auto;
          }
          
          .menu-category h3 {
            font-size: 28px;
          }
          
          .menu-items-container {
            grid-template-columns: 1fr;
          }
          
          .menu-item-header h4 {
            font-size: 18px;
          }
        }

        @media (max-width: 768px) {
          .menu-tabs {
            justify-content: flex-start;
            padding-bottom: 15px;
          }
          
          .menu-tab {
            flex-shrink: 0;
            padding: 10px 20px;
            font-size: 13px;
          }
          
          .menu-category h3 {
            font-size: 24px;
          }
          
          .menu-item {
            padding: 20px;
          }
          
          .menu-item-header h4 {
            font-size: 16px;
          }
          
          .menu-desc {
            font-size: 14px;
          }
          
          .price {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .menu-section {
            padding: 30px 15px;
            margin: 30px auto;
          }
          
          .menu-item {
            padding: 18px;
          }
          
          .menu-category h3 {
            font-size: 22px;
          }
          
          .menu-item-header h4 {
            font-size: 16px;
          }
          
          .menu-tab {
            padding: 8px 16px;
            font-size: 12px;
          }
        }

        /* ============================================
           CHEF SECTION
        ============================================ */
        .chef-section {
          background: linear-gradient(135deg, #f9f7f2 0%, #f0ede4 100%);
          border-radius: 20px;
          overflow: hidden;
        }

        .chef-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .chef-image {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .chef-image img {
          width: 100%;
          height: 500px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .chef-image:hover img {
          transform: scale(1.03);
        }

        .chef-info h3 {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: var(--green);
          margin-bottom: 15px;
        }

        .chef-title {
          color: var(--red);
          font-size: 18px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .chef-bio {
          font-size: 16px;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 30px;
        }

        .chef-signature {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid rgba(214, 39, 59, 0.2);
        }

        .signature-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: var(--green);
          font-weight: 600;
          margin-bottom: 5px;
        }

        .signature-title {
          color: var(--red);
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* Responsive Chef */
        @media (max-width: 992px) {
          .chef-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .chef-image img {
            height: 400px;
          }
          
          .chef-info h3 {
            font-size: 32px;
          }
        }

        @media (max-width: 768px) {
          .chef-image img {
            height: 350px;
          }
          
          .chef-info h3 {
            font-size: 28px;
          }
          
          .chef-title {
            font-size: 16px;
          }
          
          .chef-bio {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .chef-image img {
            height: 300px;
          }
          
          .chef-info h3 {
            font-size: 24px;
          }
          
          .chef-title {
            font-size: 14px;
          }
          
          .chef-bio {
            font-size: 14px;
          }
        }

        /* ============================================
           RESERVATION SECTION
        ============================================ */
        .reservation-section {
          background: linear-gradient(rgba(31, 61, 43, 0.9), rgba(31, 61, 43, 0.9)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          color: white;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }

        .reservation-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(31, 61, 43, 0.8);
          z-index: 1;
        }

        .reservation-container {
          position: relative;
          z-index: 2;
        }

        .reservation-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .reservation-header h2 {
          color: white;
          font-size: 48px;
        }

        .reservation-header .subtitle {
          color: var(--red);
          font-size: 18px;
        }

        .reservation-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .reservation-info {
          padding-right: 30px;
        }

        .reservation-features {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 40px;
        }

        .reservation-feature {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--red);
          flex-shrink: 0;
        }

        .feature-text h4 {
          font-size: 20px;
          margin-bottom: 5px;
          color: white;
        }

        .feature-text p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .reservation-form {
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 15px;
          box-shadow: var(--shadow-lg);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--green);
          font-size: 14px;
        }

        .form-control {
          width: 100%;
          padding: 14px 20px;
          border: 2px solid rgba(31, 61, 43, 0.2);
          border-radius: 8px;
          font-size: 16px;
          transition: var(--transition);
          background: white;
          font-family: 'Inter', sans-serif;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(214, 39, 59, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .reservation-notice {
          font-size: 14px;
          color: var(--text-muted);
          margin-top: 20px;
          text-align: center;
        }

        /* Responsive Reservation */
        @media (max-width: 992px) {
          .reservation-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .reservation-info {
            padding-right: 0;
          }
          
          .reservation-header h2 {
            font-size: 42px;
          }
        }

        @media (max-width: 768px) {
          .reservation-form {
            padding: 30px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .reservation-header h2 {
            font-size: 36px;
          }
          
          .reservation-header .subtitle {
            font-size: 16px;
          }
          
          .feature-text h4 {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .reservation-form {
            padding: 25px;
          }
          
          .reservation-header h2 {
            font-size: 32px;
          }
          
          .feature-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }

        /* ============================================
           CONTACT SECTION
        ============================================ */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .contact-info-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: var(--shadow);
          border: 1px solid rgba(214, 39, 59, 0.1);
        }

        .contact-info-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: var(--green);
          margin-bottom: 30px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }

        .contact-detail {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          background: rgba(214, 39, 59, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: var(--red);
          flex-shrink: 0;
        }

        .contact-text h4 {
          font-size: 16px;
          margin-bottom: 5px;
          color: var(--green);
          font-weight: 600;
        }

        .contact-text p, .contact-text a {
          font-size: 15px;
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition);
        }

        .contact-text a:hover {
          color: var(--red);
        }

        .opening-hours {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid rgba(214, 39, 59, 0.1);
        }

        .opening-hours h4 {
          font-size: 18px;
          margin-bottom: 20px;
          color: var(--green);
        }

        .hours-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .hours-day {
          font-weight: 600;
          color: var(--text-dark);
        }

        .hours-time {
          color: var(--text-muted);
        }

        .map-container {
          height: 100%;
          min-height: 500px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: var(--shadow);
        }

        .map-container iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Responsive Contact */
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .map-container {
            min-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .contact-info-card {
            padding: 30px;
          }
          
          .contact-info-card h3 {
            font-size: 24px;
          }
          
          .contact-detail {
            gap: 15px;
          }
          
          .hours-grid {
            grid-template-columns: 1fr;
          }
          
          .map-container {
            min-height: 350px;
          }
        }

        @media (max-width: 480px) {
          .contact-info-card {
            padding: 25px;
          }
          
          .contact-info-card h3 {
            font-size: 22px;
          }
          
          .contact-icon {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .map-container {
            min-height: 300px;
          }
        }

        /* ============================================
           FOOTER
        ============================================ */
        .premium-footer {
          background: linear-gradient(135deg, var(--green) 0%, #2d5a42 100%);
          color: white;
          padding: 80px 0 40px;
          position: relative;
        }

        .footer-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 60px;
        }

        .footer-logo-col {
          grid-column: span 1;
        }

        .footer-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .footer-logo-img {
          width: 100px;
          height: 100px;
          margin-bottom: 15px;
        }

        .footer-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: white;
          line-height: 1;
        }

        .footer-subtitle {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 5px;
        }

        .footer-social {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: var(--transition);
          font-size: 18px;
        }

        .social-icon:hover {
          background: var(--red);
          transform: translateY(-3px);
        }

        .footer-col h4 {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          margin-bottom: 25px;
          color: white;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: var(--transition);
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-links a:hover {
          color: var(--red);
          padding-left: 5px;
        }

        .footer-links i {
          font-size: 12px;
        }

        .footer-newsletter {
          grid-column: span 1;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .newsletter-input {
          padding: 14px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 15px;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--red);
        }

        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }

        .footer-legal {
          display: flex;
          gap: 30px;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: var(--transition);
        }

        .footer-legal a:hover {
          color: var(--red);
        }

        /* Responsive Footer */
        @media (max-width: 992px) {
          .footer-container {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .footer-logo-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 768px) {
          .premium-footer {
            padding: 60px 0 30px;
          }
          
          .footer-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .footer-logo-col {
            grid-column: span 1;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .premium-footer {
            padding: 50px 0 25px;
          }
          
          .footer-logo-img {
            width: 80px;
            height: 80px;
          }
          
          .footer-logo-text {
            font-size: 20px;
          }
          
          .footer-col h4 {
            font-size: 18px;
          }
          
          .footer-legal {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }

        /* ============================================
           BACK TO TOP BUTTON
        ============================================ */
        .back-to-top {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: var(--red);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 20px;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
          z-index: 999;
          box-shadow: 0 4px 15px rgba(214, 39, 59, 0.3);
        }

        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
        }

        .back-to-top:hover {
          background: #b81e30;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(214, 39, 59, 0.4);
        }

        @media (max-width: 768px) {
          .back-to-top {
            bottom: 90px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
        }

        /* ============================================
           ANIMATIONS & UTILITIES
        ============================================ */
        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .slide-up {
            animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .staggered-item {
            opacity: 0;
            transform: translateY(20px);
        }

        .staggered-item.animate {
            animation: staggeredFadeIn 0.6s ease forwards;
        }

        @keyframes staggeredFadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Print Styles */
        @media print {
            .whatsapp-float,
            .back-to-top,
            .menu-tabs,
            .btn,
            .premium-hero-buttons {
                display: none !important;
            }
            
            body {
                background: white !important;
                color: black !important;
                font-size: 12pt;
            }
            
            .container {
                max-width: 100% !important;
                padding: 0 !important;
            }
            
            .hero-premium {
                min-height: auto !important;
                padding: 20px 0 !important;
            }
            
            .hero-bg {
                display: none !important;
            }
            
            .premium-hero-content {
                color: black !important;
                text-align: left !important;
            }
            
            section {
                padding: 20px 0 !important;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <!-- Italian Flag Stripes -->
    <div class="italian-flag-stripe top"></div>
    <div class="italian-flag-stripe bottom"></div>

    <!-- Loader -->
    <div class="loader" id="pageLoader">
        <div class="loader-logo">L'ARTISTA</div>
        <div class="loader-spinner"></div>
        <div class="loader-text">Fine Italian Dining</div>
    </div>

    <!-- Navigation - FIXED WITH PERFECTLY CENTERED LOGO -->
    <nav class="premium-navbar" id="navbar">
        <div class="nav-container">
            <!-- Left Navigation Links -->
            <ul class="nav-links left">
                <li><a href="#home" class="nav-link active">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#menu" class="nav-link">Menu</a></li>
            </ul>
            
            <!-- CENTER Logo with Red Circle Border -->
            <a href="#home" class="logo-center">
                <div class="custom-logo nav-logo">
                    <img src="https://i.imgur.com/7YYvNWl.png" alt="L'ARTISTA Restaurant Logo" onerror="this.parentNode.innerHTML='<div class=\'logo-fallback\'>L\'ARTISTA</div>';">
                </div>
            </a>
            
            <!-- Right Navigation Links -->
            <ul class="nav-links right">
                <li><a href="#chef" class="nav-link">Our Chef</a></li>
                <li><a href="#reservation" class="nav-link">Reservations</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            
            <!-- Mobile Menu Toggle -->
            <button class="menu-toggle" id="mobileMenuToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div class="premium-mobile-menu" id="mobileMenu">
        <div class="mobile-menu-header">
            <div class="mobile-logo">L'ARTISTA</div>
            <button class="mobile-menu-close" id="mobileMenuClose">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <ul class="nav-links">
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#menu" class="nav-link">Menu</a></li>
            <li><a href="#chef" class="nav-link">Our Chef</a></li>
            <li><a href="#reservation" class="nav-link">Reservations</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
        <div class="mobile-menu-footer">
            <a href="tel:+37112345678" class="btn btn-red btn-block">
                <i class="fas fa-phone-alt"></i> Call Us
            </a>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero-premium" id="home">
        <div class="hero-bg">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80" alt="L'ARTISTA Restaurant Interior - Fine Dining Italian Restaurant">
        </div>
        <div class="premium-overlay"></div>
        
        <div class="container">
            <div class="premium-hero-content">
                <div class="premium-logo-container">
                    <div class="custom-logo premium-hero-logo">
                        <img src="https://i.imgur.com/7YYvNWl.png" alt="L'ARTISTA Restaurant Logo" onerror="this.parentNode.innerHTML='<div class=\'logo-fallback hero-fallback\'>L\'ARTISTA</div>';">
                    </div>
                </div>
                
                <div class="premium-title">
                    <span class="title-line-1">L'ARTISTA</span>
                    <span class="title-line-2">Fine Italian Dining</span>
                </div>
                
                <p class="premium-subtitle">Riga's Premier Authentic Italian Experience</p>
                
                <p class="premium-tagline">
                    Indulge in the art of Italian cuisine where every dish tells a story. Experience culinary mastery with premium ingredients, authentic recipes, and impeccable service in the heart of Riga, Latvia.
                </p>
                
                <div class="premium-hero-buttons">
                    <a href="#reservation" class="btn btn-premium btn-large">
                        <i class="fas fa-calendar-alt"></i> Reserve a Table
                    </a>
                    <a href="#menu" class="btn btn-outline-premium btn-large">
                        <i class="fas fa-utensils"></i> View Our Menu
                    </a>
                </div>
                
                <div class="premium-scroll-indicator" onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})">
                    <span class="scroll-text">Discover More</span>
                    <i class="fas fa-chevron-down scroll-arrow"></i>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="container">
            <div class="section-header">
                <h2>Our Story</h2>
                <div class="subtitle">Authentic Italian Excellence</div>
                <div class="section-divider">
                    <div class="divider-line"></div>
                    <i class="fas fa-utensils divider-icon"></i>
                    <div class="divider-line"></div>
                </div>
            </div>
            
            <div class="premium-about-grid">
                <div class="premium-content">
                    <p class="premium-intro">
                        Established in 2015, <span class="highlight-red">L'ARTISTA</span> brings the authentic taste of Italy to the heart of Riga. Our restaurant is a celebration of Italy's rich culinary heritage, where passion meets perfection in every dish.
                    </p>
                    
                    <p class="premium-description">
                        Our philosophy is simple: to create unforgettable dining experiences using only the finest ingredients, traditional techniques, and a genuine love for Italian cuisine. From the sun-drenched hills of Tuscany to the coastal flavors of Sicily, our menu tells the story of Italy's diverse regions.
                    </p>
                    
                    <div class="premium-features-grid">
                        <div class="premium-feature-card">
                            <div class="premium-feature-icon">
                                <i class="fas fa-seedling"></i>
                            </div>
                            <h4>Fresh Ingredients</h4>
                            <p>Locally sourced produce and imported Italian specialties</p>
                        </div>
                        
                        <div class="premium-feature-card">
                            <div class="premium-feature-icon">
                                <i class="fas fa-wine-glass-alt"></i>
                            </div>
                            <h4>Fine Wine Selection</h4>
                            <p>Curated Italian wines to complement every dish</p>
                        </div>
                        
                        <div class="premium-feature-card">
                            <div class="premium-feature-icon">
                                <i class="fas fa-award"></i>
                            </div>
                            <h4>Award-Winning</h4>
                            <p>Recognized for culinary excellence and service</p>
                        </div>
                    </div>
                </div>
                
                <div class="premium-about-image">
                    <div class="image-frame">
                        <video autoplay loop muted playsinline>
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-cooking-pasta-in-a-pan-4452-large.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="image-caption">Chef Marco preparing our signature pasta dishes</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Menu Section -->
    <section class="menu-section" id="menu">
        <div class="container">
            <div class="section-header">
                <h2>Our Menu</h2>
                <div class="subtitle">Culinary Masterpieces</div>
                <div class="section-divider">
                    <div class="divider-line"></div>
                    <i class="fas fa-pepper-hot divider-icon"></i>
                    <div class="divider-line"></div>
                </div>
            </div>
            
            <div class="menu-tabs">
                <button class="menu-tab active" data-category="antipasti">Antipasti</button>
                <button class="menu-tab" data-category="primi">Primi Piatti</button>
                <button class="menu-tab" data-category="secondi">Secondi Piatti</button>
                <button class="menu-tab" data-category="dolci">Dolci</button>
                <button class="menu-tab" data-category="vini">Vini & Beverages</button>
            </div>
            
            <!-- Antipasti Category -->
            <div class="menu-category active" id="antipasti">
                <h3><i class="fas fa-cheese"></i> Antipasti</h3>
                <div class="menu-items-container">
                    <!-- Menu Item 1 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Burrata with Heirloom Tomatoes</h4>
                                <span class="allergy">1.8</span>
                            </div>
                            <p class="menu-desc">Fresh Italian burrata served with organic heirloom tomatoes, basil pesto, extra virgin olive oil, and aged balsamic reduction.</p>
                            <div class="price">€18</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 2 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Carpaccio di Manzo</h4>
                                <span class="allergy">1.7.8</span>
                            </div>
                            <p class="menu-desc">Paper-thin sliced beef tenderloin with arugula, Parmigiano-Reggiano shavings, capers, and lemon-truffle dressing.</p>
                            <div class="price">€22</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 3 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Bruschetta Tricolore</h4>
                                <span class="allergy">1.7</span>
                            </div>
                            <p class="menu-desc">Trio of traditional Italian bruschetta: tomato-basil, mushroom-truffle, and roasted pepper-ricotta on artisanal bread.</p>
                            <div class="price">€16</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 4 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Prosciutto e Melone</h4>
                                <span class="allergy">8</span>
                            </div>
                            <p class="menu-desc">Premium Parma ham served with fresh cantaloupe melon and drizzled with aged balsamic glaze.</p>
                            <div class="price">€20</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 5 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Calamari Fritti</h4>
                                <span class="allergy">1.2.4</span>
                            </div>
                            <p class="menu-desc">Crispy fried squid served with lemon aioli and spicy marinara sauce.</p>
                            <div class="price">€19</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Primi Piatti Category -->
            <div class="menu-category" id="primi">
                <h3><i class="fas fa-pasta"></i> Primi Piatti</h3>
                <div class="menu-items-container">
                    <!-- Menu Item 1 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Spaghetti Carbonara</h4>
                                <span class="allergy">1.3.7</span>
                            </div>
                            <p class="menu-desc">Classic Roman pasta with eggs, Pecorino Romano cheese, pancetta, and black pepper.</p>
                            <div class="price">€24</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 2 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Truffle Risotto</h4>
                                <span class="allergy">1.7.12</span>
                            </div>
                            <p class="menu-desc">Arborio rice cooked with black truffle, Parmigiano-Reggiano, and white wine.</p>
                            <div class="price">€28</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 3 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Lasagna Bolognese</h4>
                                <span class="allergy">1.3.7</span>
                            </div>
                            <p class="menu-desc">Traditional Emilia-Romagna style lasagna with slow-cooked beef ragù and besciamella.</p>
                            <div class="price">€26</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 4 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Gnocchi al Pomodoro</h4>
                                <span class="allergy">1.7</span>
                            </div>
                            <p class="menu-desc">Homemade potato gnocchi with San Marzano tomato sauce and fresh basil.</p>
                            <div class="price">€22</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Secondi Piatti Category -->
            <div class="menu-category" id="secondi">
                <h3><i class="fas fa-drumstick-bite"></i> Secondi Piatti</h3>
                <div class="menu-items-container">
                    <!-- Menu Item 1 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Filetto di Manzo</h4>
                                <span class="allergy">7.9</span>
                            </div>
                            <p class="menu-desc">Grilled beef tenderloin with red wine reduction, roasted potatoes, and seasonal vegetables.</p>
                            <div class="price">€38</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 2 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Branzino al Forno</h4>
                                <span class="allergy">2.4</span>
                            </div>
                            <p class="menu-desc">Whole roasted Mediterranean sea bass with lemon, herbs, and olive oil.</p>
                            <div class="price">€32</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 3 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Osso Buco alla Milanese</h4>
                                <span class="allergy">1.7.9</span>
                            </div>
                            <p class="menu-desc">Braised veal shanks with saffron risotto and gremolata.</p>
                            <div class="price">€36</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Dolci Category -->
            <div class="menu-category" id="dolci">
                <h3><i class="fas fa-ice-cream"></i> Dolci</h3>
                <div class="menu-items-container">
                    <!-- Menu Item 1 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Tiramisu</h4>
                                <span class="allergy">1.3.7</span>
                            </div>
                            <p class="menu-desc">Classic Italian dessert with ladyfingers soaked in espresso and layered with mascarpone cream.</p>
                            <div class="price">€12</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 2 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Panna Cotta</h4>
                                <span class="allergy">7</span>
                            </div>
                            <p class="menu-desc">Vanilla cream pudding with mixed berry compote.</p>
                            <div class="price">€10</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 3 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Cannoli Siciliani</h4>
                                <span class="allergy">1.3.7</span>
                            </div>
                            <p class="menu-desc">Crispy pastry tubes filled with sweet ricotta cream and pistachios.</p>
                            <div class="price">€11</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Vini & Beverages Category -->
            <div class="menu-category" id="vini">
                <h3><i class="fas fa-wine-glass-alt"></i> Vini & Beverages</h3>
                <div class="menu-items-container">
                    <!-- Menu Item 1 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Chianti Classico</h4>
                                <span class="allergy"></span>
                            </div>
                            <p class="menu-desc">Tuscany, Italy - Sangiovese blend</p>
                            <div class="price">€45</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 2 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Prosecco Brut</h4>
                                <span class="allergy"></span>
                            </div>
                            <p class="menu-desc">Veneto, Italy - Sparkling white wine</p>
                            <div class="price">€38</div>
                        </div>
                    </div>
                    
                    <!-- Menu Item 3 -->
                    <div class="menu-item">
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h4>Negroni</h4>
                                <span class="allergy"></span>
                            </div>
                            <p class="menu-desc">Classic Italian cocktail with gin, Campari, and sweet vermouth</p>
                            <div class="price">€14</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="menu-cta">
                <h3>Full Menu Available</h3>
                <p>Explore our complete menu featuring authentic Italian dishes crafted with passion and expertise.</p>
                <div class="button-group">
                    <a href="#contact" class="btn btn-premium">
                        <i class="fas fa-download"></i> Download Menu PDF
                    </a>
                    <a href="#reservation" class="btn btn-outline-premium">
                        <i class="fas fa-phone-alt"></i> Call to Inquire
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Chef Section -->
    <section class="chef-section" id="chef">
        <div class="container">
            <div class="section-header">
                <h2>Our Master Chef</h2>
                <div class="subtitle">The Artist Behind the Cuisine</div>
                <div class="section-divider">
                    <div class="divider-line"></div>
                    <i class="fas fa-chef-hat divider-icon"></i>
                    <div class="divider-line"></div>
                </div>
            </div>
            
            <div class="chef-grid">
                <div class="chef-image">
                    <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chef Marco Lombardi - Master Chef at L'ARTISTA">
                </div>
                
                <div class="chef-info">
                    <h3>Chef Marco Lombardi</h3>
                    <div class="chef-title">Executive Chef & Founder</div>
                    
                    <p class="chef-bio">
                        Born and raised in Florence, Chef Marco brings over 25 years of culinary experience to L'ARTISTA. Trained in some of Italy's most prestigious kitchens, including Michelin-starred restaurants in Tuscany and Rome, Chef Marco's philosophy is rooted in tradition yet embraces innovation.
                    </p>
                    
                    <p class="chef-bio">
                        "For me, cooking is not just about feeding people—it's about creating memories. Every dish at L'ARTISTA tells a story of my heritage, my travels, and my passion for authentic Italian flavors."
                    </p>
                    
                    <div class="chef-signature">
                        <div class="signature-name">Marco Lombardi</div>
                        <div class="signature-title">Executive Chef & Founder</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reservation Section -->
    <section class="reservation-section" id="reservation">
        <div class="reservation-overlay"></div>
        <div class="container reservation-container">
            <div class="reservation-header">
                <h2>Reserve Your Table</h2>
                <div class="subtitle">Experience Culinary Excellence</div>
                <div class="section-divider">
                    <div class="divider-line"></div>
                    <i class="fas fa-calendar-alt divider-icon"></i>
                    <div class="divider-line"></div>
                </div>
            </div>
            
            <div class="reservation-content">
                <div class="reservation-info">
                    <div class="reservation-features">
                        <div class="reservation-feature">
                            <div class="feature-icon">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="feature-text">
                                <h4>Opening Hours</h4>
                                <p>Monday - Sunday: 5:00 PM - 11:00 PM</p>
                            </div>
                        </div>
                        
                        <div class="reservation-feature">
                            <div class="feature-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="feature-text">
                                <h4>Group Reservations</h4>
                                <p>Special arrangements for parties of 8+ guests</p>
                            </div>
                        </div>
                        
                        <div class="reservation-feature">
                            <div class="feature-icon">
                                <i class="fas fa-wine-glass-alt"></i>
                            </div>
                            <div class="feature-text">
                                <h4>Wine Tasting Events</h4>
                                <p>Monthly curated wine pairing dinners</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-info">
                        <p>For same-day reservations or special requests, please call us directly:</p>
                        <a href="tel:+37112345678" class="btn btn-premium">
                            <i class="fas fa-phone-alt"></i> +371 12 345 678
                        </a>
                    </div>
                </div>
                
                <div class="reservation-form">
                    <form id="bookingForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Full Name *</label>
                                <input type="text" id="name" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" class="form-control" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="guests">Number of Guests *</label>
                                <select id="guests" class="form-control" required>
                                    <option value="">Select...</option>
                                    <option value="1">1 Person</option>
                                    <option value="2">2 People</option>
                                    <option value="3">3 People</option>
                                    <option value="4">4 People</option>
                                    <option value="5">5 People</option>
                                    <option value="6">6 People</option>
                                    <option value="7">7 People</option>
                                    <option value="8">8 People</option>
                                    <option value="9+">9+ People (Special Arrangement)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="date">Preferred Date *</label>
                                <input type="date" id="date" class="form-control" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="time">Preferred Time *</label>
                                <select id="time" class="form-control" required>
                                    <option value="">Select...</option>
                                    <option value="17:00">5:00 PM</option>
                                    <option value="17:30">5:30 PM</option>
                                    <option value="18:00">6:00 PM</option>
                                    <option value="18:30">6:30 PM</option>
                                    <option value="19:00">7:00 PM</option>
                                    <option value="19:30">7:30 PM</option>
                                    <option value="20:00">8:00 PM</option>
                                    <option value="20:30">8:30 PM</option>
                                    <option value="21:00">9:00 PM</option>
                                    <option value="21:30">9:30 PM</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="special-requests">Special Requests</label>
                            <textarea id="special-requests" class="form-control" rows="4" placeholder="Dietary restrictions, allergies, celebrations, etc."></textarea>
                        </div>
                        
                        <button type="submit" class="btn btn-red btn-block">
                            <i class="fas fa-paper-plane"></i> Make Reservation
                        </button>
                        
                        <p class="reservation-notice">
                            * We will contact you within 24 hours to confirm your reservation.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section" id="contact">
        <div class="container">
            <div class="section-header">
                <h2>Contact Us</h2>
                <div class="subtitle">Visit Our Restaurant</div>
                <div class="section-divider">
                    <div class="divider-line"></div>
                    <i class="fas fa-map-marker-alt divider-icon"></i>
                    <div class="divider-line"></div>
                </div>
            </div>
            
            <div class="contact-grid">
                <div class="contact-info-card">
                    <h3>Get in Touch</h3>
                    
                    <div class="contact-details">
                        <div class="contact-detail">
                            <div class="contact-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-text">
                                <h4>Address</h4>
                                <p>Elizabetes iela 123<br>Centra rajons, Rīga<br>LV-1010, Latvia</p>
                            </div>
                        </div>
                        
                        <div class="contact-detail">
                            <div class="contact-icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <div class="contact-text">
                                <h4>Phone</h4>
                                <a href="tel:+37112345678">+371 12 345 678</a>
                            </div>
                        </div>
                        
                        <div class="contact-detail">
                            <div class="contact-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-text">
                                <h4>Email</h4>
                                <a href="mailto:reservations@lartista.lv">reservations@lartista.lv</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="opening-hours">
                        <h4>Opening Hours</h4>
                        <div class="hours-grid">
                            <div class="hours-day">Monday - Thursday</div>
                            <div class="hours-time">5:00 PM - 10:30 PM</div>
                            
                            <div class="hours-day">Friday - Saturday</div>
                            <div class="hours-time">5:00 PM - 11:30 PM</div>
                            
                            <div class="hours-day">Sunday</div>
                            <div class="hours-time">5:00 PM - 10:00 PM</div>
                        </div>
                    </div>
                </div>
                
                <div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.318064459008!2d24.105215576812966!3d56.960328202720524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eecfb0e5073b69%3A0x400fcd3f2bbba0!2sRiga%2C%20Latvia!5e0!3m2!1sen!2s!4v1691417606399!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="premium-footer">
        <div class="container">
            <div class="footer-container">
                <div class="footer-logo-col">
                    <div class="footer-logo">
                        <div class="custom-logo footer-logo-img">
                            <img src="https://i.imgur.com/7YYvNWl.png" alt="L'ARTISTA Restaurant Logo" onerror="this.parentNode.innerHTML='<div class=\'logo-fallback\'>L\'ARTISTA</div>';">
                        </div>
                        <div class="footer-logo-text">L'ARTISTA</div>
                        <div class="footer-subtitle">Fine Italian Dining</div>
                    </div>
                    
                    <div class="footer-social">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-tripadvisor"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="#home"><i class="fas fa-chevron-right"></i> Home</a></li>
                        <li><a href="#menu"><i class="fas fa-chevron-right"></i> Menu</a></li>
                        <li><a href="#chef"><i class="fas fa-chevron-right"></i> Our Chef</a></li>
                        <li><a href="#reservation"><i class="fas fa-chevron-right"></i> Reservations</a></li>
                    </ul>
                </div>
                
                <div class="footer-col">
                    <h4>Information</h4>
                    <ul class="footer-links">
                        <li><a href="#about"><i class="fas fa-chevron-right"></i> About Us</a></li>
                        <li><a href="#contact"><i class="fas fa-chevron-right"></i> Contact</a></li>
                        <li><a href="#"><i class="fas fa-chevron-right"></i> Privacy Policy</a></li>
                        <li><a href="#"><i class="fas fa-chevron-right"></i> Terms of Service</a></li>
                    </ul>
                </div>
                
                <div class="footer-newsletter">
                    <h4>Newsletter</h4>
                    <p>Subscribe for exclusive updates, events, and special offers.</p>
                    <form class="newsletter-form">
                        <input type="email" class="newsletter-input" placeholder="Your email address" required>
                        <button type="submit" class="btn btn-red">
                            <i class="fas fa-paper-plane"></i> Subscribe
                        </button>
                    </form>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="copyright">
                    © 2023 L'ARTISTA Fine Italian Dining. All rights reserved.
                </div>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Float Button -->
    <a href="https://wa.me/37112345678?text=Hello%20L'ARTISTA%20Restaurant,%20I'd%20like%20to%20make%20a%20reservation" class="whatsapp-float" target="_blank" aria-label="Contact us on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <!-- Back to Top Button -->
    <a href="#home" class="back-to-top" id="backToTop" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </a>

    <!-- JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Page Loader
            window.addEventListener('load', function() {
                setTimeout(function() {
                    document.getElementById('pageLoader').style.opacity = '0';
                    document.getElementById('pageLoader').style.visibility = 'hidden';
                }, 800);
            });

            // Navigation Scroll Effect
            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Mobile Menu Toggle
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuClose = document.getElementById('mobileMenuClose');

            mobileMenuToggle.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });

            // Close mobile menu when clicking on a link
            const mobileLinks = document.querySelectorAll('.premium-mobile-menu .nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Menu Tab Switching
            const menuTabs = document.querySelectorAll('.menu-tab');
            const menuCategories = document.querySelectorAll('.menu-category');

            menuTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    menuTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Hide all menu categories
                    menuCategories.forEach(category => {
                        category.classList.remove('active');
                    });
                    
                    // Show selected category
                    const categoryId = this.getAttribute('data-category');
                    document.getElementById(categoryId).classList.add('active');
                });
            });

            // Back to Top Button
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            // Smooth Scrolling for Navigation Links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Update active nav link
                        document.querySelectorAll('.nav-link').forEach(link => {
                            link.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Scroll to target
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Form Submission
            const bookingForm = document.getElementById('bookingForm');
            if (bookingForm) {
                bookingForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form values
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const phone = document.getElementById('phone').value;
                    const guests = document.getElementById('guests').value;
                    const date = document.getElementById('date').value;
                    const time = document.getElementById('time').value;
                    
                    // Here you would typically send this data to a server
                    // For now, we'll just show an alert
                    alert(`Thank you, ${name}! Your reservation request for ${guests} guests on ${date} at ${time} has been received. We will contact you at ${phone} or ${email} to confirm.`);
                    
                    // Reset form
                    bookingForm.reset();
                });
            }

            // Set minimum date for reservation to today
            const dateInput = document.getElementById('date');
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.min = today;
            }

            // Newsletter Form
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('.newsletter-input');
                    alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our updates soon.`);
                    emailInput.value = '';
                });
            }

            // Staggered Animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, observerOptions);

            // Observe elements for staggered animations
            document.querySelectorAll('.staggered-item').forEach(item => {
                observer.observe(item);
            });
        });
    </script>
</body>
</html>
