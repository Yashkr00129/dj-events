import Layout from "@/components/Layout";
import { API_URL } from "@config/index";
import EventItem from "@/components/EventItem";
import qs from "qs"
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();
  const { query: { term } } = router;
  return (
    <Layout title={`Search Results for ${term}`}>
      <Link href={"/events"}>Go Back</Link>
      <h1>Search Results for {term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {

  // Create a query that will search for the term in the title, venue, performers and description fields from the strapi v4 api and prettify the url
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $containsi: term } },
        { description: { $containsi: term } },
        { performers: { $containsi: term } },
        { venue: { $containsi: term } },
        { address: { $containsi: term } },
      ]
    },
    populate: "*",
  },
    { encodeValuesOnly: true })


  const res = await fetch(`${API_URL}/api/events?${query}`);
  let events = await res.json();
  events = events.data

  return {
    props: {
      events,
    },
  };
}


