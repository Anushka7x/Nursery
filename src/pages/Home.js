// === src/pages/Home.js ===
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
  { name: 'Plants', image: 'https://cdn.pixabay.com/photo/2023/09/05/10/00/plant-8234767_1280.jpg' },
  { name: 'Seeds', image: 'https://cdn.pixabay.com/photo/2016/03/23/15/15/flax-seed-1274944_1280.jpg' },
  { name: 'Pots', image: 'https://cdn.pixabay.com/photo/2022/04/07/18/31/pots-7118124_1280.jpg' },
  { name: 'Flowers', image: 'https://cdn.pixabay.com/photo/2016/02/29/20/17/roses-1229148_1280.jpg' },
  { name: 'Decor', image: 'https://cdn.pixabay.com/photo/2019/06/28/16/02/subject-4304429_1280.jpg' },
];

const reviews = [
  {
    name: 'Aarav S.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    comment: 'Excellent quality plants and pots. Everything arrived fresh!',
  },
  {
    name: 'Nisha R.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    comment: 'Seeds sprouted in just a few days. Highly recommended!',
  },
  {
    name: 'Rohit K.',
    image: 'https://randomuser.me/api/portraits/men/14.jpg',
    comment: 'Amazing service and beautiful plant decor. Love the variety.',
  },
];

const faqs = [
  { question: 'How are the plants delivered?', answer: 'All plants are packed carefully in eco-friendly boxes and delivered safely.' },
  { question: 'Do you offer COD?', answer: 'Yes, we provide Cash on Delivery for most orders.' },
  { question: 'Can I return a damaged item?', answer: 'Absolutely! Just contact our support within 48 hours of delivery.' },
];

const Home = () => {
  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  return (
    <div className="home-container">
      {/* Carousel */}
      <section className="carousel-section">
        <Slider {...sliderSettings}>
          <div className="carousel-slide">
            <img src="https://cdn.pixabay.com/photo/2023/04/30/10/05/philodendron-7960228_1280.jpg" alt="Slide 1" />
            <div className="carousel-text">Bring Nature Home 🌿</div>
          </div>
          <div className="carousel-slide">
            <img src="https://cdn.pixabay.com/photo/2023/05/30/08/06/planting-8027884_1280.jpg" alt="Slide 2" />
            <div className="carousel-text">Grow Your Garden Today 🌱</div>
          </div>
          <div className="carousel-slide">
            <img src="https://cdn.pixabay.com/photo/2023/07/29/16/48/green-leaves-8157318_1280.jpg" alt="Slide 3" />
            <div className="carousel-text">Fresh Vibes, Happy Plants 🌼</div>
          </div>
        </Slider>
      </section>

      {/* Categories */}
      <section className="category-section">
        <h2>Explore by Category</h2>
        <div className="category-grid">
          {categories.map((cat, idx) => (
            <Link to={`/shop?category=${cat.name}`} className="category-card" key={idx}>
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="review-section">
        <h2>What Our Customers Say 💚</h2>
        <div className="review-grid">
          {reviews.map((rev, idx) => (
            <div className="review-card" key={idx}>
              <img src={rev.image} alt={rev.name} />
              <p>"{rev.comment}"</p>
              <h4>– {rev.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="faq-section">
        <h2>Frequently Asked Questions ❓</h2>
        <div className="faq-grid">
          {faqs.map((faq, idx) => (
            <details key={idx}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-columns">
          <div>
            <h4>About Paradise Nursery</h4>
            <p>Your one-stop shop for green happiness – plants, pots, decor and more!</p>
          </div>
          <div>
            <h4>Connect</h4>
            <p>Email: hello@paradisenursery.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>Instagram | Facebook | YouTube</p>
          </div>
        </div>
        <p className="footer-bottom">© 2024 Paradise Nursery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
