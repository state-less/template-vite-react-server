import { useComponent } from "@state-less/react-client";

export const HelloWorldExample = () => {
  const [component, { error }] = useComponent("hello-world-2", {
    suspend: true,
    ssr: import.meta.env.SSR,
  });

  return (
    <>
      {error && <div className="error">ERRORS</div>}
      <button onClick={() => component?.props?.increase()}>
        Count is {component?.props?.count}
      </button>
    </>
  );
};
