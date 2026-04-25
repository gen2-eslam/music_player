import AppColor from "@/core/utils/app_color";
import AppFontsFamily from "@/core/utils/app_fonts";
import { MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FavoriteTrack, useFavorites } from "./hooks/favorites_hook";

const FavoritesScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredFavorites,
    currentlyPlaying,
    loading,
    snackbar,
    setSnackbar,
    handlePlay,
    handleRemoveFavorite,
  } = useFavorites();

  const renderItem = ({ item }: { item: FavoriteTrack }) => {
    const isPlaying = currentlyPlaying?.id === item.id;

    return (
      <View style={styles.trackCard}>
        <Image
          source={{ uri: item.cover_url }}
          style={styles.coverImage}
        />

        <View style={styles.trackInfo}>
          <Text
            style={[styles.trackTitle, isPlaying && styles.trackTitlePlaying]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.trackArtist} numberOfLines={1}>
            {item.artist}
          </Text>
          {item.genre ? (
            <View style={styles.genreBadge}>
              <Text style={styles.genreText}>{item.genre}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => handlePlay(item)}
            style={styles.actionButton}
          >
            <MaterialIcons
              name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
              size={36}
              color={isPlaying ? AppColor.red : AppColor.darkGray}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRemoveFavorite(item.id)}
            style={styles.actionButton}
          >
            <MaterialIcons name="favorite" size={24} color={AppColor.red} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color={AppColor.darkGrayOpacity}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search favorites..."
          placeholderTextColor={AppColor.darkGrayOpacity}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <MaterialIcons name="close" size={18} color={AppColor.darkGrayOpacity} />
          </TouchableOpacity>
        )}
      </View>

      {/* Count */}
      {!loading && (
        <Text style={styles.countText}>
          {filteredFavorites.length}{" "}
          {filteredFavorites.length === 1 ? "song" : "songs"}
        </Text>
      )}

      {/* List / Empty / Loader */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={AppColor.red}
          style={styles.loader}
        />
      ) : filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="favorite-border"
            size={64}
            color={AppColor.lightGray}
          />
          <Text style={styles.emptyTitle}>
            {searchQuery.length > 0 ? "No results found" : "No favorites yet"}
          </Text>
          <Text style={styles.emptyDescription}>
            {searchQuery.length > 0
              ? "Try a different search term"
              : "Songs you like will appear here"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* Now Playing Bar */}
      {currentlyPlaying && (
        <View style={styles.nowPlayingBar}>
          <Image
            source={{ uri: currentlyPlaying.cover_url }}
            style={styles.nowPlayingCover}
          />
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingTitle} numberOfLines={1}>
              {currentlyPlaying.title}
            </Text>
            <Text style={styles.nowPlayingArtist} numberOfLines={1}>
              {currentlyPlaying.artist}
            </Text>
          </View>
          <MaterialIcons
            name="equalizer"
            size={24}
            color={AppColor.white}
            style={styles.equalizerIcon}
          />
        </View>
      )}

      {/* Snackbar */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: "" })}
        duration={2000}
        wrapperStyle={{ position: "absolute", bottom: 10, right: 0, left: 0 }}
        action={{
          label: "Close",
          onPress: () => setSnackbar({ visible: false, message: "" }),
          icon: "close",
        }}
      >
        <Text style={{ color: AppColor.white }}>{snackbar.message}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.white,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.darkGray,
    padding: 0,
  },
  countText: {
    fontSize: 13,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.darkGrayOpacity,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  loader: {
    marginTop: 60,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  trackCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  coverImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
  },
  trackInfo: {
    flex: 1,
    marginLeft: 14,
    gap: 3,
  },
  trackTitle: {
    fontSize: 15,
    fontFamily: AppFontsFamily.semiBold,
    color: AppColor.darkGray,
  },
  trackTitlePlaying: {
    color: AppColor.red,
  },
  trackArtist: {
    fontSize: 13,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.darkGrayOpacity,
  },
  genreBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 2,
  },
  genreText: {
    fontSize: 11,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.darkGrayOpacity,
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButton: {
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: AppFontsFamily.semiBold,
    color: AppColor.darkGray,
    marginTop: 10,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: AppFontsFamily.regular,
    color: AppColor.darkGrayOpacity,
  },
  nowPlayingBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    backgroundColor: AppColor.red,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  nowPlayingCover: {
    width: 42,
    height: 42,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  nowPlayingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nowPlayingTitle: {
    fontSize: 14,
    fontFamily: AppFontsFamily.semiBold,
    color: AppColor.white,
  },
  nowPlayingArtist: {
    fontSize: 12,
    fontFamily: AppFontsFamily.regular,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  equalizerIcon: {
    marginLeft: 8,
  },
});
