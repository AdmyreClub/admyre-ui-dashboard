import axios from 'axios';
import { Influencer, PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

// Function to fetch data from both APIs
export const fetchProfileData = async (username: string) => {
    // First API call to instrack.app
    const api1Response = await axios.get(`https://instrack.app/api/account/${username}`, {
      headers: {
        'accept': 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        'x-xsrf-token': process.env.INSTRACK_KEY,
        'referer': `https://instrack.app/instagram/${username}`,
        'authority': 'instrack.app',
      },
    });

    // Second API call to instagrapi.com
    const api2Response = await axios.get(`https://api.instagrapi.com/v1/user/by/username?username=${username}`, {
      headers: {
        'accept': 'application/json',
        'x-access-key': process.env.SCRAPER_API_KEY,
      },
    });

    // Combining data from both API responses to match the Prisma Influencer schema
    const combinedData = {
      username: api1Response.data.username || api2Response.data.username,
      url: `https://www.instagram.com/${username}/`,
      profilePictureUrl: api1Response.data.profile_picture_url || api2Response.data.profile_pic_url_hd,
      followerCount: api1Response.data.followers_count,
      followingCount: api1Response.data.follows_count,
      totalLikesCount: parseInt(api1Response.data.average_likes),
      totalCommentsCount: parseInt(api1Response.data.average_comments),
      avgLikesCount: parseInt(api1Response.data.average_likes),
      avgCommentsCount: parseInt(api1Response.data.average_comments),
      engagementRate: parseFloat(api1Response.data.engagement_rate),
      city: api2Response.data.city_name || '',
      country: '', // Not directly available, consider using a third-party service for mapping city to country if needed
      gender: '', // Gender data might not be directly available from these APIs
      platformName: 'INSTAGRAM',
      email: api2Response.data.public_email,
      phoneNumber: api2Response.data.public_phone_number,
      whatsappNumber: api2Response.data.public_phone_number,
      timeSeries: api1Response.data.profile_history_points,
    };

    return combinedData;
  };


// Main function to track profile
export const trackProfile = async ( username: string) => {

    const userId = auth();

    if(!userId){
        return ;
    }

  const profileData = await fetchProfileData(username);

  // Upsert influencer in the database
  const influencer = await prisma.influencer.upsert({
    where: { username },
    update: profileData,
    create: profileData,
  });

  return influencer;
};
