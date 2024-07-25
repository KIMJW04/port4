import { NextResponse } from 'next/server';
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

async function fetchVideos(query: string = 'full stack', pageToken: string = ''): Promise<FetchVideosResponse> {
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

        // Ensure that `response.data.items` is an array of `VideoItem`
        const videos = response.data.items as VideoItem[];
        const nextPageToken = response.data.nextPageToken || '';

        return {
            videos,
            nextPageToken,
        };
    } catch (error) {
        console.error('Error fetching videos', error);
        return { videos: [], nextPageToken: '' };
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || 'full stack';
    const pageToken = url.searchParams.get('pageToken') || '';

    try {
        const result = await fetchVideos(query, pageToken);
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in GET handler', error);
        return NextResponse.json({ videos: [], nextPageToken: '' }, { status: 500 });
    }
}
