import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import usePlayMusicHooks from "../../play_music/hooks/play_music_hooks";

export default function PlaylistScreen() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRecommendedModal, setShowRecommendedModal] = useState(false);
  const [newListName, setNewListName] = useState("");
 
  const { replaceSource } = usePlayMusicHooks();

  // Hardcoded tracks to ensure the list displays correctly
  const apiTracks = [
    { id: '1', title: 'Midnight City', artist: 'M83' },
    { id: '2', title: 'Starboy', artist: 'The Weeknd' },
    { id: '3', title: 'Blinding Lights', artist: 'The Weeknd' },
    { id: '4', title: '12 to 12', artist: 'sombr' },
  ];

  const handlePlaySong = (song: any) => {
    replaceSource(song);
  };

  const handleCreatePlaylist = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now().toString(), name: newListName, songs: [] };
      setPlaylists([...playlists, newList]);
      setNewListName("");
      setShowCreateModal(false);
    }
  };

  const handleAddSong = (song: any) => {
    if (currentPlaylist) {
      const newSong = { ...song, id: Date.now().toString() };
      const updatedPlaylists = playlists.map(pl =>
        pl.id === currentPlaylist.id ? { ...pl, songs: [...(pl.songs ?? []), newSong] } : pl
      );
      setPlaylists(updatedPlaylists);
      setCurrentPlaylist({
        ...currentPlaylist,
        songs: [...(currentPlaylist.songs ?? []), newSong]
      });
    }
  };

  const handleDeleteSong = (songId: string) => {
    const updatedSongs = currentPlaylist.songs.filter((s: any) => s.id !== songId);
    const updatedPlaylists = playlists.map(pl =>
      pl.id === currentPlaylist.id ? { ...pl, songs: updatedSongs } : pl
    );
    setPlaylists(updatedPlaylists);
    setCurrentPlaylist({ ...currentPlaylist, songs: updatedSongs });
  };

  if (currentPlaylist) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setCurrentPlaylist(null)} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.playlistHeaderArea}>
            <Text style={styles.playlistNameText}>{currentPlaylist.name}</Text>
            <TouchableOpacity style={styles.addSongsBtn} onPress={() => setShowRecommendedModal(true)}>
              <View style={styles.plusBox}>
                <Ionicons name="add" size={20} color="gray" />
              </View>
              <Text style={styles.addSongsText}>Add songs</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={currentPlaylist.songs ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.songItem} onPress={() => handlePlaySong(item)}>
                 <Ionicons name="musical-note" size={20} color="black" />
                 <View style={styles.songInfo}>
                    <Text style={styles.songTitle}>{item.title}</Text>
                    <Text style={styles.songArtist}>{item.artist}</Text>
                 </View>
                 <TouchableOpacity onPress={() => handleDeleteSong(item.id)} style={styles.deleteBtn}>
                    <Ionicons name="trash-outline" size={20} color="red" />
                 </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>


       

        <Modal visible={showRecommendedModal} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.recModalContent}>
              <Text style={styles.modalTitle}>Recommended</Text>
              <FlatList
                data={apiTracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.recItem} onPress={() => handleAddSong(item)}>
                    <View>
                      <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                      <Text style={{color: 'gray', fontSize: 12}}>{item.artist}</Text>
                    </View>
                    <Ionicons name="add-circle-outline" size={24} color="black" />
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setShowRecommendedModal(false)} style={styles.closeBtn}>
                <Text style={{color: 'red', fontWeight: 'bold'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.libraryHeader}>My Library</Text>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.playlistCard} onPress={() => setCurrentPlaylist(item)}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={{color: 'gray'}}>{item.songs?.length || 0} songs</Text>
            </TouchableOpacity>
          )}
        />
      </View>

     

      <TouchableOpacity style={styles.newPlaylistPill} onPress={() => setShowCreateModal(true)}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.pillText}>New playlist</Text>
      </TouchableOpacity>

      <Modal visible={showCreateModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.createModal}>
            <Text style={styles.modalTitle}>New Playlist</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={setNewListName}
              autoFocus
            />
            <TouchableOpacity style={styles.blackBtn} onPress={handleCreatePlaylist}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <Text style={{marginTop: 15, color: 'red'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { padding: 20 },
  playlistHeaderArea: { paddingHorizontal: 20, marginBottom: 20 },
  playlistNameText: { fontSize: 32, fontWeight: 'bold' },
  addSongsBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  plusBox: { width: 40, height: 40, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  addSongsText: { fontSize: 16, fontWeight: 'bold', marginLeft: 12 },
  songItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  songInfo: { marginLeft: 15, flex: 1 },
  songTitle: { fontSize: 16, fontWeight: '500' },
  songArtist: { color: 'gray', fontSize: 12 },
  deleteBtn: { padding: 10 },
  libraryHeader: { fontSize: 28, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingHorizontal: 20 },
  playlistCard: { padding: 20, backgroundColor: '#f9f9f9', borderRadius: 15, marginHorizontal: 20, marginTop: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  newPlaylistPill: { position: 'absolute', bottom: 100, right: 20, backgroundColor: 'black', flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30 },
  pillText: { color: 'white', fontWeight: 'bold', marginLeft: 6 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  createModal: { backgroundColor: 'white', padding: 25, borderRadius: 20, width: '80%', alignItems: 'center' },
  recModalContent: { backgroundColor: 'white', padding: 25, borderRadius: 25, width: '90%', maxHeight: '80%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  input: { borderBottomWidth: 1, width: '100%', marginBottom: 20, fontSize: 18 },
  blackBtn: { backgroundColor: 'black', padding: 12, borderRadius: 10, width: '100%', alignItems: 'center' },
  recItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: '#eee' },
  closeBtn: { marginTop: 20, alignSelf: 'center' }
});