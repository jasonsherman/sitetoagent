const VideoModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-700 hover:text-purple-600 text-2xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="aspect-w-16 aspect-h-9 w-full">
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/iaIJpERsQTw?si=QbFvdTDRaFM705ly"
                        title="Demo Video"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoModal; 