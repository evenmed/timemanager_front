import casual from "casual";

/**
 * Fake models of our different types to facilitate
 * Apollo query and mutation testing
 */

// seed it so we get consistent results
casual.seed(777);
const fakeUser = () => ({
  __typename: "User",
  _id: "4234",
  username: casual.username,
  permissions: ["USER"],
  preferredWorkTime: 480, // 8 hours
});

casual.seed(412);
const fakeUserManager = () => ({
  __typename: "User",
  _id: "42sdf34",
  username: casual.username,
  permissions: ["USER", "USERMANAGER"],
  preferredWorkTime: 240, // 4 hours
});

casual.seed(532);
const fakeAdmin = () => ({
  __typename: "User",
  _id: "4001234",
  username: casual.username,
  permissions: ["USER", "USERMANAGER", "ADMIN"],
  preferredWorkTime: 960, // 16 hours
});

const fakeEvent = () => ({
  __typename: "Event",
  _id: "abc123",
  user: fakeUser(),
  title: casual.title,
  date: casual.date("YYYY-MM-DD"),
  time: 120,
  notes: casual.sentence,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export { LocalStorageMock, fakeUser, fakeUserManager, fakeAdmin, fakeEvent };
