require('babel-register')({
  presets: ['es2015', 'react'],
});
const Sitemap = require('react-router-sitemap').default;
const router = require('./router').default;

new Sitemap(router).build('https://pev-cee.fr/').save('./public/sitemap.xml');
