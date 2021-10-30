export default function Footer() {
  const time = new Date();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {time.getFullYear()} Mesto Russia</p>
    </footer>
  );
}
