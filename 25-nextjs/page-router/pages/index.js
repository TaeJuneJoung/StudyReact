import { MongoClient } from "mongodb";

import MeetupList from "@/components/meetups/MeetupList";
import { MONGODB_PASSWORD, MONGODB_USER } from "@/_secret";

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
  const client = await MongoClient.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@nextjsstudy.wlk59ct.mongodb.net/meetups?retryWrites=true&w=majority&appName=NextJSStudy`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
