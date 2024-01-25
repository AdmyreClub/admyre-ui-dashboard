import axios, { AxiosResponse } from "axios";

interface ProfileExternalUrls {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
}

interface ProfileHistoricalData {
    date: string;
    followers_count: number;
    follows_count: number;
    media_count: number;
    engagement_rate: string;
    average_likes: string;
    average_comments: string;
    comments_to_likes_ratio: string;
    weekly_posts: string;
}

interface AudienceGenderData {
    malePercentage: number;
    femalePercentage: number;
}

interface LocationPercentage {
    location: string;
    percentage: number;
}

interface AudienceLocationData {
    cities: LocationPercentage[];
    countries: LocationPercentage[];
}

class MoreDataDao implements IMoreDataDao{
    private baseUrl: string = 'https://instrack.app/api/account/';
    private qoruzBaseUrl: string = 'https://data.qoruz.com/api/profiles.info';
    private data: any;
    private qoruzData: any;
    private altData: any;

    private async fetchData(username: string): Promise<AxiosResponse<any>> {
        const options = {
            method: 'GET',
            url: `${this.baseUrl}${username}`,
            headers: {
                'cookie': 'XSRF-TOKEN=eyJpdiI6Ik1UYzhVcThqc254Z2ZVdVdiVlVHelE9PSIsInZhbHVlIjoiNXMzK2lvV3kzVkhuNnRFNTNFMDhiWmk4UnVWcFpkTTY4YlhCSHE5QXQxa3lRS0JSNW1KZnhHR1pFcmRrMmVrc0Nwcm9Ia0gvcTVoWHVYSTZrZnpab1c5RDNOUjBZMXFzaVpObmN1QkpIcDRXZmFaaEZyc0thQUVxbm4za1dIa3AiLCJtYWMiOiI5Yzg4NjY1MDQ0MDZjZDJiZDU1NTM1Yzc3YmRmOWVmOTIxNWM1ZjE5NDg3ZTg2ZTBjMGFkODk4ZTVmOGExZjkwIiwidGFnIjoiIn0%3D; instrack_session=eyJpdiI6IlJlaEZkd2xKZ1NHOXUvbFI0OWIvNVE9PSIsInZhbHVlIjoicS92RStEaHAwekw4aWtQYVNybG9uc0RGVnhkVmdJS3lGL292MDNSaWNubmpsSlhjNGZSWXNUNWJRUEQwQkJ4Mk02RWhON0t4bHFKZHBpSlZScnJlTDFTb0U5bGV2ZCtIR2JkN2ZWU0Q5ZTErdlU4cmpPVUJUUEJqZjcxMFV1VVgiLCJtYWMiOiI2YmJlOGJlMmNhOGQ4NWI2MDI5ODMyZjU0OWIwOGFlM2JmZDVlMWNkZTViMzkwOTI1ZTMyMmNlNTNmMDI1ZDJhIiwidGFnIjoiIn0%3D',
                'authority': 'instrack.app',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'sentry-trace': 'a9f15a03d3d4407ab2d83e8427fc06d8-99ab6ca5c49237ec-1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest',
                'x-xsrf-token': 'eyJpdiI6Ik1UYzhVcThqc254Z2ZVdVdiVlVHelE9PSIsInZhbHVlIjoiNXMzK2lvV3kzVkhuNnRFNTNFMDhiWmk4UnVWcFpkTTY4YlhCSHE5QXQxa3lRS0JSNW1KZnhHR1pFcmRrMmVrc0Nwcm9Ia0gvcTVoWHVYSTZrZnpab1c5RDNOUjBZMXFzaVpObmN1QkpIcDRXZmFaaEZyc0thQUVxbm4za1dIa3AiLCJtYWMiOiI5Yzg4NjY1MDQ0MDZjZDJiZDU1NTM1Yzc3YmRmOWVmOTIxNWM1ZjE5NDg3ZTg2ZTBjMGFkODk4ZTVmOGExZjkwIiwidGFnIjoiIn0='
            }
        };

        return axios.request(options);
    }

    private async fetchQoruzData(username: string): Promise<AxiosResponse<any>> {
        const options = {
            method: 'GET',
            url: `${this.qoruzBaseUrl}${username}`,
            params: { handle: username },
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Origin': 'https://app.qoruz.com',
                'Referer': 'https://app.qoruz.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            }
        };

        return axios.request(options);
    }

    private async fetchAlternativeData(username: string): Promise<AxiosResponse<any>> {
        const options = {
            method: 'GET',
            url: 'https://fkwdo6tceerhxqtv5fhokkoxmi0lgpva.lambda-url.eu-central-1.on.aws/',
            params: { operation: 'get-profile', username: `@${username}`, channel: 'INSTAGRAM' },
            headers: {
                Accept: '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                Connection: 'keep-alive',
                Origin: 'https://www.modash.io',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            }
        };

        return axios.request(options);
    }


    constructor(username: string) {
        this.fetchData(username).then(response => {
            this.data = response.data;
        }).catch(error => {
            console.error('Error fetching data:', error);
            this.data = null;
        });

        this.fetchQoruzData(username).then(response => {
            this.qoruzData = response.data;
        }).catch(error => {
            console.error('Error fetching Qoruz data:', error);
            this.qoruzData = null;
        });

        this.fetchAlternativeData(username).then(response => {
            this.altData = response.data;
        }).catch(error => {
            console.error('Error fetching alternative data:', error);
            this.altData = null;
        });
    }
    public async getFollowerCount(): Promise<number> {
        return this.data?.followers_count;
    }

    public async getFollowingCount(): Promise<number> {
        return this.data?.follows_count;
    }

    public async getFollowerGrowthRate(username: string): Promise<number>{
        return this.data?.growth_stats.followers_quarterly_growth_rate;
    }

    public async getBio(): Promise<string> {
        return this.data?.biography;
    }

    public async getEngagementRate(): Promise<number> {
        return parseFloat(this.data?.engagement_rate);
    }

    public async getNumberOfAvgLikes(): Promise<number> {
        return parseFloat(this.data?.average_likes);
    }

    public async getNumberOfPosts(): Promise<number> {
        return this.data?.media_count;
    }

    public async getNumberOfAvgComments(): Promise<number> {
        return parseFloat(this.data?.average_comments);
    }

    public async getCommentsToLikeRatio(): Promise<number> {
        return parseFloat(this.data?.comments_to_likes_ratio);
    }

    public async getProfileHistoricalData(): Promise<ProfileHistoricalData[]> {
        return this.data?.profile_history_points;
    }

    public async getProfileLocation(): Promise<string> {
        if (this.qoruzData?.profile?.location) {
            return this.qoruzData.profile.location;
        } else if (this.altData?.profile?.location_raw?.name) {
            return this.altData.profile.location_raw.name;
        }
        return "Location not available";
    }


    public async getExternalUrls(): Promise<ProfileExternalUrls> {
        const urls: ProfileExternalUrls = {};

        // Check if YouTube URL exists and assign it
        if (this.qoruzData?.profile?.youtube?.profile_link) {
            urls.youtube = this.qoruzData.profile.youtube.profile_link;
        }

        // Check if Twitter URL exists and assign it
        if (this.qoruzData?.profile?.twitter?.profile_link) {
            urls.twitter = this.qoruzData.profile.twitter.profile_link;
        }

        // Check if Facebook URL exists and assign it
        if (this.qoruzData?.profile?.facebook?.profile_link) {
            urls.facebook = this.qoruzData.profile.facebook.profile_link;
        }

        // You can add similar checks for other platforms like TikTok if they are available in the data

        return urls;
    }

    public async getAudienceGenderData(): Promise<AudienceGenderData> {
        if (this.altData?.profile?.genderSplit) {
            const male = this.altData.profile.genderSplit.find(g => g.label === 'male')?.value || 0;
            const female = this.altData.profile.genderSplit.find(g => g.label === 'female')?.value || 0;
            return {
                malePercentage: male * 100, // Converting to percentage
                femalePercentage: female * 100 // Converting to percentage
            };
        }
        return { malePercentage: 0, femalePercentage: 0 };
    }

    public async getAudienceTopLocations(): Promise<AudienceLocationData> {
        const locationData: AudienceLocationData = { cities: [], countries: [] };

        if (this.altData?.profile?.audienceCities) {
            this.altData.profile.audienceCities.forEach(city => {
                locationData.cities.push({ location: city.name, percentage: city.weight * 100 });
            });
        }

        if (this.altData?.profile?.audienceCountries) {
            this.altData.profile.audienceCountries.forEach(country => {
                locationData.countries.push({ location: country.name, percentage: country.weight * 100 });
            });
        }

        return locationData;
    }


}


export default MoreDataDao;
