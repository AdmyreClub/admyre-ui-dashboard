import { fetchProfileData } from "./track";

const testTrackProfile = async () => {
    try {
      const result = await fetchProfileData("therock");
      console.log("Tracking Result:", result);
    } catch (error) {
      console.error("Error tracking profile:", error);
    }
  };

  // Execute the test function
  testTrackProfile();
