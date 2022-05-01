import type { NextPage } from "next";
import { Greeting } from "../components/Greeting";
import { PostList } from "./PostList.auto-generted";
import { BasePage } from "./BasePage";

const Home: NextPage = () => {
  return (
    <BasePage title="Diullei's Blog">
      <Greeting />
      <PostList />
    </BasePage>
  );
};

export default Home;
