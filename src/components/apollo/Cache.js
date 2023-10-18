import { InMemoryCache } from "@apollo/client";
import { test, loading } from "./ReactiveVariables";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        test: {
          read() {
            return test();
          },
        },
        loading: {
          read() {
            return loading();
          },
        },
      },
    },
  },
});

export default cache;
