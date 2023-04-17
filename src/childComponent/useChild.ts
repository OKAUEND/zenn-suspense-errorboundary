import {
  atom,
  selector,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";

const statusCode = atom({
  key: "data-flow/statusCode",
  default: "Success",
});

export const useStatus = () => {
  const code = useRecoilValue(statusCode);

  const setSuccess = useRecoilCallback(({ set }) => () => {
    set(statusCode, "Success");
  });

  const setError = useRecoilCallback(({ set }) => () => {
    set(statusCode, "Error");
  });

  return [code, setSuccess, setError] as const;
};

const messageQuery = selectorFamily({
  key: "data-flow/message",
  get: (status: string) => () => {
    //本来ならここでfetchなどを使いAPI通信を行う
    if (status === "Error") {
      throw "Error";
    }
    return "成功！！！！";
  },
});

const message = selector({
  key: "data-flow/message",
  get: ({ get }) => {
    const status = get(statusCode);
    return get(messageQuery(status));
  },
});

export const useMessage = (): string => {
  return useRecoilValue(message);
};
