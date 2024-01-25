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

interface IMoregetFollowerCountDataDao {
    (username: string): Promise<number>;
    getFollowingCount(username: string): Promise<number>;

    getBio(username: string): Promise<string>;
    getEngagementRate(username: string): Promise<number>;

    getNumberOfAvgLikes(username: string): Promise<number>;
    getNumberOfPosts(username: string): Promise<number>;
    getNumberOfAvgComments(username: string): Promise<number>;
    getFollowerGrowthRate(username: string): Promise<number>;
    getCommentsToLikeRatio(username: string): Promise<number>;
    getProfileHistoricalData(username: string): Promise<ProfileHistoricalData[]>;

    getExternalUrls(username: string): Promise<ProfileExternalUrls>;
    getAudienceGenderData(username: string): Promise<AudienceGenderData>;
    getAudienceTopLocations(username: string): Promise<AudienceLocationData>;
    getProfileLocation(username: string): Promise<String>;
}
