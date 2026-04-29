import AppAssets from "@/core/utils/app_assets";
import AppColor from "@/core/utils/app_color";
import { Dialog, PaperProvider, Portal } from "react-native-paper";

import { CustomTextFormField } from "@/core/common_componant/custom_text_form_field";
import AppFontsFamily from "@/core/utils/app_fonts";
import { TrashIcon } from "@/core/utils/icons/trach_icon";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePlayListHooks } from "./hooks/play_list_hooks";

export default function PlaylistScreen() {
  const {
    list_playlist,
    handleCreatePlaylist,
    handleDeletePlaylist,
    handleUpdatePlaylist,
    handleRemoveFromPlaylist,
    hideDialog,
    showDialog,
    visible,
    name,
    setName,
    description,
    setDescription,
  } = usePlayListHooks();
  return (
    <PaperProvider>
      <View style={style.container}>
        <FlatList
          data={list_playlist}
          keyExtractor={(item) => item?.id?.toString() ?? ""}
          ListFooterComponent={
            <TouchableOpacity
              onPress={() => {
                showDialog();
              }}
              style={[
                style.MyPlayListCard,
                {
                  backgroundColor: AppColor.red,
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
                Create New Playlist
              </Text>
            </TouchableOpacity>
          }
          renderItem={({ item }) => (
            <View style={style.MyPlayListCard}>
              {item.tracks.length !== 0 ? (
                <Image
                  source={{
                    uri: item.tracks[0].cover_url,
                  }}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
              ) : (
                <View style={{ width: 100, height: 100, borderRadius: 10 }}>
                  <Image
                    source={AppAssets.no_cover}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                  />
                </View>
              )}
              <View>
                <Text style={style.title_play_list}>{item.name}</Text>
                <Text style={style.description_play_list}>
                  {item.description}
                </Text>
                <Text style={style.track_count_play_list}>
                  {item.tracks.length + " songs"}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 20,
                }}
                onPress={async () => {
                  await handleDeletePlaylist(item.id.toString());
                }}
              >
                <TrashIcon width={30} height={30} fill={AppColor.red} />
              </TouchableOpacity>
            </View>
          )}
        />
        <Portal>
          <Dialog
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
            visible={visible}
            onDismiss={hideDialog}
          >
            <Dialog.Title>Create New Playlist</Dialog.Title>
            <Dialog.Content>
              <CustomTextFormField
                placeholder="Playlist Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <CustomTextFormField
                placeholder="Playlist Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <TouchableOpacity
                style={[style.button, { backgroundColor: AppColor.lightBlue }]}
                activeOpacity={0.9}
                onPress={async () => {
                  handleCreatePlaylist();
                  setName("");
                  setDescription("");
                  hideDialog();
                }}
              >
                <Text style={style.btntxt}>Create New Playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.button]}
                activeOpacity={0.9}
                onPress={async () => {
                  hideDialog();
                  setName("");
                  setDescription("");
                }}
              >
                <Text style={style.btntxt}>Cancel</Text>
              </TouchableOpacity>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  MyPlayListCard: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title_play_list: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description_play_list: {
    fontSize: 16,
    color: "#666",
  },
  track_count_play_list: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    margin: 5,
    flexDirection: "row",
    backgroundColor: AppColor.red,
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
    width: "80%",
  },
  btntxt: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    color: AppColor.white,
    fontFamily: AppFontsFamily.semiBold,
  },
});
