import { React, useEffect, useState } from 'react';
import { collection, doc, getDocs } from'firebase/firestore';
import { db } from '../firebase';
import {AiOutlineAmazon} from 'react-icons/ai';
import {SiFlipkart} from 'react-icons/si';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {
  const [reviewsList, setReviewsList] = useState([]);
  const reviewsCollectionRef = collection(db, "reviews");
  useEffect(() => {
    getDocs(reviewsCollectionRef).then((querySnapshot) => {
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push(doc.data());
      });
      setReviewsList(reviews);
    });
  }, []);

  return (
    <>
      {/* <div> */}
        <div style={{display:'flex', flexDirection:'column', backgroundColor:'#4c6c82', height:'100vh', overflow:'auto'}}>
          <h1 style={{textAlign:'center', color:'white', marginTop:10}}>Book Reviews</h1>
          <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
          {reviewsList.map((review) => (
            // <div className="review">
            //    <h2>{review.bookname}</h2>
            //    <h3>{review.reviewername}</h3>
            //    {/* <img src={review.bookimage} alt="book" height={300} width={300}/> */}
            //    <p>{review.reviewtext}</p>
            //    <a href={review.amazonlink}><AiOutlineAmazon /></a>
            //   <a href={review.flipkartlink}><SiFlipkart /></a>
            //  </div>
            <Card text="light" style={{ width: '300', backgroundColor:'#435564', margin:'10px' }}>
      <Card.Img variant="top" src={review.bookimage} height={300} width={300} />
      <Card.Body>
        <Card.Title>{review.bookname}</Card.Title>
        <Card.Text style={{width:300, height:250, overflow:'auto'}}>
          {review.reviewtext}
        </Card.Text>
        <Card.Text style={{textAlign:'right'}}>
          Reviewer: {review.reviewername}
        </Card.Text>
        <div style={{display:'flex', justifyContent:'center'}}>
        <a href={review.amazonlink}><Button variant="primary" style={{marginRight:5}}><AiOutlineAmazon /></Button></a>
        <a href={review.flipkartlink}><Button variant="primary" style={{marginRight:5}}><SiFlipkart /></Button></a>
        </div>
      </Card.Body>
    </Card>
          ))}
          </div>
        </div>
      {/* </div> */}
    </>
  );
  }
export default Home;
