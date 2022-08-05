import Layout from "@/components/Layout";
import { API_URL } from "@config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter()
  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push("/events")
      }
    }

  };
  let event = evt.attributes
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image.data && (
          <div>
            <Image src={event.image.data.attributes.formats.large.url} alt={event.name} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>
        <Link href={"/events"}>
          <a className={styles.back}>
            {"<"} Back to events
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/?filters[slug][$eq]=${slug}&populate=*`);
  let events = await res.json();
  events = events.data;
  return {
    props: {
      evt: events[0],
    },
  };
}
