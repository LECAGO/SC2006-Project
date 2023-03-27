import './MainFooter.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MainFooter() {
    return (
        <footer className="custom-footer">
            <table className="footer-links">
                <tbody>
                    <tr>
                        <td>
                            <a className="footer-link-text" href="/contact">Contact</a>
                        </td>
                        <td>
                            <a className="footer-link-text" href="/feedback">Feedback</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className="copyright-text">Copyright © 2023 Cirno Team</p>
      </footer>
    )
}

export default MainFooter;  