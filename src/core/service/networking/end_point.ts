export abstract class EndPoint {
  static readonly BASE_URL =
    "https://musicapp-production-bcd8.up.railway.app/api";

  /// auth
  static readonly login = "/auth/login/";
  static readonly register = "/auth/register/";
  static readonly refresh = "/auth/refresh/";
  static readonly me = "/auth/me/";

  /// history
  static readonly history = "/history/";

  //liked
  static readonly liked = "/liked/";

  //playlist
  static readonly playlist = "/playlist/";
  static readonly playlist_id = (id: string) => `/playlist/${id}/`;

  //recommendation
  static readonly recommendation = "/recommendations/";

  //tracks
  static readonly tracks = "/tracks/";
  static readonly tracks_id = (id: string) => `/tracks/${id}/`;
  static readonly tracks_id_like = (id: string) => `/tracks/${id}/like/`;
  static readonly tracks_id_play = (id: string) => `/tracks/${id}/play/`;
  static readonly tracks_search = "/tracks/search/";
}
