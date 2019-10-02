import React from 'react';
import Head from 'next/head';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import Create from '../components/Create';

const Home = () => (
  <div>
    <Head>
      <title>Short url service</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
      <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
    </Head>

    <div className="hero">
      <h1 className="title">Welcome to short url 🏋️ !</h1>
      <p className="description">Makes your long url ... short</p>
      <section className="content">
        <Create />
      </section>
    </div>

    <style jsx>{`
      body,
      html {
        width: 100%;
        font-size: 0.875rem;
      }
      * {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        box-sizing: border-box;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 40px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      section.content {
        width: 100%;
        max-width: 1000px;
        margin: 40px auto;
        padding: 0 20px;
      }
    `}</style>
    <style jsx global>{`
      button {
        display: inline-block;
        cursor: pointer;
        text-align: center;
        background-color: #ccc;
        padding: 7px 10px;
        font-size: 18px;
        border: 0;
        margin: auto;
      }
    `}</style>
  </div>
);

export default Home;
