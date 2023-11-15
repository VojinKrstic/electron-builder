import { useRouter } from "next/router";

const Second = ({ fact }) => {
  const router = useRouter();
  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        Back
      </button>
      <div>Second page {fact.fact}</div>
    </div>
  );
};

export default Second;

export const getStaticProps = async () => {
  try {
    const res = await fetch("https://catfact.ninja/fact");
    const fact = await res.json();
    return {
      props: {
        fact,
      },
    };
  } catch (error) {
    const fact = {
      fact: "Error",
    };
    return {
      props: {
        fact,
      },
    };
  }
};
