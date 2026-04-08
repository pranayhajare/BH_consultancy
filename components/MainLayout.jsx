import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* We add a div with padding-top or a uniform wrapper for standalone pages, 
          since Hero usually handles the top padding on the home page. 
          Assuming the standalone pages might get eaten by the fixed navbar.
          But we can just pass children directly, as individual components might 
          handle their own padding. Navbar is fixed, so let's wrap children in main. */}
      {children}
      <Footer />
    </>
  );
}
