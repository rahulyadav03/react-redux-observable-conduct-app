const ROOT_API = "https://conduit.productionready.io/api";

const Auth = {
  login: `${ROOT_API}/users/login`,
  register: `${ROOT_API}/users`
};

const Tags = {
  allTags: `${ROOT_API}/tags`
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;

const Articles = {
  all: `${ROOT_API}/articles?`,
  byTag: `${ROOT_API}/articles?tag=`,
  byAuthor: `${ROOT_API}/articles?author=`,
  singleArticleDescription: `${ROOT_API}/articles/`,
  articleComments: slug => {
    return `${ROOT_API}/articles/${slug}/comments`;
  },
  articleDescription: slug => {
    return `${ROOT_API}/articles/${slug}/comments`;
  },
  articlesAuthor: (authodId, page) => {
    return `${ROOT_API}/articles?author=${authodId}&${limit(5, page)}`;
  },
  favouriteAuthor: (authodId, page) => {
    return `${ROOT_API}/articles?favorited=${authodId}&${limit(5, page)}`;
  },
  deleteComment: (slug, commentId) => {
    return `${ROOT_API}/articles/${slug}/comments/${commentId}`;
  },
  addComments: slug => {
    return `${ROOT_API}/articles/${slug}/comments`;
  },
  createArticles: () => {
    return `${ROOT_API}/articles`;
  },
  deleteArticle: slug => {
    return `${ROOT_API}/articles/${slug}`;
  },
  updateArticle: id => {
    return `${ROOT_API}/articles/${id}`;
  },
  favourite: id => {
    return `${ROOT_API}/articles/${id}/favorite`;
  }
};

const Profile = {
  getProfile: username => {
    return `${ROOT_API}/profiles/${username}`;
  },
  get: username => {
    return `${ROOT_API}/profiles/${username}`;
  }
};

export default { Auth, Tags, Articles, Profile };
