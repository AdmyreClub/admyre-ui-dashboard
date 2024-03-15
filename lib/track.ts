import axios from 'axios';
import { Influencer,Content, PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';
import { use } from 'react';

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

  // Check if the username does not exist based on api2Response
  if (api2Response.data.message === "Account not found on Instagram!" && api2Response.data.code === 110) {
    throw new Error('Account not found on Instagram!');
  }

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
      historicalLikesCount: JSON.stringify({}), // Assuming this should be an empty object or some default value
    historicalCommentsCount: JSON.stringify({}), // Assuming this should be an empty object or some default value
    historicalViewsCount: JSON.stringify({}),
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

export const fetchPostData = async (url: string) => {

  const userId = auth();

  try {
    const response = await axios.get(`https://api.instagrapi.com/v1/media/by/url?url=${url}`, {
      headers: {
        'accept': 'application/json',
        'x-access-key': process.env.SCRAPER_API_KEY,
      },
    });

    const data = response.data;

    // Map the API response to your Prisma schema for Content
    // Map the API response to your Prisma schema for Content
    const postData = {
      id: data.id,
      userId: String(userId), // This should be a string. Ensure that 'userId' variable is correctly defined.
      url: url,
      likesCount: data.like_count,
      commentsCount: data.comment_count,
      viewsCount: data.view_count || 0,
      thumbnailUrl: data.thumbnail_url,
      caption: data.caption_text,
      location: data.location ? JSON.stringify(data.location) : JSON.stringify({}),
      createdAt: new Date(data.taken_at).toISOString(),
      updatedAt: new Date().toISOString(),
      code: data.code,
      user_tags: data.usertags ? JSON.stringify(data.usertags) : JSON.stringify([]),
      sponsor_tags: data.sponsor_tags ? JSON.stringify(data.sponsor_tags) : JSON.stringify([]),
      is_paid_partnership: data.is_paid_partnership,
      pk: data.pk,
      profile: data.user ? JSON.stringify(data.user) : JSON.stringify({}),
      comments_disabled: data.comments_disabled,
      like_and_view_counts_disabled: data.like_and_view_counts_disabled,
      historicalLikesCount: JSON.stringify({}),
      historicalCommentsCount: JSON.stringify({}),
      historicalViewsCount: JSON.stringify({}),
    };




    return postData;
  } catch (error) {
    if (error.response && error.response.data.message === "Account not found on Instagram!") {
      throw new Error('Post not found on Instagram!');
    } else {
      // Handle other errors (e.g., network issues, wrong configuration)
      throw new Error('Failed to fetch post data.');
    }
  }
};

export const trackPost = async (url: string) => {
  // You would also need to authenticate the user as in trackProfile
  // const userId = auth();
  // if (!userId) { return; }

  try {
    const postData = await fetchPostData(url);

    // Persist post data to the database
    const post = await prisma.content.create({
      data: postData,
    });

    return post;

} catch (error) {
console.error('Error tracking post:', error);
throw new Error('Failed to track post');
}
};
