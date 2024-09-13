import { Output } from "@/lib/@types";
import axios from "@/lib/axios";
import axiosClient from 'axios'

import showdown from 'showdown';

const apiUrl = `/content-gen/writer/`;

export const writeBlogPost = async (data: any): Promise<any> => {
  try {
    const res = await axios.post(apiUrl, data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const writeToWordpress = async (markdown: string, title: string): Promise<any> => {
  try {
    const wpUrl = 'https://wp.bloomyindoor.com/wp-json/wp/v2/posts';
    const username = 'bloomyindoologin';
    const applicationPassword = 'ZKTe 2VFE H8hk ojR5 z1ZQ Mqlo';

    const converter = new showdown.Converter();

    // Encode the username and password for Basic Authentication
    const auth = Buffer.from(`${username}:${applicationPassword}`).toString('base64');
    // Sample Markdown content
    const htmlContent = converter.makeHtml(markdown);

    console.log({
      htmlContent
    });

    const postData = {
      title,
      content: htmlContent,
      status: 'draft'  // or 'draft' if you want to save it as draft
  };
  
    // Function to post content
    const postMarkdown = async () => {
        try {
            const response = await axiosClient.post(wpUrl, postData, {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201) {
                console.log('Post published successfully.');
                console.log('Post URL:', response.data.link);
            } else {
                console.log('Failed to publish post.');
                console.log('Response:', response.data);
            }
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }
    
    // Run the function
    postMarkdown();
  } catch (error) {
    console.error(error);
  }
};

