const DUMMY_API_URL = "https://dummyapi.io/data/v1";

export async function getPosts() {
  return await getData("/post");
}

export async function createPost(data: Object) {
  return await postData("/post/create", data);
}

export async function deletePost(id: string) {
  return await deleteData(`/post/${id}`);
}

export async function updatePost(id: string, data: Object) {
  return await putData(`/post/${id}`, data);
}

export async function getPostById(id: string) {
  return await getData(`/post/${id}`);
}

export async function getPostsFromUser(id: string) {
  return await getData(`/user/${id}/post`);
}

export async function getUserById(id: string) {
  return await getData(`/user/${id}`);
}

export async function getCommentsFromPost(id: string) {
  return await getData(`/post/${id}/comment`);
}

export async function deleteCommentFromPost(id: string) {
  return await deleteData(`/comment/${id}`);
}

export async function createCommentOnPost(data: Object) {
  return await postData("/comment/create", data);
}

export async function getTags() {
  return await getData("/tag");
}

async function getData(path: string) {
  const fetchOptions: RequestInit = {
    headers: { "app-id": process.env.DUMMY_API_APP_ID as string },
    method: "get",
    cache: "no-store",
  };

  const response = await fetch(`${DUMMY_API_URL}${path}`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

async function deleteData(path: string) {
  const fetchOptions: RequestInit = {
    headers: { "app-id": process.env.DUMMY_API_APP_ID as string },
    method: "delete",
  };
  const response = await fetch(`${DUMMY_API_URL}${path}`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to delete data");
  }

  return response.json();
}

async function postData(path: string, data: Object) {
  const fetchOptions: RequestInit = {
    headers: {
      "app-id": process.env.DUMMY_API_APP_ID as string,
      "content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify(data),
  };
  const response = await fetch(`${DUMMY_API_URL}${path}`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to post data");
  }

  return response.json();
}

async function putData(path: string, data: Object) {
  const fetchOptions: RequestInit = {
    headers: {
      "app-id": process.env.DUMMY_API_APP_ID as string,
      "content-type": "application/json",
    },
    method: "put",
    body: JSON.stringify(data),
  };
  const response = await fetch(`${DUMMY_API_URL}${path}`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  return response.json();
}
