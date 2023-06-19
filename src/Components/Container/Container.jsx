import './Container.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Container(props){
    
    return (
        <div id="authContainer" className={props.className}>
            <Header/>
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}