const fs = require('fs');
const policies = require('./robots-txt.config');
require('babel-register')({
  presets: ['es2015', 'react'],
});

{
  const { allow } = policies.policy;
  const disAllow = policies.policy.disallow;
  const { host } = policies.policy;
  const { sitemap } = policies.policy;

  const path = './public/robots.txt';

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  // use public folder for react
  const robotstxt = fs.createWriteStream(path, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });

  robotstxt.write(`User-agent: ${policies.policy.userAgent}\n`);

  disAllow.forEach((item) => {
    robotstxt.write(`Disallow: ${item}\n`);
  });

  allow.forEach((item) => {
    robotstxt.write(`Allow: ${item}\n`);
  });

  robotstxt.write(`Sitemap: ${sitemap}\n`);

  robotstxt.write(`Host: ${host}\n`);

  robotstxt.end();
}
