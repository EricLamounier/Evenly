import './Modal.css';

export default function Modal(props) {
    const {className, message} = props
    return (
        <div className={`authModal ${className}`}>
           {message && <p>{message}</p>} 
        </div>
    )
}