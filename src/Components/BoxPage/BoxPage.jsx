import './BoxPages.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
export default function BoxPage(props) {

    const className = props.className || 'boxPage';

    return (
        <div className={`${className} boxPage`}>
            <Header el={1} />
            <hr />
            <div className='content'>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}