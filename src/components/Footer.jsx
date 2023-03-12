import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <p>My Web Design, Copyright © {new Date().toLocaleDateString()} </p>
    </footer>
  );
};

export default Footer;
