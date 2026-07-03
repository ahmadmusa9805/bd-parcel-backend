/* eslint-disable @typescript-eslint/no-explicit-any */
// const axios = require("axios");

// async function getGoogleRating() {
//     const placeId = process.env.PLACE_ID;

//     const response = await axios.get(
//         `https://places.googleapis.com/v1/places/${placeId}`,
//         {
//             headers: {
//                 "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
//                 "X-Goog-FieldMask": "rating,userRatingCount"
//             }
//         }
//     );

//     return {
//         average: response.data.rating,
//         totalReviews: response.data.userRatingCount
//     };
// }

// module.exports = {
//     getGoogleRating
// };
////////////////
import axios from "axios";
import config from '../config/index.js';

export interface GoogleReviewStats {
  average: number;
  totalReviews: number;
}

export async function getGoogleReviewStats(): Promise<GoogleReviewStats> {
  try {
    // const placeId = process.env.PLACE_ID;
    const placeId = config.place_id;
    const apiKey = config.google_api_key;

    if (!placeId) {
      throw new Error("PLACE_ID is missing in .env");
    }

    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is missing in .env");
    }

    const response = await axios.get(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
      }
    );

    return {
      average: response.data.rating,
      totalReviews: response.data.userRatingCount,
    };
  } catch (error: any) {
    console.error("Google API Error:");
    console.error(error.response?.data || error.message);
    throw error;
  }
}