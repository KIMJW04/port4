import React, { useEffect, useState } from "react";
import { fetchVideos } from "@/app/api/youtube/route";
import ReactDOM from "react-dom";
import Loading from "./Loading";
import YoutubeModal from "./YoutubeModal";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface VideoSnippet {
    title: string;
    thumbnails: {
        high: {
            url: string;
        };
    };
}

interface Video {
    id: {
        videoId: string;
    };
    snippet: VideoSnippet;
}

interface YoutubeLayerProps {
    onClose: () => void;
}

const YoutubeLayer: React.FC<YoutubeLayerProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<string>("슈카월드");
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("슈카월드");
    const [loading, setLoading] = useState<boolean>(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [nextPageToken, setNextPageToken] = useState<string>("");

    useEffect(() => {
        fetchInitialVideos();
    }, [searchQuery]);

    const fetchInitialVideos = async (isLoadMore = false) => {
        if (isLoadMore) {
            setLoadMoreLoading(true);
        } else {
            setLoading(true);
        }

        const { videos: newVideos, nextPageToken: newNextPageToken } = await fetchVideos(searchQuery, isLoadMore ? nextPageToken : "");
        setVideos((prevVideos) => (isLoadMore ? [...prevVideos, ...newVideos] : newVideos));
        setNextPageToken(newNextPageToken);

        setTimeout(() => {
            if (isLoadMore) {
                setLoadMoreLoading(false);
            } else {
                setLoading(false);
            }
        }, 1000);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setSearchQuery(tab);
    };

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
        const layerElement = document.getElementById("layer");
        if (layerElement) {
            layerElement.classList.add("hidden");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const layerElement = document.getElementById("layer");
        if (layerElement) {
            layerElement.classList.remove("hidden");
        }
    };

    return (
        <div className="layer__contents" id="layer">
            <h3 className="text-[1.563rem] mb-[0.313rem]">각종 세상 돌아가는 이야기</h3>
            <span className="text-base small">
                Youtube API <em className="text-[0.813rem] leading-normal opacity-80 pl-[0.625rem]">API를 이용하여 세상돌아가는 이야기들을 보여줍니다.</em>
            </span>
            <span className="relative block mt-8 after:content-[''] after:w-12 after:h-[1px] after:bg-white after:absolute after:left-0 after:-top-4"></span>
            <div className="relative flex items-center mt-10 after:content-[''] after:w-[1px] after:h-3 after:bg-[#78828a44] after:left-[208px] after:top-[13px] after:absolute">
                <div>
                    <input
                        type="search"
                        placeholder="검색"
                        className="bg-[#78828a0a] backdrop-blur-[20px] py-2 px-4 outline-none rounded-full mr-9 text-sm text-white"
                        style={{ border: "1px solid #ffffff58" }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                    <ul className="flex flex-wrap">
                        {["슈카월드", "당신이 몰랐던 이야기", "리뷰엉이", "안될과학", "Codegrid"].map((tab) => (
                            <li key={tab} className={`${activeTab === tab ? "bg-[#ffffff20] rounded-full text-white" : "text-[#bcbdbe]"} cursor-pointer px-2 py-1 mb-1`} onClick={() => handleTabClick(tab)}>
                                {tab}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="view mt-[1.875rem] min-h-[50%] gap-5 grid relative pb-14" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
                {loading && videos.length === 0 ? (
                    <div className="absolute -translate-x-1/2 left-1/2 bottom-20">
                        <Loading />
                    </div>
                ) : (
                    <>
                        {videos.map((video, index) => (
                            <div key={index} className="Audio mb-2% rounded-lg overflow-hidden" onClick={() => handleVideoClick(video)}>
                                <div className="relative h-0 pb-[56.25%] overflow-hidden bg-gray-300 group">
                                    <Image
                                        src={video.snippet.thumbnails.high.url}
                                        alt={video.snippet.title}
                                        fill
                                        sizes="(max-width: 600px) 100vw, 600px"
                                        className="absolute top-0 left-0 object-cover w-full h-full transition duration-300 ease-in-out filter group-hover:blur-sm"
                                    />
                                    <div className="absolute hidden transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 group-hover:block">
                                        <FaPlay className="text-4xl text-white" />
                                    </div>
                                </div>
                                <div className="bg-[#ffffff23] p-2.5 text-ellipsis whitespace-nowrap overflow-hidden">{video.snippet.title}</div>
                            </div>
                        ))}
                        {nextPageToken && (
                            loadMoreLoading ? (
                                <div className="absolute flex justify-center mt-4 -translate-x-1/2 left-1/2 -bottom-5">
                                    <Loading />
                                </div>
                            ) : (
                                <button
                                    className="mt-4 p-2 px-4 bg-[#ffffff20] rounded-full text-white absolute -translate-x-1/2 left-1/2 -bottom-5"
                                    onClick={() => fetchInitialVideos(true)}
                                >
                                    더보기
                                </button>
                            )
                        )}
                    </>
                )}
            </div>
            {isModalOpen && ReactDOM.createPortal(<YoutubeModal video={selectedVideo} onClose={handleCloseModal} />, document.body)}
        </div>
    );
};

export default YoutubeLayer;
