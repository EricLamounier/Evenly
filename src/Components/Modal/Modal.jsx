import './Modal.css';

export default function Modal(props) {

    return (
        <div className={`authModal ${props.className}`}>
            <p>{props.message}</p>
        </div>
    )
}