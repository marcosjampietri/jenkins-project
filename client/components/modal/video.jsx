import styled from "styled-components";

const Video = () => {
  return (
    <VideoSt>
      <iframe
        src="https://www.youtube.com/embed/TrKf-apVAJo"
        title="Andrea Mangiacavallo Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </VideoSt>
  );
};

export default Video;

const VideoSt = styled.div`
  width: 100%;
  height: 100%;

  iframe {
    width: 100%;
    height: 100%;
  }
`;
