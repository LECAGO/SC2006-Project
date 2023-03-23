import './MainFooter.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainFooter() {
    return (
        <footer className="custom-footer">
            <table class="footer-links">
            <tr>
                <td>
                    <a class="footer-link-text" href="/contact">Contact</a>
                </td>
                <td>
                    <a class="footer-link-text" href="/feedback">Feedback</a>
                </td>
            </tr>
            </table>
            <p class="copyright-text">Copyright © 2023 Cirno Team</p>
      </footer>
    )
}

export default MainFooter;  