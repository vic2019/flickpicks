export const HOST =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/";

export const myMoviesEndpoint = "";

export const img500BaseUrl = "https://image.tmdb.org/t/p/w500";

export const imgOriginalBaseUrl = "https://image.tmdb.org/t/p/original";

export const authData = {
  ClientId: "",
  AppWebDomain: "",
  TokenScopesArray: ["profile", "openid"],
  RedirectUriSignIn:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000",
  RedirectUriSignOut:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:3000"
};
