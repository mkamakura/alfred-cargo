'use strict';

const got = require('got');

got('https://crates.io/api/v1/crates', {
  json: true,
  query: {
    page: 1,
    per_page: 10,
    q: process.argv[2],
  }
})
  .then(res => {
    const items = res.body.crates.filter(x => x.name.length > 1)
        .map(module => {
          return {
            title: `${module.name} ${module.max_version} (${module.downloads})`,
            subtitle: module.description,
            arg: `https://crates.io/crates/${module.name}`,
            mods: {
              alt: {
                arg: `https://crates.io/crates/${module.name}`,
                  subtitle: 'Open the cargo page'
                }
            },
            quicklookurl: `https://crates.io/crates/${module.name}`
          };
        });
    console.log(JSON.stringify({items}));
  })
  .catch(err => {
	  console.log(JSON.stringify({
		  items: [{
		  	title: err.name,
			  subtitle: err.message,
			  valid: false,
			  text: {
			  	copy: err.stack
			  }
		  }]
	  }));
  });
