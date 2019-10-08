// Arguments that will receive the mapping function:
//
// * dato: lets you easily access any content stored in your DatoCMS
//   administrative area;
//
// * root: represents the root of your project, and exposes commands to
//   easily create local files/directories;
//
// * i18n: allows to switch the current locale to get back content in
//   alternative locales from the first argument.
//
// Read all the details here:
// https://github.com/datocms/js-datocms-client/blob/master/docs/dato-cli.md

module.exports = (dato, root, i18n) => {

  // Create a YAML data file to store global data about the site
  root.createDataFile('src/data/settings.yml', 'yaml', {
    name: dato.site.globalSeo.siteName,
    language: dato.site.locales[0],
    intro: dato.home.introText,
    copyright: dato.home.copyright,
    // iterate over all the `social_profile` item types
    socialProfiles: dato.socialProfiles.map(profile => {
      return {
        type: profile.profileType.toLowerCase().replace(/ +/, '-'),
        url: profile.url,
      };
    }),
    faviconMetaTags: dato.site.faviconMetaTags,
    seoMetaTags: dato.home.seoMetaTags
  });

  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost(`src/about.md`, 'yaml', {
    frontmatter: {
      title: dato.aboutPage.title,
      subtitle: dato.aboutPage.subtitle,
      photo: dato.aboutPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      layout: 'about.ejs',
      seoMetaTags: dato.aboutPage.seoMetaTags,
    },
    content: dato.aboutPage.bio
  });

  // Create a `works` directory (or empty it if already exists)...
  root.directory('src/works', dir => {
    // ...and for each of the works stored online...
    dato.works.forEach((work, index) => {
      // ...create a markdown file with all the metadata in the frontmatter
      dir.createPost(`${work.slug}.md`, 'yaml', {
        frontmatter: {
          title: work.title,
          coverImage: work.coverImage.url({ w: 450, fm: 'jpg', auto: 'compress' }),
          detailImage: work.coverImage.url({ w: 600, fm: 'jpg', auto: 'compress' }),
          position: index,
          excerpt: work.excerpt,
          seoMetaTags: work.seoMetaTags,
          extraImages: work.gallery.map(image =>
            image.url({ h: 300, fm: 'jpg', auto: 'compress' })
          ),
        },
        content: work.description
      });
    });
  });
};
