import { useStatus, useMessage } from "./useChild";

type ChildComponentProps = {};

export const ChildComponent = () => {
  const [code, setSuccess, setError] = useStatus();
  const message = useMessage();

  return (
    <div>
      {message}: 現在のステータス:{code}
      <button onClick={() => setSuccess()}>成功</button>
      <button onClick={() => setError()}>エラー</button>
    </div>
  );
};
