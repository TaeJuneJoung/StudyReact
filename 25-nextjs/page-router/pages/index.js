import MeetupList from "@/components/meetups/MeetupList";
import { useEffect, useState } from "react";

const DUMMY_LIST = [
  {
    id: "m1",
    title: "눈물의 여왕",
    image:
      "https://i.namu.wiki/i/1FQZf-g3pMrCoNp9_MOnQmAqxoFCId259JV5hotzrkoLDYmhdmnlMytnKdstBtMsrEyjOCioYAbIwjfVlq51Iw.webp",
    address: "Korea",
    description: "눈물의 여왕 tvn 9:20 p.m. 시작",
  },
  {
    id: "m2",
    title: "눈물의 여왕",
    image:
      "https://i.namu.wiki/i/1FQZf-g3pMrCoNp9_MOnQmAqxoFCId259JV5hotzrkoLDYmhdmnlMytnKdstBtMsrEyjOCioYAbIwjfVlq51Iw.webp",
    address: "Korea",
    description: "눈물의 여왕 tvn 9:20 p.m. 시작",
  },
];

function HomePage() {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setLoadedMeetups(DUMMY_LIST);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
