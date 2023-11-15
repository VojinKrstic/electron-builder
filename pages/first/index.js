import { useRouter } from "next/router";

const First = () => {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        Back
      </button>
      <div>First page</div>
    </div>
  );
};

export default First;
