# Shadowmap

I have been trying to make this project for a while with a lot of abandoned repos in its wake. That said I finally decided to "just do it".
Instead of focusing on a fancy backend this time around I went with firebase which provided me a way to develop the app in very short iterations.
The inspiration for the project comes from a tv show called [Person of Interest](https://www.imdb.com/title/tt1839578/).

In it an AI is trying to find them, they use a map of all cameras to avoid being seen by the all seeing eye.
I feel like this has become our reality and not just an amazing sci-fi show, so I decided to make it a reality.
If cameras can record us as we are in public and "have no expectation of privacy", then we can record the cameras in return.

The project uses quite a few technologies I am excited about. It uses snowpack as a bundler, styled-components and styled-system for ui.
Map gets rendered with leaflet, and cameras split into chunks using the amazing h3 geospatial index library. It uses firebase functions
to provide some data structuring in order to optimize the queries.

### Development

As this project doesn't really have a backend it really easy to run locally a simple `yarn` & `yarn serve` will get you a locale instance.