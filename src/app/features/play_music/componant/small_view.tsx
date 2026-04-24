import { RootState } from "@/core/redux/store";
import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import usePlayMusicHooks from "../hooks/play_music_hooks";
import { BackMusicIcon } from "./back_music_icon";
import { MusicSlider } from "./music_slider";
import { NextMusicIcon } from "./next_music_icon";
import { PauseMusicIcon } from "./pause_music";
import { PlayMusicIcon } from "./play_music";

const SmallView = () => {
  const { current_music } = useSelector((state: RootState) => state.music);
  return (
    <View style={styles.container}>
      <MusicSlider />
      <View style={styles.row}>
        <Image
          source={{ uri: current_music?.cover_url }}
          style={styles.image}
        />
        <TextContainer />
        <MusicPlayerButton />
      </View>
    </View>
  );

  function TextContainer() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {current_music?.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {current_music?.artist}
        </Text>
      </View>
    );
  }
};

const MusicPlayerButton = () => {
  const { status, togglePlayPause, previousMusic, nextMusic } =
    usePlayMusicHooks();
  return (
    <View style={styles.musicPlayerButton}>
      <TouchableOpacity onPress={() => previousMusic()}>
        <BackMusicIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => togglePlayPause()}>
        {status.playing ? <PauseMusicIcon /> : <PlayMusicIcon />}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nextMusic()}>
        <NextMusicIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  image: {
    aspectRatio: 1 / 1,
    width: "20%",
  },
  musicPlayerButton: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  textContainer: {
    width: "30%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontFamily: AppFontsFamily.extraBold,
    color: AppColor.dark,
  },
  artist: {
    fontSize: 16,
    fontFamily: AppFontsFamily.medium,
    color: AppColor.lightGray,
  },
});

export default SmallView;
