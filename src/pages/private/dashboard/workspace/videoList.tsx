import React from "react";

export const VideoListWrapper = (props: any) => {
  const {
    setVideoList,
    addVideo,
    canvas,
    setCurrentPlayingVideoId,
    clippingWidth,
    clippingHeight,
    //tempData,
  } = props;

  const playVideoOnMouseOver = (e: any) => {
    e.target.play();
  };

  const pauseVideoOnMouseOut = (e: any) => {
    e.target.pause();
  };

  return (
    <div className="videoListWrapper">
      {/* {tempData.map((item: any) => {
        return (
          <div
            onClick={() => {
              setCurrentPlayingVideoId("video-1");
              setVideoList((old: any) =>
                old.concat([
                  addVideo(
                    canvas,
                    `${process.env.PUBLIC_URL}/big_buck_bunny_720p_1mb.mp4`,
                    "video-1",
                    clippingWidth,
                    clippingHeight
                  ),
                ])
              );
            }}
            key={item._id}
            style={{ marginBottom: "10px" }}
          >
            <video
              width="195"
              controls={false}
              onMouseOver={playVideoOnMouseOver}
              onMouseOut={pauseVideoOnMouseOut}
              muted
              id="video-1"
              poster={item._source.thumb}
            >
              <source
                src={item._source.preview}
                type="video/mp4"
              />
            </video>
          </div>
        )
      })} */}
      <div
        onClick={() => {
          setCurrentPlayingVideoId("video-1");
          setVideoList((old: any) =>
            old.concat([
              addVideo(
                canvas,
                //`${process.env.PUBLIC_URL}/big_buck_bunny_720p_1mb.mp4`,
                "video-1",
                clippingWidth,
                clippingHeight
              ),
            ])
          );
        }}
      >
        <video
          width="195"
          controls={false}
          onMouseOver={playVideoOnMouseOver}
          onMouseOut={pauseVideoOnMouseOut}
          muted
          id="video-1"
          //poster={`${process.env.PUBLIC_URL}/bunny.png`}
        >
          <source
            //src={`${process.env.PUBLIC_URL}/big_buck_bunny_720p_1mb.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
      <div
        onClick={() => {
          setCurrentPlayingVideoId("video-2");
          setVideoList((old: any) =>
            old.concat([
              addVideo(
                canvas,
                //`${process.env.PUBLIC_URL}/dummy-video-2.mp4`,
                "video-2",
                clippingWidth,
                clippingHeight
              ),
            ])
          );
        }}
        style={{ marginTop: "10px" }}
      >
        <video
          width="195"
          controls={false}
          onMouseOver={playVideoOnMouseOver}
          onMouseOut={pauseVideoOnMouseOut}
          muted
          id="video-2"
          //poster={`${process.env.PUBLIC_URL}/dummy-video-2.png`}
        >
          <source
            //src={`${process.env.PUBLIC_URL}/dummy-video-2.mp4`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};
