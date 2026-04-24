import { ArrowBackIcon } from "@/core/common_componant/arrow_back_icon";
import { CustomTextFormField } from "@/core/common_componant/custom_text_form_field";
import { setListMusic } from "@/core/redux/music_reducer";
import AppColor from "@/core/utils/app_color";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { useSearch } from "../hooks/search_hooks";

const SearchScreen = () => {
  const { search, setSearch, loading, error, data } = useSearch();
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <SearchHeader />
      <View style={styles.container}>
        <CustomTextFormField
          value={search}
          onChangeText={setSearch}
          perfixIcon={
            <MaterialIcons
              name="search"
              size={24}
              color="#000"
              style={{ margin: 15 }}
            />
          }
          placeholder="Search"
        />
      </View>
      <FlatList
        data={data}
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          margin: 10,
        }}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setListMusic([item]));
            }}
          >
            <ImageBackground
              source={{ uri: item.cover_url }}
              style={styles.card}
              imageStyle={styles.image}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={AppColor.red} />
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <View style={styles.empty}>
              <Text>No data</Text>
            </View>
          )
        }
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const SearchHeader = () => {
  const router = useRouter();
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <Text style={styles.text}>Search</Text>
      <View />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    bottom: 25,
  },
  artist: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    bottom: 5,
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
