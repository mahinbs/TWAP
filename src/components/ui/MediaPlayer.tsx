interface Props {
  youtubeId?: string | null;
  videoUrl?: string | null;
  audioUrl?: string | null;
  poster?: string | null;
  title?: string;
}

export default function MediaPlayer({ youtubeId, videoUrl, audioUrl, poster, title }: Props) {
  if (youtubeId) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title ?? 'Interview video'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (videoUrl) {
    return (
      <video
        controls
        poster={poster ?? undefined}
        className="w-full rounded-2xl bg-black shadow-xl aspect-video"
        src={videoUrl}
      >
        Your browser does not support video playback.
      </video>
    );
  }

  if (audioUrl) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-brand-dark to-gray-900 p-8 shadow-xl">
        {poster && (
          <img src={poster} alt="" className="w-24 h-24 rounded-xl object-cover mx-auto mb-6 border border-white/10" />
        )}
        <audio controls className="w-full" src={audioUrl}>
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  return null;
}

function formatDuration(seconds?: number | null) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export { formatDuration };
