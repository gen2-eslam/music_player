import AppColor from "@/core/utils/app_color";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


import { RecomendedForYouComponant } from "../home/componant/recomended_for_you_componant";

export default function PlaylistScreen() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");


  const handleAddSong = (song: any) => {
    if (!currentPlaylist) return;

    const updatedPlaylists = playlists.map(pl => {
      if (pl.id === currentPlaylist.id) {
  
        return { ...pl, songs: [...(pl.songs ?? []), song] };
      }
      return pl;
    });

    setPlaylists(updatedPlaylists);
    
    setCurrentPlaylist({
      ...currentPlaylist,
      songs: [...(currentPlaylist.songs ?? []), song]
    });
  };

  const handleCreate = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now().toString(), name: newListName, songs: [] };
      setPlaylists([...playlists, newList]);
      setNewListName("");
      setShowCreateModal(false);
    }
  };


  if (currentPlaylist) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentPlaylist(null)}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={{marginLeft: 10}}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>{currentPlaylist.name}</Text>
        
    
        <Text style={styles.subHeader}></Text>
        
           <RecomendedForYouComponant onSongPress={handleAddSong} />
        
        <Text style={[styles.subHeader, {marginTop: 20}]}>My Songs:</Text>
        <FlatList
          data={currentPlaylist.songs ?? []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.songItem}>
               <Ionicons name="musical-note" size={20} color="black" />
               <Text style={{marginLeft: 10}}>{item.title}</Text>
            </View>
          )}
        />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Playlists</Text>
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setCurrentPlaylist(item)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={{color: 'gray'}}>{item.songs?.length ?? 0} tracks</Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={showCreateModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: 18, marginBottom: 15}}>New Playlist</Text>
            <TextInput style={styles.input} placeholder="Playlist Name" onChangeText={setNewListName} />
            <TouchableOpacity style={styles.btn} onPress={handleCreate}>
                <Text style={{color: 'white'}}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Text style={{marginTop: 15, color: 'red'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={() => setShowCreateModal(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColor.white, padding: 20, paddingTop: 60 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  subHeader: { fontSize: 16, fontWeight: '600', color: 'gray', marginBottom: 10 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  card: { padding: 20, backgroundColor: '#f5f5f5', borderRadius: 15, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  songItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderColor: '#eee' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: 'black', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 25, borderRadius: 20, width: '80%', alignItems: 'center' },
  input: { borderBottomWidth: 1, width: '100%', marginBottom: 20, fontSize: 16 },
  btn: { backgroundColor: 'black', padding: 12, borderRadius: 10, width: '100%', alignItems: 'center' }
});