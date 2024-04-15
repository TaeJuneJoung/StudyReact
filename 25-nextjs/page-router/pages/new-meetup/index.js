import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function newMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Create Meetup</title>
        <meta name="description" content="Create meetup page" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
}

export default newMeetupPage;
