import { useEffect } from "react";
import { useRouter } from "next/router";
// import css from "../styles/page-styles/index.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/episodes/pages/1");
  }, []);

  return <div></div>;
}
