// src/app/api/youtube/route.ts

import axios from 'axios';

interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        [key: string]: {
            url: string;
            width: number;
            height: number;
        };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
}

interface VideoItem {
    kind: string;
    etag: string;
    id: {
        kind: string;
        videoId: string;
    };
    snippet: VideoSnippet;
}

interface FetchVideosResponse {
    videos: VideoItem[];
    nextPageToken: string;
}

export async function fetchVideos(query = 'full stack', pageToken = ''): Promise<FetchVideosResponse> {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    if (!apiKey) {
        console.error('API key is missing');
        return { videos: [], nextPageToken: '' };
    }

    try {
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                type: 'video',
                q: query,
                order: 'date',
                maxResults: 16,
                key: apiKey,
                pageToken: pageToken,
            },
        });

        return {
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken || '',
        };
    } catch (error) {
        console.error('Error fetching videos', error);
        return { videos: [], nextPageToken: '' };
    }
}
