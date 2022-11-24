import { async } from '@firebase/util';
import {React, useEffect, useState} from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebase';
import {useNavigate} from "react-router-dom";
import '../Stylesheets/Login.css';

function BookReview({ isAuth }) {
  const [reviewtext, setReviewText] = useState("");
  const [bookname, setBookName] = useState("");
  const [reviewername, setReviewerName] = useState("");
  const [bookimage, setBookImage] = useState("");
  const [amazonlink, setAmazonLink] = useState("");
  const [flipkartlink, setFlipkartLink] = useState("");
  const reviewscollection = collection(db, "reviews");
  let navigate = useNavigate({});
  const addReview = async () => {
    await addDoc(reviewscollection, { bookname, reviewername, reviewtext, bookimage, amazonlink, flipkartlink });
      localStorage.setItem("isAuth", true);
      // setIsAuth(true);
      navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className='main' style={{}}>
        <div className='box reviewbox' style={{position:'fixed', top:100, overflow:'auto'}}>
          <h1>Write A Book Review</h1>
          <form>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Book Name'
                onChange={(e) => setBookName(e.target.value)}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Reviewer Name'
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Book Image URL'
                onChange={(e) => setBookImage(e.target.value)}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Amazon Link'
                onChange={(e) => setAmazonLink(e.target.value)}
                required
              />
            </div>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Flipkart Link'
                onChange={(e) => setFlipkartLink(e.target.value)}
                required
              />
            </div>
            <div className='form-control'>
              <textarea
                type='text'
                placeholder='Book Review'
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>
              <button className='signinbutton' onClick={addReview}>
                Submit Review
              </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookReview;
