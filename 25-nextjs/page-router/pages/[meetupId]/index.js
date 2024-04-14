import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return <MeetupDetail {...props.meetupData} />;
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: meetupId,
        title: "눈물의 여왕",
        image:
          "https://i.namu.wiki/i/1FQZf-g3pMrCoNp9_MOnQmAqxoFCId259JV5hotzrkoLDYmhdmnlMytnKdstBtMsrEyjOCioYAbIwjfVlq51Iw.webp",
        address: "Korea",
        description: "눈물의 여왕 tvn 9:20 p.m. 시작",
      },
    },
  };
}

export default MeetupDetails;
