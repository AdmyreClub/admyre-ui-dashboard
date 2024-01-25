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

interface IMoreDataDao {
    getFollowerCount(): Promise<number>;
    getFollowingCount(): Promise<number>;

    getBio(): Promise<string>;
    getEngagementRate(): Promise<number>;

    getNumberOfAvgLikes(): Promise<number>;
    getNumberOfPosts(): Promise<number>;
    getNumberOfAvgComments(): Promise<number>;
    getFollowerGrowthRate(): Promise<number>;
    getCommentsToLikeRatio(): Promise<number>;
    getProfileHistoricalData(): Promise<ProfileHistoricalData[]>;

    getExternalUrls(): Promise<ProfileExternalUrls>;
    getAudienceGenderData(): Promise<AudienceGenderData>;
    getAudienceTopLocations(): Promise<AudienceLocationData>;
    getProfileLocation(): Promise<String>;
}
