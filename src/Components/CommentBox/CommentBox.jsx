import './CommentBox.css';
import person from '../../Images/icons/plus.svg';
import { useState, useEffect } from 'react';

export default function CommentBox(props){

    return (
        <div className='commentBox'>
            <div className='userImg'>
                <img src={person} alt='person img'/>
            </div>
            <div className='personInfo'>
                <p className='userName'>{props.user}</p>
                <p className='commentText'>{props.comment}</p>
            </div>
        </div>
    );
}