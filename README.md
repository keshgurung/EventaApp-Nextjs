# EventaApp-Nextjs

A beautiful events app build with React Nextjs framework.

### Planning:

- have four main routes.
- starting page shows list of featured events only not all the events. (/)
- events folder and shows all the events. (/events)
- a single dynamic page that showa all info abt the event. (/events/${id})
- search bar for the user (/events/...slug)

### data fetching:

- in index.js and /events/index.js, using getStaticProps() we get the data

  **_ imp _**

- in events/[eventid].js, we do getStaticProps() to render data, because [id], this is changed dynamically and keeps changing.. we need to add another function getStaticPath() to get path ID (i.e event id)

- in events/[...slug].js , using getServerSidePropd() we get the data, also we do client side data fetching using SWR ( npm i swr). For SEO (search engine crawler) looks for featured events , all events and events description are needed to be appeared in SEO crawler. This page is nor so important for us to be feature din the SEO,(this is page filered for user use only) so we can do client side data fetching with useSWR.
