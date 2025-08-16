export const profile = {
	fullName: 'Cognition and Decision Lab',
	title: '',
	institute: 'Columbia University',
	author_name: 'Woodford, Dean, Afrouzi',
	research_areas: [
		{ title: 'Economic Decision Making', description: 'Understanding cognitive processes in economic choices', field: 'economics' },
		{ title: 'Limited Attention', description: 'Studying allocation of attention during choice', field: 'psychology' },
		{ title: 'Incomplete Preferences', description: 'Role of incomplete preferences in decision making', field: 'economics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: '',
	linkedin: '',
	x: 'https://www.x.com/',
	github: '',
	gitlab: '',
	scholar: '',
	inspire: '',
	arxiv: '',
}

export const template = {
	website_url: 'https://cognition-decision-lab.github.io/', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: 'dark', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
	default_title: 'Cognition and Decision Lab',
	default_description: 'Cognition and Decision Lab is a research group focused on economic decision making.',
	default_image: '/images/astro-academia.png',
}
