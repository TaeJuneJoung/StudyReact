import MeetupList from "@/components/meetups/MeetupList";

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

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_LIST,
//     },
//   };
// }

export async function getStaticProps() {
  //fetch data from an API
  return {
    props: {
      meetups: DUMMY_LIST,
    },
    revalidate: 10,
  };
}

export default HomePage;
