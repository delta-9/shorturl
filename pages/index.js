import React from 'react';
import Head from 'next/head';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import ShortUrlForm from '../components/ShortUrlForm';

const Home = () => (
  <div>
    <Head>
      <title>Short url - Makes your long url ... short!</title>
      <link rel="icon" href="/static/favicon.ico" importance="low" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
      <meta name="google-site-verification" content="6WwuAgC99fQOT--_qTu7A4AtTM5UlYWebn4ypsamfM4" />
    </Head>

    <div className="hero">
      <h1 className="title">Welcome to short url 🏋️</h1>
      <p className="description">Makes your long url ... short!</p>
      <section className="content">
        <ShortUrlForm />
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
        font-size: 38px;
      }
      .title,
      .description {
        text-align: center;
      }
      section.content {
        width: 100%;
        max-width: 800px;
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
        padding: 7px 20px;
        font-size: 18px;
        border: 0;
        margin: auto;
        border-radius: 3px;
      }
      input {
        border-radius: 3px;
        width: 100%;
        margin: auto;
        display: inline-block;
        padding: 7px 10px;
        font-size: 14px;
        height: 41px;
      }
    `}</style>
  </div>
);

export default Home;
