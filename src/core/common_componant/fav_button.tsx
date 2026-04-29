import AppColor from "@/core/utils/app_color";
import MyFavIcon from "@/core/utils/icons/my_fav";
import { TouchableOpacity, View } from "react-native";

export const FavButton = ({
  handleAddMusicToFav,
}: {
  handleAddMusicToFav: () => void;
}) => {
  return (
    <TouchableOpacity onPress={handleAddMusicToFav}>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,

          shadowColor: AppColor.red,
          shadowOffset: {
            width: 2,
            height: 0,
          },
          shadowOpacity: 0.95,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: AppColor.white,
          borderRadius: 50,
          padding: 10,
        }}
      >
        <MyFavIcon />
      </View>
    </TouchableOpacity>
  );
};
