import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";


export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Fetch total events count
  const totalRes = await fetch(`${API_URL}/api/events`);
  let total = await totalRes.json();
  total = total.data.length

  // Fetch all events
  const eventRes = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`);
  let events = await eventRes.json();
  events = events.data

  return {
    props: { events, page: +page, total }
  };
}


