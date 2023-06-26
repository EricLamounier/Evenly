import './BoxPages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export default function BoxPage(props) {
    return (
        <div className='boxPage'>
            <Header el={1} />
            <hr />
            <div className='content'>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}