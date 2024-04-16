import axios from 'axios';
import { GoogleTrend } from "../models/googleTrendModel.js";

//Google trend
function getGoogleTrend() {
    axios.get('https://serpapi.com/search.json?engine=google_trends_trending_now&frequency=realtime&geo=US&cat=all&api_key=949a8410438c663d34685340398a4081c9d37595a064129972a2616c17152dc8')
        .then(function (response) {
            const data = response.data.realtime_searches
            console.log(response.data.realtime_searches);
            data.forEach(item => {
                item.articles.forEach(
                    article => {
                        const spot = new GoogleTrend({
                            source: 'Google trend',
                            title: article.title,
                            url: article.link,
                            thumbnail: article.thumbnail
                        })
                        spot.save();
                    }
                )
            });

        })
        .catch(function (error) {
            console.log(error);
        })
}

export {getGoogleTrend}