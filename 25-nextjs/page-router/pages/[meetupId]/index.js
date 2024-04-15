import MeetupDetail from "@/components/meetups/MeetupDetail";

import { getDataIdRow, getSomeData } from "@/lib/mongo-db";

function MeetupDetails(props) {
  return <MeetupDetail {...props.meetupData} />;
}

export async function getStaticPaths() {
  const meetups = await getSomeData(({}, { _id: 1 }));

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const meetup = await getDataIdRow(meetupId);

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
  };
}

export default MeetupDetails;
