const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const pagination = require('metalsmith-pagination')
const metadata = require('metalsmith-metadata')
const markdown = require('metalsmith-markdown')
const collections = require('metalsmith-collections')
const watch = require('metalsmith-watch')
const collectionMetadata = require('metalsmith-collection-metadata')
const msIf = require('metalsmith-if');
const htmlMinifier = require("metalsmith-html-minifier");

const marked = require('marked');
const tag = require('html-tag');

const isDevelopment = process.env.NODE_ENV == 'development';

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .metadata({
    environment: isDevelopment ? 'development' : 'production',
    markdown: marked,
    tagGenerator({ tagName, attributes, content }) {
      return tag(tagName, attributes, content);
    }
  })
  .use(msIf(
    isDevelopment,
    watch({
      paths: {
        "src/**/*": "**/*",
        "layouts/**/*": "**/*",
      },
      livereload: isDevelopment
    })
  ))
  .use(metadata({
    settings: 'data/settings.yml'
  }))
  .use(markdown())
  .use(collections({
    works: {
      pattern: 'works/*.html',
      sortBy: 'position',
    }
  }))
  .use(collectionMetadata({
    'collections.works': {
      layout: 'work.ejs',
    },
  }))
  .use(pagination({
    'collections.works': {
      perPage: 5,
      layout: 'works.ejs',
      first: 'index.html',
      path: 'works/page/:num/index.html',
    }
  }))
  .use(layouts())
  .use(htmlMinifier())
  .build(function(err, files) {
    if (err) { throw err; }
  });
