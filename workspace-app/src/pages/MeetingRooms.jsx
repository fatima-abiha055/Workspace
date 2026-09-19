import MeetingRoomCard from "../components/MeetingRoomCard";
import meetingRooms from "../data/meetingRooms";

export default function MeetingRooms() {
  return (
    <div className="page">
      <div className="page-header container">
        <div className="eyebrow">Meet & collaborate</div>
        <h1>Meeting Rooms</h1>
        <p>Professional rooms equipped for interviews, workshops, and client presentations.</p>
      </div>
      <div className="container">
        <div className="grid grid-3">
          {meetingRooms.map((room) => (
            <MeetingRoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}
