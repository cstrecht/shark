type PaginatedData<T> = {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
};

type UserPreview = {
  id: string;
  title: UserTitle;
  firstName: string;
  lastName: string;
  picture: string;
};

type User = UserPreview & {
  gender: UserGender;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  location: UserLocation;
};

type UserLocation = {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
};

enum UserTitle {
  "mr",
  "ms",
  "mrs",
  "miss",
  "dr",
  "",
}
enum UserGender {
  "male",
  "female",
  "other",
  "",
}

type PostPreview = {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: Array<string>;
  publishDate: string;
  owner: User;
};

type Post = PostPreview & {
  link: string;
};

type Comment = {
  id: string;
  message: string;
  owner: User;
  post: string;
  publishDate: string;
};
