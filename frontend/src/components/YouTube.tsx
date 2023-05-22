const YouTube = ({ videoId }: { videoId: string }) => (
  <div className="overflow-hidden pb-[56.25%] relative h-0">
    <iframe
      className="aspect-video absolute l-0 t-0 h-full w-full"
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YouTube;
